(function() {
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
      return ActivityFacadeService.getCurrentItem().getNavigation().listRoutes().map(function(route) {
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
        _navigationTracker.visitItem(item.templateID);

        return {
          item: item,
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
      if (id === 'END NODE') {
        return id;
      }
      var itemToLoad = null;
      var navigation = null;

      if (!id) {
        itemToLoad = ActivityFacadeService.getCurrentSurvey().getItems()[0];
        navigation = ActivityFacadeService.getCurrentSurvey().getNavigations()[2];
      } else {
        itemToLoad = ActivityFacadeService.fetchItemByID(id);
        navigation = ActivityFacadeService.fetchNavigationByOrigin(id);
      }

      if (navigation) {
        RouteService.setup(navigation);
      }

      _navigationTracker.visitItem(itemToLoad.templateID);

      return {
        item: itemToLoad,
        navigation: navigation
      };
    }
  }
}());
