(function() {
  'use strict';

  angular
    .module('otusjs.player.data.navigation')
    .service('otusjs.player.data.navigation.RouteService', Service);

  Service.$inject = [
    'otusjs.player.data.navigation.RuleService'
  ];

  function Service(RuleService) {
    var self = this;
    var _navigation = null;
    var _defaultRoute = null;
    var _alternativeRoutes = [];

    /* Public Interface */
    self.calculateRoute = calculateRoute;
    self.getAlternativeRoutes = getAlternativeRoutes;
    self.getCurrentNavigation = getCurrentNavigation;
    self.getDefaultRoute = getDefaultRoute;
    self.setup = setup;

    function getAlternativeRoutes() {
      return _alternativeRoutes;
    }

    function getCurrentNavigation() {
      return _navigation;
    }

    function getDefaultRoute() {
      return _defaultRoute;
    }

    function calculateRoute() {
      var alternativeRoute = _findAlternativeRoute();

      if (alternativeRoute) {
        return alternativeRoute;
      } else {
        return _defaultRoute;
      }
    }

    function _findAlternativeRoute() {
      var alternativeRoute = null;

      _alternativeRoutes.some((route) => {
        if (_routeCanBeUsed(route)) {
          alternativeRoute = route;
          return true;
        }
      });

      return alternativeRoute;
    }

    function _routeCanBeUsed(route) {
      return route.listConditions().some(_conditionIsApplicable);
    }

    function _conditionIsApplicable(condition) {
      return condition.listRules().every(RuleService.isRuleApplicable);
    }

    function setup(navigation) {
      var routeList = navigation.listRoutes();

      _navigation = navigation;
      _defaultRoute = routeList[0];
      _alternativeRoutes = routeList.slice(1);
    }
  }
}());
