(function() {
  'use strict';

  angular
    .module('otusjs.player.data.navigation')
    .service('otusjs.player.data.navigation.NavigationService', Service);

  Service.$inject = [
    'otusjs.model.navigation.NavigationPathItemFactory',
    'otusjs.player.data.activity.ActivityFacadeService',
    'otusjs.player.data.navigation.RouteService'
  ];

  function Service(NavigationStackItemFactory, ActivityFacadeService, RouteService) {
    let self = this;
    let _path = null;

    /* Public Interface */
    self.getNextItems = getNextItems;
    self.getPreviousItem = getPreviousItem;
    self.getStack = getStack;
    self.hasNext = hasNext;
    self.hasPrevious = hasPrevious;
    self.initialize = initialize;
    self.loadNextItem = loadNextItem;
    self.loadPreviousItem = loadPreviousItem;
    self.useItem = useItem;

    function getNextItems() {
      return ActivityFacadeService.getCurrentItem().getNavigation().listRoutes().map((route) => {
        return ActivityFacadeService.getCurrentSurvey().getItemByCustomID(route.destination);
      });
    }

    function getPreviousItem() {
      let item = _path.getCurrentItem().getPrevious();

      if (item) {
        return ActivityFacadeService.getCurrentSurvey().getItemByCustomID(item.getID());
      } else {
        return null;
      }
    }

    function getStack() {
      return _path;
    }

    function hasNext() {
      if (ActivityFacadeService.getCurrentItem().getNavigation().listRoutes().length) {
        return true;
      } else {
        return false;
      }
    }

    function hasPrevious() {
      if (_path.getCurrentItem().getPrevious()) {
        return true;
      } else {
        return false;
      }
    }

    function initialize() {
      _path = ActivityFacadeService.getCurrentSurvey().getSurvey().getNavigationStack();

      if (_path.getSize()) {
        _loadLastVisitedItem();
      } else {
        _loadFirstItem();
      }
    }

    function _loadClosingItem() {
      useItem({isClosingItem: true}, null, ActivityFacadeService.getCurrentItem().getItem().customID);
    }

    function _loadFirstItem() {
      let item = ActivityFacadeService.getCurrentSurvey().getItems()[0];
      let navigation = ActivityFacadeService.getCurrentSurvey().getNavigations()[0];
      useItem(item, navigation);
      _pathUpItem();
    }

    function _loadLastVisitedItem() {
      let item = ActivityFacadeService.getCurrentSurvey().getItemByCustomID(_path.getCurrentItem().getID());
      let navigation = ActivityFacadeService.getCurrentSurvey().getNavigationByOrigin(_path.getCurrentItem().getID());

      if (_path.getCurrentItem().getPrevious()) {
        let previous = _path.getCurrentItem().getPrevious().getID();
        useItem(item, navigation, previous);
      } else {
        useItem(item, navigation);
      }

      _pathUpItem();
    }

    function loadNextItem() {
      _loadNextItem();
    }

    function _loadNextItem() {
      let currentItemNavigation = ActivityFacadeService.getCurrentItem().getNavigation();

      if(!currentItemNavigation) {
        _loadClosingItem();
      } else {
        let routeToUse = RouteService.calculateRoute(currentItemNavigation);
        let nextItem = ActivityFacadeService.fetchItemByID(routeToUse.destination);
        let nextNavigation = ActivityFacadeService.getCurrentSurvey().getNavigationByOrigin(routeToUse.destination);
        useItem(nextItem, nextNavigation, currentItemNavigation.origin);
        _pathUpItem();
      }
    }

    function loadPreviousItem() {
      if (hasPrevious()) {
        _path.back();

        let item = getPreviousItem();
        let navigation = ActivityFacadeService.getCurrentSurvey().getNavigationByOrigin(item.customID);

        if (_path.getCurrentItem().getPrevious()) {
          useItem(item, navigation, _path.getCurrentItem().getPrevious().getID());
        } else {
          useItem(item, navigation);
        }
      }
    }

    function useItem(item, navigation, previous) {
      ActivityFacadeService.getCurrentItem().setup(item, navigation, previous);
      RouteService.setup(navigation);
    }

    function _pathUpItem() {
      let options = {};
      options.id = ActivityFacadeService.getCurrentItem().getItem().customID;

      if (ActivityFacadeService.getCurrentItem().getItem().isQuestion()) {
        options.label = ActivityFacadeService.getCurrentItem().getItem().label.ptBR.plainText;
        options.type = ActivityFacadeService.getCurrentItem().getItem().objectType;
        // options.answer = ;
        // options.metadata = ;
      }

      _path.add(NavigationStackItemFactory.create(options));
    }
  }
}());
