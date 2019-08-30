(function () {
  'use strict';

  angular
    .module('otusjs.player.data.navigation')
    .service('otusjs.player.data.navigation.NavigationService', Service);

  Service.$inject = [
    'otusjs.model.navigation.NavigationTrackingItemFactory',
    'otusjs.player.data.activity.ActivityFacadeService',
    'otusjs.player.data.navigation.RouteService'
  ];

  function Service(NavigationTrackingItemFactory, ActivityFacadeService, RouteService) {
    var self = this;
    var _navigationTracker = null;

    /* Public Interface */
    self.getNextItems = getNextItems;
    self.getPreviousItem = getPreviousItem;
    self.hasNext = hasNext;
    self.hasPrevious = hasPrevious;
    self.initialize = initialize;
    self.loadNextItem = loadNextItem;
    self.loadPreviousItem = loadPreviousItem;
    self.updateItemTracking = updateItemTracking;

    function getNextItems() {
      return ActivityFacadeService.getCurrentItem().getNavigation().listRoutes().map(function (route) {
        return ActivityFacadeService.getCurrentSurvey().getItemByTemplateID(route.destination);
      });
    }

    function getPreviousItem() {
      if (hasPrevious()) {
        var previousID = _navigationTracker.getCurrentItem().getPrevious();
        return ActivityFacadeService.getCurrentSurvey().getItemByTemplateID(previousID);
      } else {
        return null;
      }
    }

    function hasNext() {
      if (ActivityFacadeService.getCurrentItem().getNavigation().listRoutes().length) {
        return true;
      } else {
        return false;
      }
    }

    function hasPrevious() {
      if (_navigationTracker.hasPreviousItem()) {
        return true;
      } else {
        return false;
      }
    }

    function initialize() {
      _navigationTracker = ActivityFacadeService.getCurrentSurvey().getSurvey().getNavigationTracker();
    }

    function loadNextItem() {
      if (ActivityFacadeService.getCurrentItem().hasItem()) {
        return _loadNextItem();
      } else if (_navigationTracker.getCurrentIndex()) {
        return _loadLastVisitedItem();
      } else {
        return _loadFirstItem();
      }
    }

    function loadPreviousItem() {
      if (hasPrevious()) {
        var item = getPreviousItem();
        var navigation = ActivityFacadeService.getCurrentSurvey().getNavigationByOrigin(item.templateID);

        RouteService.setup(navigation);
        //todo model precisa visitar todos os items do grupo
        _navigationTracker.visitItem(item.templateID);

        return {
          items: item,
          navigation: navigation
        };
      }
    }

    function updateItemTracking() {
      var currentItemFilling = ActivityFacadeService.getCurrentItem().getFilling();
      _navigationTracker.updateCurrentItem(currentItemFilling);
    }

    function _loadFirstItem() {
      return _loadItem();
    }

    function _loadLastVisitedItem() {
      return _loadItem(_navigationTracker.getCurrentItem().getID());
    }

    function _loadNextItem() {
      var currentItemNavigation = ActivityFacadeService.getCurrentItem().getNavigation();

      if (currentItemNavigation) {
        var routeToUse = RouteService.calculateRoute();
        return _loadItem(routeToUse.destination);
      }
    }

    function _loadItem(id) {
      var itemsToLoad = null;
      var navigation = null;

      if (!id) {
        //todo
        let firstItem = ActivityFacadeService.getCurrentSurvey().getItems()[0];
        itemsToLoad = ActivityFacadeService.fetchItemGroupByID(firstItem.templateID);
        console.log(itemsToLoad);
        // itemsToLoad = ActivityFacadeService.getCurrentSurvey().getSurveyItemGroup()[0];
        navigation = ActivityFacadeService.getCurrentSurvey().getNavigations()[2];
      } else {
        itemsToLoad = ActivityFacadeService.fetchItemGroupByID(id);
        navigation = ActivityFacadeService.fetchNavigationByOrigin(itemsToLoad[itemsToLoad.length-1].templateID);
      }

      if (navigation) {
        RouteService.setup(navigation);
      }

      if (id === 'END NODE') {
        _navigationTracker.visitItem(id);
        return id;
      }

      //todo: model precisa visitar todos os items do grupo
      // _navigationTracker.visitItem(itemsToLoad.templateID);

      return {
        items: itemsToLoad,
        navigation: navigation
      };
    }
  }
}());
