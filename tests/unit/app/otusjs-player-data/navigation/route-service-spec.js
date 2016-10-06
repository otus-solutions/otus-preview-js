describe('NavigationService', () => {

  let UNIT_NAME = 'otusjs.player.data.navigation.RouteService';
  let Mock = {};
  let Injections = {};
  let service = {};
  let CAD1 = 'CAD1';
  let CAD2 = 'CAD2';

  beforeEach(() => {
    module('otusjs.player.data');

    inject(function(_$injector_) {
      /* Test data */
      mockNavigationData();

      /* Injectable mocks */
      mockRuleService(_$injector_);

      service = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('calculateRoute method', () => {

    describe('when Navigation has only the default route', () => {

      beforeEach(() => {
        service.setup(Mock.navigationCAD2);
      });

      it('should return the default route', () => {
        expect(service.calculateRoute()).toEqual(Mock.navigationCAD2.routes[0]);
      });

    });

    describe('when Navigation has alternative routes', () => {

      describe('and no condition, of any alternative route, is satisfied', () => {

        beforeEach(() => {
          service.setup(Mock.navigationCAD1);
          spyOn(Mock.RuleService, 'isRuleApplicable').and.returnValue(false);
        });

        it('should return the default route', () => {
          expect(service.calculateRoute()).toEqual(Mock.navigationCAD1.routes[0]);
        });

      });

      describe('and some condition, of any alternative route, is satisfied', () => {

        beforeEach(() => {
          service.setup(Mock.navigationCAD1);
          spyOn(Mock.RuleService, 'isRuleApplicable').and.returnValue(true);
        });

        it('should return the alternative route that own these condition', () => {
          expect(service.calculateRoute()).toEqual(Mock.navigationCAD1.routes[1]);
        });

      });

    });

  });

  describe('setup method', () => {

    it('should keep a reference to a Navigation', () => {
      service.setup(Mock.navigationCAD1);

      expect(service.getCurrentNavigation()).toEqual(Mock.navigationCAD1);
    });

    it('should keep a reference to default route of Navigation', () => {
      service.setup(Mock.navigationCAD1);

      expect(service.getDefaultRoute()).toEqual(Mock.navigationCAD1.routes[0]);
    });

    it('should keep an array with the alternative routes of Navigation', () => {
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
