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
        var previousID = _navigationTracker.getCurrentItemGroup()[0].getPrevious();
        return ActivityFacadeService.getCurrentSurvey().getItemByTemplateID(previousID);
      } else {
        return null;
      }
    }

    function hasNext() {
      return !!ActivityFacadeService.getCurrentItem().getNavigation().listRoutes().length;
    }

    function hasPrevious() {
      return !!_navigationTracker.hasPreviousItem();
    }

    function initialize() {
      _navigationTracker = ActivityFacadeService.getCurrentSurvey().getSurvey().getNavigationTracker();
    }

    function loadNextItem() {
      if (ActivityFacadeService.getCurrentItem().hasItems()) {
        return _loadNextItem();
      } else if (_navigationTracker.getCurrentIndex()) {
        return _loadLastVisitedItem();
      } else {
        return _loadFirstItem();
      }
    }

    function loadPreviousItem() {
      if (hasPrevious()) {
        var itemsPreviousArray = [];
        var items = getPreviousItem();
        var navigation = null;

        itemsPreviousArray = ActivityFacadeService.fetchItemGroupByID(items.templateID);
        navigation = ActivityFacadeService.getCurrentSurvey().getNavigationByOrigin(itemsPreviousArray[itemsPreviousArray.length - 1].templateID);

        RouteService.setup(navigation);
        _navigationTracker.visitGroup(itemsPreviousArray.map(item=>item.templateID));

        return {
          items: itemsPreviousArray,
          navigation: navigation
        };
      }
    }

    function updateItemTracking() {
      var currentItemFillingContainer = ActivityFacadeService.getCurrentItem().getFillingContainer();
      _navigationTracker.updateCurrentGroup(currentItemFillingContainer);
    }

    function _loadFirstItem() {
      return _loadItem();
    }

    function _loadLastVisitedItem() {
      return _loadItem(_navigationTracker.getCurrentItemGroup()[0].getID());
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
        let firstItem = ActivityFacadeService.getCurrentSurvey().getItems()[0];
        itemsToLoad = ActivityFacadeService.fetchItemGroupByID(firstItem.templateID);
        navigation = ActivityFacadeService.fetchNavigationByOrigin(itemsToLoad[itemsToLoad.length - 1].templateID);
        _navigationTracker.visitGroup(itemsToLoad.map(item=>item.templateID));

      } else if (id !== 'END NODE') {
        itemsToLoad = ActivityFacadeService.fetchItemGroupByID(id);
        navigation = ActivityFacadeService.fetchNavigationByOrigin(itemsToLoad[itemsToLoad.length - 1].templateID);
        _navigationTracker.visitGroup(itemsToLoad.map(item=>item.templateID));

      } else {
         navigation = ActivityFacadeService.fetchNavigationByOrigin(id);
      }

      if (navigation) {
        RouteService.setup(navigation);
      }

      if (id === 'END NODE') {
        _navigationTracker.visitGroup([id]);
        return id;
      }

      return {
        items: itemsToLoad,
        navigation: navigation
      };
    }
  }
}());
