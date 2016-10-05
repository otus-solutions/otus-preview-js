(function() {
  'use strict';

  angular
    .module('otusjs.player.data.navigation')
    .service('otusjs.player.data.navigation.NavigationService', Service);

  Service.$inject = [
    'otusjs.model.navigation.NavigationStackItemFactory',
    'otusjs.player.data.activity.ActivityFacadeService',
    'otusjs.player.data.navigation.RouteService'
  ];

  function Service(NavigationStackItemFactory, ActivityFacadeService, RouteService) {
    let self = this;
    let _stack = null;

    /* Public Interface */
    self.getCurrentItem = getCurrentItem;
    self.getCurrentSurvey = getCurrentSurvey;
    self.getNextItems = getNextItems;
    self.getPreviousItem = getPreviousItem;
    self.getStack = getStack;
    self.hasNext = hasNext;
    self.hasPrevious = hasPrevious;
    self.initialize = initialize;
    self.loadNextItem = loadNextItem;
    self.loadPreviousItem = loadPreviousItem;
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

    function getStack() {
      return _stack;
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

    function initialize() {
      _stack = getCurrentSurvey().getSurvey().getNavigationStack();

      if (_stack.getSize()) {
        _loadLastVisitedItem();
      } else {
        _loadFirstItem();
      }
    }

    function _loadFirstItem() {
      let item = getCurrentSurvey().getItems()[0];
      let navigation = getCurrentSurvey().getNavigations()[0];
      useItem(item, navigation);
      _stackUpItem();
    }

    function _loadLastVisitedItem() {
      let item = getCurrentSurvey().getItemByCustomID(_stack.getCurrentItem().getID());
      let navigation = getCurrentSurvey().getNavigationByOrigin(_stack.getCurrentItem().getID());

      if (_stack.getCurrentItem().getPrevious()) {
        let previous = _stack.getCurrentItem().getPrevious().getID();
        useItem(item, navigation, previous);
      } else {
        useItem(item, navigation);
      }

      _stackUpItem();
    }

    function loadNextItem() {
      _loadNextItem();
    }

    function _loadNextItem() {
      let currentItemNavigation = getCurrentItem().getNavigation();
      let routeToUse = RouteService.calculateRoute(currentItemNavigation);
      let nextItem = ActivityFacadeService.fetchItemByID(routeToUse.destination);
      let nextNavigation = getCurrentSurvey().getNavigationByOrigin(routeToUse.destination);
      useItem(nextItem, nextNavigation, currentItemNavigation.origin);
      _stackUpItem();
    }

    function loadPreviousItem() {
      if (hasPrevious()) {
        _stack.back();
        let item = getPreviousItem();
        let navigation = getCurrentSurvey().getNavigationByOrigin(item.customID);
        if (_stack.getCurrentItem().getPrevious()) {
          useItem(item, navigation, _stack.getCurrentItem().getPrevious().getID());
        } else {
          useItem(item, navigation);
        }
      }
    }

    function useItem(item, navigation, previous) {
      getCurrentItem().setup(item, navigation, previous);
      RouteService.setup(navigation);
    }

    function _stackUpItem() {
      let options = {};
      options.id = getCurrentItem().getItem().customID;
      options.label = getCurrentItem().getItem().label.ptBR.plainText;
      options.type = getCurrentItem().getItem().objectType;
      // options.answer = ;
      // options.metadata = ;

      _stack.add(NavigationStackItemFactory.create(options));
    }
  }
}());
