describe('NavigationService', function() {

  var UNIT_NAME = 'otusjs.player.data.navigation.RouteService';
  var Mock = {};
  var Injections = {};
  var service = {};
  var CAD1 = 'CAD1';
  var CAD2 = 'CAD2';

  beforeEach(function() {
    module('otusjs.player.data');

    inject(function(_$injector_) {
      /* Test data */
      mockNavigationData();

      /* Injectable mocks */
      mockRuleService(_$injector_);

      service = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('calculateRoute method', function() {

    describe('when Navigation has only the default route', function() {

      beforeEach(function() {
        service.setup(Mock.navigationCAD2);
      });

      it('should return the default route', function() {
        expect(service.calculateRoute()).toEqual(Mock.navigationCAD2.routes[0]);
      });

    });

    describe('when Navigation has alternative routes', function() {

      describe('and no condition, of any alternative route, is satisfied', function() {

        beforeEach(function() {
          service.setup(Mock.navigationCAD1);
          spyOn(Mock.RuleService, 'isRuleApplicable').and.returnValue(false);
        });

        it('should return the default route', function() {
          expect(service.calculateRoute()).toEqual(Mock.navigationCAD1.routes[0]);
        });

      });

      describe('and some condition, of any alternative route, is satisfied', function() {

        beforeEach(function() {
          service.setup(Mock.navigationCAD1);
          spyOn(Mock.RuleService, 'isRuleApplicable').and.returnValue(true);
        });

        it('should return the alternative route that own these condition', function() {
          expect(service.calculateRoute()).toEqual(Mock.navigationCAD1.routes[1]);
        });

      });

    });

  });

  describe('setup method', function() {

    it('should keep a reference to a Navigation', function() {
      service.setup(Mock.navigationCAD1);

      expect(service.getCurrentNavigation()).toEqual(Mock.navigationCAD1);
    });

    it('should keep a reference to default route of Navigation', function() {
      service.setup(Mock.navigationCAD1);

      expect(service.getDefaultRoute()).toEqual(Mock.navigationCAD1.routes[0]);
    });

    it('should keep an array with the alternative routes of Navigation', function() {
      service.setup(Mock.navigationCAD1);

      expect(service.getAlternativeRoutes()).toEqual(Mock.navigationCAD1.routes.slice(1));
    });

  });

  function mockNavigationData() {
    Mock.routeToCAD3 = {
      "extents": "StudioObject",
      "objectType": "Route",
      "name": "CAD1_CAD3",
      "origin": "CAD1",
      "destination": "CAD3",
      "isDefault": false,
      "conditions": [{
          "extents": "StudioObject",
          "objectType": "RouteCondition",
          "name": "ROUTE_CONDITION",
          "rules": [{
              "extents": "SurveyTemplateObject",
              "objectType": "Rule",
              "when": "CAD1",
              "operator": "equal",
              "answer": 1
          }]
      }]
    };
    Mock.routeToCAD3.conditions[0].listRules = jasmine.createSpy('listRules').and.returnValue(Mock.routeToCAD3.conditions[0].rules);
    Mock.routeToCAD3.listConditions = jasmine.createSpy('listConditions').and.returnValue(Mock.routeToCAD3.conditions);

    Mock.navigationCAD1 = {
      "extents": "StudioObject",
      "objectType": "Navigation",
      "origin": "CAD1",
      "index": 0,
      "inNavigations": [],
      "isDefault": true,
      "routes": [{
        "extents": "StudioObject",
        "objectType": "Route",
        "name": "CAD1_CAD2",
        "origin": "CAD1",
        "destination": "CAD2",
        "isDefault": true,
        "conditions": []
      }]
    };
    Mock.navigationCAD1.routes.push(Mock.routeToCAD3);
    Mock.navigationCAD1.listRoutes = jasmine.createSpy('listRoutes').and.returnValue(Mock.navigationCAD1.routes);

    Mock.navigationCAD2 = {
      "extents": "StudioObject",
      "objectType": "Navigation",
      "origin": "CAD2",
      "index": 1,
      "inNavigations": [{
        "origin": "CAD1",
        "isDefaultPath": true,
        "isDefaultRoute": true
      }],
      "isDefault": true,
      "routes": [{
        "extents": "StudioObject",
        "objectType": "Route",
        "name": "CAD1_CAD3",
        "origin": "CAD1",
        "destination": "CAD3",
        "isDefault": true,
        "conditions": []
      }]
    };
    Mock.navigationCAD2.listRoutes = jasmine.createSpy('listRoutes').and.returnValue(Mock.navigationCAD2.routes);

    Mock.navigationCAD3 = {
      "extents": "StudioObject",
      "objectType": "Navigation",
      "origin": "CAD3",
      "index": 1,
      "inNavigations": [{
        "origin": "CAD1"
      }],
      "isDefault": true,
      "routes": []
    };
  }

  function mockRuleService($injector) {
    Mock.RuleService = $injector.get('otusjs.player.data.navigation.RuleService');
    Injections.RuleService = Mock.RuleService;
  }
});
