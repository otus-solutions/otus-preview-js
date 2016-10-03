(function() {
  'use strict';

  angular
    .module('otusjs.player.data.navigation')
    .service('otusjs.player.data.navigation.NavigationService', Service);

  Service.$inject = [
    'otusjs.player.data.activity.ActivityFacadeService',
    'otusjs.player.data.navigation.RouteService'
  ];

  function Service(ActivityFacadeService, RouteService) {
    var self = this;
    let _item = null;
    let _itemNavigation = null;

    /* Public Interface */
    self.getCurrentItem = getCurrentItem;
    self.getCurrentSurvey = getCurrentSurvey;
    self.getNextItems = getNextItems;
    self.getPreviousItem = getPreviousItem;
    self.hasNext = hasNext;
    self.hasPrevious = hasPrevious;
    self.loadNextItem = loadNextItem;
    self.useItem = useItem;

    function getCurrentItem() {
      return ActivityFacadeService.getCurrentItem();
    }

    function getCurrentSurvey() {
      return ActivityFacadeService.getCurrentSurvey();
    }

    function getNextItems() {
      return getCurrentItem().getNavigation().listRoutes().map((route) => {
        return getCurrentSurvey().getItemByCustomID(route.destination);
      });
    }

    function getPreviousItem() {
      let previousItemID = getCurrentItem().getPreviousItem();

      if (previousItemID) {
        return getCurrentSurvey().getItemByCustomID(previousItemID);
      } else {
        return null;
      }
    }

    function hasNext() {
      if (getCurrentItem().getNavigation().listRoutes().length) {
        return true;
      } else {
        return false;
      }
    }

    function hasPrevious() {
      if (getCurrentItem().getPreviousItem()) {
        return true;
      } else {
        return false;
      }
    }

    function _loadFirstItem() {
      let item = getCurrentSurvey().getItems()[0];
      let navigation = getCurrentSurvey().getNavigations()[0];
      useItem(item, navigation);
    }

    function loadNextItem() {
      if (!getCurrentItem().hasItem()) {
        _loadFirstItem();
      } else {
        _loadNextItem();
      }
    }

    function _loadNextItem() {
      let currentItemNavigation = getCurrentItem().getNavigation();
      let routeToUse = RouteService.calculateRoute(currentItemNavigation);
      let nextItem = ActivityFacadeService.fetchItemByID(routeToUse.destination);
      let nextNavigation = getCurrentSurvey().getNavigationByOrigin(routeToUse.destination);
      useItem(nextItem, nextNavigation, currentItemNavigation.origin);
    }

    function useItem(item, navigation, previous) {
      getCurrentItem().setup(item, navigation, previous);
      RouteService.setup(navigation);
    }
  }
}());
