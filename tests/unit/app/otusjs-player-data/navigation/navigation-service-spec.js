describe('NavigationService', () => {

  let UNIT_NAME = 'otusjs.player.data.navigation.NavigationService';
  let Mock = {};
  let Injections = {};
  let service = {};
  let CAD1 = 'CAD1';
  let CAD2 = 'CAD2';

  beforeEach(() => {
    module('otusjs.player.data');

    inject(function(_$injector_) {
      /* Test data */
      mockItemData();
      mockNavigationData();

      /* Injectable mocks */
      mockActivityFacadeService(_$injector_);
      mockRouteService(_$injector_);

      /* Helper mocks */
      mockCurrentItemService(_$injector_);
      mockCurrentSurveyService(_$injector_);

      service = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('getCurrentItem method', () => {

    it('should retrieve the CurrentItemService from ActivityFacadeService', () => {
      spyOn(Mock.ActivityFacadeService, 'getCurrentItem').and.returnValue(Mock.CurrentItemService);

      let returned = service.getCurrentItem();

      expect(returned).toEqual(Mock.CurrentItemService);
      expect(Mock.ActivityFacadeService.getCurrentItem).toHaveBeenCalledWith();
    });

  });

  describe('getCurrentSurvey method', () => {

    it('should retrieve the CurrentSurveyService from ActivityFacadeService', () => {
      spyOn(Mock.ActivityFacadeService, 'getCurrentSurvey').and.returnValue(Mock.CurrentSurveyService);

      let returned = service.getCurrentSurvey();

      expect(returned).toEqual(Mock.CurrentSurveyService);
      expect(Mock.ActivityFacadeService.getCurrentSurvey).toHaveBeenCalledWith();
    });

  });

  describe('getNextItems method', () => {

    describe('on all cases', () => {

      beforeEach(() => {
        spyOn(Mock.CurrentItemService, 'getNavigation').and.returnValue(Mock.navigationCAD1);
        spyOn(Mock.ActivityFacadeService, 'getCurrentItem').and.returnValue(Mock.CurrentItemService);
        spyOn(Mock.CurrentSurveyService, 'getItemByCustomID');
      });

      it('should request the routes of current item from current navigation', () => {
        let nextItems = service.getNextItems();

        expect(Mock.navigationCAD1.listRoutes).toHaveBeenCalledWith();
      });

      it('should retrieve the respective item of each current item route destination', () => {
        let nextItems = service.getNextItems();

        expect(Mock.CurrentSurveyService.getItemByCustomID).toHaveBeenCalledWith(CAD2);
      });

    });

    describe('when exists next items', () => {

      beforeEach(() => {
        spyOn(Mock.CurrentItemService, 'getNavigation').and.returnValue(Mock.navigationCAD1);
        spyOn(Mock.ActivityFacadeService, 'getCurrentItem').and.returnValue(Mock.CurrentItemService);
        spyOn(Mock.CurrentSurveyService, 'getItemByCustomID').and.returnValue(Mock.itemCAD2);
      });

      it('should return an array with the next items from current item', () => {
        let nextItems = service.getNextItems();

        expect(nextItems[0].extents).toEqual('SurveyItem');
      });

    });

    describe('when not exists next items', () => {

      beforeEach(() => {
        spyOn(Mock.CurrentItemService, 'getNavigation').and.returnValue(Mock.navigationCAD2);
        spyOn(Mock.ActivityFacadeService, 'getCurrentItem').and.returnValue(Mock.CurrentItemService);
      });

      it('should return an empty array', () => {
        let nextItems = service.getNextItems();

        expect(nextItems.length).toBe(0);
      });

    });

  });

  describe('getPreviousItem method', () => {

    describe('on all cases', () => {

      beforeEach(() => {
        spyOn(Mock.CurrentSurveyService, 'getItemByCustomID');
        spyOn(Mock.CurrentItemService, 'getPreviousItem');
      });

      it('should request the ID of previous item of current item', () => {
        let nextItems = service.getPreviousItem();

        expect(Mock.CurrentItemService.getPreviousItem).toHaveBeenCalledWith();
      });

    });

    describe('when exists a previous item', () => {

      beforeEach(() => {
        spyOn(Mock.CurrentSurveyService, 'getItemByCustomID').and.returnValue(Mock.itemCAD1);
        spyOn(Mock.CurrentItemService, 'getPreviousItem').and.returnValue(CAD1);
      });

      it('should retrieve the respective item of previous item ID', () => {
        let nextItems = service.getPreviousItem();

        expect(Mock.CurrentSurveyService.getItemByCustomID).toHaveBeenCalledWith(CAD1);
      });

      it('should return the item that precedes the current item', () => {
        let item = service.getPreviousItem();

        expect(item.extents).toEqual('SurveyItem');
      });

    });

    describe('when not exists a previous item', () => {

      beforeEach(() => {
        spyOn(Mock.CurrentItemService, 'getPreviousItem').and.returnValue(null);
      });

      it('should return null', () => {
        let item = service.getPreviousItem();

        expect(item).toBe(null);
      });

    });

  });

  describe('hasNext method', () => {

    describe('when exists next item', () => {

      beforeEach(() => {
        spyOn(Mock.CurrentItemService, 'getNavigation').and.returnValue(Mock.navigationCAD1);
      });

      it('should return true', () => {
        expect(service.hasNext()).toBe(true);
      });

    });

    describe('when not exists next item', () => {

      beforeEach(() => {
        spyOn(Mock.CurrentItemService, 'getNavigation').and.returnValue(Mock.navigationCAD2);
      });

      it('should return false', () => {
        expect(service.hasNext()).toBe(false);
      });

    });

  });

  describe('hasPrevious method', () => {

    describe('when exists previous item', () => {

      beforeEach(() => {
        spyOn(Mock.CurrentItemService, 'getPreviousItem').and.returnValue(CAD1);
      });

      it('should return true', () => {
        expect(service.hasPrevious()).toBe(true);
      });

    });

    describe('when not exists previous item', () => {

      beforeEach(() => {
        spyOn(Mock.CurrentItemService, 'getPreviousItem').and.returnValue(null);
      });

      it('should return false', () => {
        expect(service.hasPrevious()).toBe(false);
      });

    });

  });

  describe('loadNextItem method', () => {

    describe('when not exists a current item loaded', () => {

      beforeEach(() => {
        spyOn(Mock.CurrentItemService, 'hasItem').and.returnValue(false);
        spyOn(Mock.CurrentSurveyService, 'getItems').and.returnValue([Mock.itemCAD1, Mock.itemCAD2]);
        spyOn(Mock.CurrentSurveyService, 'getNavigations').and.returnValue([Mock.navigationCAD1, Mock.navigationCAD2]);
      });

      it('should setup CurrentItemService with the first item of survey', () => {
        spyOn(Mock.CurrentItemService, 'setup');
        spyOn(Mock.RouteService, 'setup');

        service.loadNextItem();

        expect(Mock.CurrentItemService.setup).toHaveBeenCalledWith(Mock.itemCAD1, Mock.navigationCAD1, undefined);
        expect(Mock.RouteService.setup).toHaveBeenCalledWith(Mock.navigationCAD1);
      });

    });

    describe('when exists a current item loaded', () => {

      beforeEach(() => {
        spyOn(Mock.ActivityFacadeService, 'getCurrentItem').and.returnValue(Mock.CurrentItemService);
        spyOn(Mock.CurrentItemService, 'hasItem').and.returnValue(true);

        spyOn(Mock.CurrentItemService, 'getNavigation').and.returnValue(Mock.navigationCAD1);
        spyOn(Mock.RouteService, 'calculateRoute').and.returnValue(Mock.routeToCAD3);
        spyOn(Mock.ActivityFacadeService, 'fetchItemByID').and.returnValue(Mock.itemCAD3);
        spyOn(Mock.CurrentSurveyService, 'getNavigationByOrigin').and.returnValue(Mock.navigationCAD3);

        spyOn(Mock.RouteService, 'setup');
      });

      it('should retrieve the navigation of current item', () => {
        service.loadNextItem();

        expect(Mock.CurrentItemService.getNavigation).toHaveBeenCalledWith();
      });

      it('should retrieve the route to be used by navigation', () => {
        service.loadNextItem();

        expect(Mock.RouteService.calculateRoute).toHaveBeenCalledWith(Mock.navigationCAD1);
      });

      it('should retrieve the item that corresponds to route destination', () => {
        service.loadNextItem();

        expect(Mock.RouteService.calculateRoute).toHaveBeenCalledWith(Mock.navigationCAD1);
      });

      it('should retrieve the item that corresponds to route destination', () => {
        service.loadNextItem();

        expect(Mock.CurrentSurveyService.getNavigationByOrigin).toHaveBeenCalledWith(Mock.routeToCAD3.destination);
      });

      it('should setup the CurrentItemService with nextItem, nextNavigation and current item id', () => {
        spyOn(Mock.CurrentItemService, 'setup');

        service.loadNextItem();

        expect(Mock.CurrentItemService.setup).toHaveBeenCalledWith(Mock.itemCAD3, Mock.navigationCAD3, Mock.navigationCAD1.origin);
      });

    });

  });

  function mockActivityFacadeService($injector) {
    Mock.ActivityFacadeService = $injector.get('otusjs.player.data.activity.ActivityFacadeService');
    Injections.ActivityFacadeService = Mock.ActivityFacadeService;
  }

  function mockRouteService($injector) {
    Mock.RouteService = $injector.get('otusjs.player.data.navigation.RouteService');
    Injections.RouteService = Mock.RouteService;
  }

  function mockCurrentItemService($injector) {
    Mock.CurrentItemService = $injector.get('otusjs.player.data.activity.CurrentItemService');
    Injections.CurrentItemService = Mock.CurrentItemService;
  }

  function mockCurrentSurveyService($injector) {
    Mock.CurrentSurveyService = $injector.get('otusjs.player.data.activity.CurrentSurveyService');
    Injections.CurrentSurveyService = Mock.CurrentSurveyService;
  }

  function mockItemData() {
    Mock.itemCAD1 = {
      "extents": "SurveyItem",
      "objectType": "TextQuestion",
      "templateID": "CAD1",
      "customID": "CAD1",
      "dataType": "String",
      "label": {
        "ptBR": {
          "extends": "StudioObject",
          "objectType": "Label",
          "oid": "",
          "plainText": "1. Qual é o seu nome?",
          "formattedText": "1. Qual é o seu nome?"
        },
        "enUS": {
          "extends": "StudioObject",
          "objectType": "Label",
          "oid": "",
          "plainText": "",
          "formattedText": ""
        },
        "esES": {
          "extends": "StudioObject",
          "objectType": "Label",
          "oid": "",
          "plainText": "",
          "formattedText": ""
        }
      },
      "metadata": {
        "extents": "StudioObject",
        "objectType": "MetadataGroup",
        "options": [{
          "extends": "StudioObject",
          "objectType": "MetadataAnswer",
          "dataType": "Integer",
          "value": 1,
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "Não quer responder",
              "formattedText": "Não quer responder"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          }
        }]
      },
      "fillingRules": {
        "extends": "StudioObject",
        "objectType": "FillingRules",
        "options": {
          "mandatory": {
            "extends": "StudioObject",
            "objectType": "Rule",
            "validatorType": "mandatory",
            "data": {
              "reference": true
            }
          },
          "minLength": {
            "extends": "StudioObject",
            "objectType": "Rule",
            "validatorType": "minLength",
            "data": {
              "size": null,
              "reference": 5
            }
          }
        }
      }
    };
    Mock.itemCAD2 = {
      "extents": "SurveyItem",
      "objectType": "CalendarQuestion",
      "templateID": "CAD2",
      "customID": "CAD2",
      "dataType": "LocalDate",
      "label": {
        "ptBR": {
          "extends": "StudioObject",
          "objectType": "Label",
          "oid": "",
          "plainText": "2. Qual é a data de seu nascimento?",
          "formattedText": "2. Qual é a data de seu nascimento?"
        },
        "enUS": {
          "extends": "StudioObject",
          "objectType": "Label",
          "oid": "",
          "plainText": "",
          "formattedText": ""
        },
        "esES": {
          "extends": "StudioObject",
          "objectType": "Label",
          "oid": "",
          "plainText": "",
          "formattedText": ""
        }
      },
      "metadata": {
        "extents": "StudioObject",
        "objectType": "MetadataGroup",
        "options": [{
          "extends": "StudioObject",
          "objectType": "MetadataAnswer",
          "dataType": "Integer",
          "value": 1,
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "Não quer responder",
              "formattedText": "Não quer responder"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          }
        }, {
          "extends": "StudioObject",
          "objectType": "MetadataAnswer",
          "dataType": "Integer",
          "value": 2,
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "Não sabe responder",
              "formattedText": "Não sabe responder"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          }
        }]
      },
      "fillingRules": {
        "extends": "StudioObject",
        "objectType": "FillingRules",
        "options": {
          "mandatory": {
            "extends": "StudioObject",
            "objectType": "Rule",
            "validatorType": "mandatory",
            "data": {
              "reference": true
            }
          }
        }
      }
    };
    Mock.itemCAD3 = {
      "extents": "SurveyItem",
      "objectType": "CalendarQuestion",
      "templateID": "CAD3",
      "customID": "CAD3",
      "dataType": "LocalDate",
      "label": {
        "ptBR": {
          "extends": "StudioObject",
          "objectType": "Label",
          "oid": "",
          "plainText": "2. Qual é a data de seu nascimento?",
          "formattedText": "2. Qual é a data de seu nascimento?"
        },
        "enUS": {
          "extends": "StudioObject",
          "objectType": "Label",
          "oid": "",
          "plainText": "",
          "formattedText": ""
        },
        "esES": {
          "extends": "StudioObject",
          "objectType": "Label",
          "oid": "",
          "plainText": "",
          "formattedText": ""
        }
      },
      "metadata": {
        "extents": "StudioObject",
        "objectType": "MetadataGroup",
        "options": [{
          "extends": "StudioObject",
          "objectType": "MetadataAnswer",
          "dataType": "Integer",
          "value": 1,
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "Não quer responder",
              "formattedText": "Não quer responder"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          }
        }, {
          "extends": "StudioObject",
          "objectType": "MetadataAnswer",
          "dataType": "Integer",
          "value": 2,
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "Não sabe responder",
              "formattedText": "Não sabe responder"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          }
        }]
      },
      "fillingRules": {
        "extends": "StudioObject",
        "objectType": "FillingRules",
        "options": {
          "mandatory": {
            "extends": "StudioObject",
            "objectType": "Rule",
            "validatorType": "mandatory",
            "data": {
              "reference": true
            }
          }
        }
      }
    };
    Mock.itemCAD3.isQuestion = jasmine.createSpy('isQuestion');
  }

  function mockNavigationData() {
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
      "routes": []
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
  }
});
