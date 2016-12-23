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
    var self = this;
    var _path = null;

    /* Public Interface */
    self.getNextItems = getNextItems;
    self.getPreviousItem = getPreviousItem;
    self.getStack = getStack;
    self.hasNext = hasNext;
    self.hasPrevious = hasPrevious;
    self.initialize = initialize;
    self.loadNextItem = loadNextItem;
    self.loadPreviousItem = loadPreviousItem;

    function getNextItems() {
      return ActivityFacadeService.getCurrentItem().getNavigation().listRoutes().map(function(route) {
        return ActivityFacadeService.getCurrentSurvey().getItemByTemplateID(route.destination);
      });
    }

    function getPreviousItem() {
      var item = _path.getCurrentItem().getPrevious();
      _path.back();
      if (item) {
        return ActivityFacadeService.getCurrentSurvey().getItemByTemplateID(item.getID());
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
    }

    function loadNextItem() {
      if (ActivityFacadeService.getCurrentItem().hasItem()) {
        return _loadNextItem();
      } else if (_path.getSize()) {
        return _loadLastVisitedItem();
      } else {
        return _loadFirstItem();
      }
    }

    function _loadFirstItem() {
      return _loadItem();
    }

    function _loadLastVisitedItem() {
      return _loadItem(_path.getCurrentItem().getID());
    }

    function _loadNextItem() {
      var currentItemNavigation = ActivityFacadeService.getCurrentItem().getNavigation();

      if (currentItemNavigation) {
        var routeToUse = RouteService.calculateRoute(currentItemNavigation);
        return _loadItem(routeToUse.destination);
      }
    }

    function _loadItem(id) {
      if (id === 'END NODE') {
        return id;
      }
      var item = null;
      var navigation = null;

      if (!id) {
        item = ActivityFacadeService.getCurrentSurvey().getItems()[0];
        navigation = ActivityFacadeService.getCurrentSurvey().getNavigations()[2];
      } else {
        item = ActivityFacadeService.fetchItemByID(id);
        navigation = ActivityFacadeService.fetchNavigationByOrigin(id);
      }

      if (navigation) {
        RouteService.setup(navigation);
      }
      _pathUpItem(item);

      return {
        item: item,
        navigation: navigation
      };
    }

    function loadPreviousItem() {
      if (hasPrevious()) {
        var item = getPreviousItem();
        var navigation = ActivityFacadeService.getCurrentSurvey().getNavigationByOrigin(item.templateID);
        RouteService.setup(navigation);

        return {
          item: item,
          navigation: navigation
        };
      }
    }

    function _pathUpItem(item) {
      var options = {};
      options.id = item.templateID;
      options.type = item.objectType;

      if (item.isQuestion()) {
        options.label = item.label.ptBR.plainText;
      }
      _path.add(NavigationStackItemFactory.create(options));
    }
  }
}());
