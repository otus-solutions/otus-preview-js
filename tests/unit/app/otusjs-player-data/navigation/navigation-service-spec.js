describe('NavigationService', function() {

  var UNIT_NAME = 'otusjs.player.data.navigation.NavigationService';
  var Mock = {};
  var Injections = {};
  var service = {};
  var CAD1 = 'CAD1';
  var CAD2 = 'CAD2';

  beforeEach(function() {
    module('otusjs.player.data');

    inject(function(_$injector_) {
      /* Test data */
      mockItemData();
      mockNavigationData();
      mockNavigationStackData(_$injector_);
      mockSurveyActivityData();

      /* Injectable mocks */
      mockNavigationStackItemFactory(_$injector_);
      mockActivityFacadeService(_$injector_);
      mockRouteService(_$injector_);

      /* Helper mocks */
      mockCurrentItemService(_$injector_);
      mockCurrentSurveyService(_$injector_);

      service = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('initialize method', function() {

    beforeEach(function() {
      spyOn(Mock.CurrentSurveyService, 'getSurvey').and.returnValue(Mock.newSurveyActivity);
    });

    it('should just keep a reference to navigation stack', function() {
      service.initialize();

      expect(service.getStack()).toEqual(Mock.newStack);
    });

  });

  describe('getNextItems method', function() {

    describe('on all cases', function() {

      beforeEach(function() {
        spyOn(Mock.CurrentItemService, 'getNavigation').and.returnValue(Mock.navigationCAD1);
        spyOn(Mock.ActivityFacadeService, 'getCurrentItem').and.returnValue(Mock.CurrentItemService);
        spyOn(Mock.CurrentSurveyService, 'getItemByTemplateID');
      });

      it('should request the routes of current item from current navigation', function() {
        var nextItems = service.getNextItems();

        expect(Mock.navigationCAD1.listRoutes).toHaveBeenCalledWith();
      });

      it('should retrieve the respective item of each current item route destination', function() {
        var nextItems = service.getNextItems();

        expect(Mock.CurrentSurveyService.getItemByTemplateID).toHaveBeenCalledWith(CAD2);
      });

    });

    describe('when exists next items', function() {

      beforeEach(function() {
        spyOn(Mock.CurrentItemService, 'getNavigation').and.returnValue(Mock.navigationCAD1);
        spyOn(Mock.ActivityFacadeService, 'getCurrentItem').and.returnValue(Mock.CurrentItemService);
        spyOn(Mock.CurrentSurveyService, 'getItemByTemplateID').and.returnValue(Mock.itemCAD2);
      });

      it('should return an array with the next items from current item', function() {
        var nextItems = service.getNextItems();

        expect(nextItems[0].extents).toEqual('SurveyItem');
      });

    });

    describe('when not exists next items', function() {

      beforeEach(function() {
        spyOn(Mock.CurrentItemService, 'getNavigation').and.returnValue(Mock.navigationCAD2);
        spyOn(Mock.ActivityFacadeService, 'getCurrentItem').and.returnValue(Mock.CurrentItemService);
      });

      it('should return an empty array', function() {
        var nextItems = service.getNextItems();

        expect(nextItems.length).toBe(0);
      });

    });

  });

  xdescribe('getPreviousItem method', function() {

    describe('on all cases', function() {

      beforeEach(function() {
        spyOn(Mock.CurrentSurveyService, 'getSurvey').and.returnValue(Mock.savedSurveyActivity);
        spyOn(Mock.CurrentSurveyService, 'getItems').and.returnValue([Mock.itemCAD1, Mock.itemCAD2]);
        spyOn(Mock.CurrentSurveyService, 'getNavigations').and.returnValue([Mock.navigationCAD1, Mock.navigationCAD2]);
        spyOn(Mock.CurrentSurveyService, 'getItemByTemplateID').and.returnValue(Mock.itemCAD3);
        spyOn(Mock.CurrentSurveyService, 'getNavigationByOrigin').and.returnValue(Mock.navigationCAD3);
        spyOn(Mock.CurrentItemService, 'setup');
        spyOn(Mock.CurrentItemService, 'getItem').and.returnValue(Mock.itemCAD1);
        spyOn(Mock.RouteService, 'setup');
        spyOn(Mock.ActivityFacadeService, 'getCurrentSurvey').and.returnValue(Mock.CurrentSurveyService);
        spyOn(Mock.ActivityFacadeService, 'getCurrentItem').and.returnValue(Mock.CurrentItemService);

        service.initialize();
      });

      it('should request the ID of previous item of current item', function() {
        spyOn(Mock.savedStack, 'getCurrentItem').and.returnValue(Mock.itemB);
        spyOn(Mock.itemB, 'getPrevious').and.returnValue(Mock.itemA);

        var nextItems = service.getPreviousItem();

        expect(Mock.itemA.getPrevious).toHaveBeenCalledWith();
      });

    });

    describe('when exists a previous item', function() {

      beforeEach(function() {
        spyOn(Mock.CurrentSurveyService, 'getItemByTemplateID').and.returnValue(Mock.itemCAD1);
        spyOn(Mock.CurrentItemService, 'getPreviousItem').and.returnValue(CAD1);
      });

      it('should retrieve the respective item of previous item ID', function() {
        var nextItems = service.getPreviousItem();

        expect(Mock.CurrentSurveyService.getItemByTemplateID).toHaveBeenCalledWith(CAD1);
      });

      it('should return the item that precedes the current item', function() {
        var item = service.getPreviousItem();

        expect(item.extents).toEqual('SurveyItem');
      });

    });

    describe('when not exists a previous item', function() {

      beforeEach(function() {
        spyOn(Mock.CurrentItemService, 'getPreviousItem').and.returnValue(null);
      });

      it('should return null', function() {
        var item = service.getPreviousItem();

        expect(item).toBe(null);
      });

    });

  });

  describe('hasNext method', function() {

    describe('when exists next item', function() {

      beforeEach(function() {
        spyOn(Mock.CurrentItemService, 'getNavigation').and.returnValue(Mock.navigationCAD1);
      });

      it('should return true', function() {
        expect(service.hasNext()).toBe(true);
      });

    });

    describe('when not exists next item', function() {

      beforeEach(function() {
        spyOn(Mock.CurrentItemService, 'getNavigation').and.returnValue(Mock.navigationCAD2);
      });

      it('should return false', function() {
        expect(service.hasNext()).toBe(false);
      });

    });

  });

  describe('hasPrevious method', function() {

    describe('when exists previous item', function() {

      beforeEach(function() {
        spyOn(Mock.CurrentSurveyService, 'getSurvey').and.returnValue(Mock.savedSurveyActivity);
        spyOn(Mock.CurrentSurveyService, 'getItems').and.returnValue([Mock.itemCAD1, Mock.itemCAD2]);
        spyOn(Mock.CurrentSurveyService, 'getNavigations').and.returnValue([Mock.navigationCAD1, Mock.navigationCAD2]);
        spyOn(Mock.CurrentSurveyService, 'getItemByTemplateID').and.returnValue(Mock.itemCAD3);
        spyOn(Mock.CurrentSurveyService, 'getNavigationByOrigin').and.returnValue(Mock.navigationCAD3);
        spyOn(Mock.CurrentItemService, 'setup');
        spyOn(Mock.CurrentItemService, 'getItem').and.returnValue(Mock.itemCAD1);
        spyOn(Mock.RouteService, 'setup');
        spyOn(Mock.ActivityFacadeService, 'getCurrentSurvey').and.returnValue(Mock.CurrentSurveyService);
        spyOn(Mock.ActivityFacadeService, 'getCurrentItem').and.returnValue(Mock.CurrentItemService);

        service.initialize();
      });

      it('should return true', function() {
        spyOn(Mock.savedStack, 'getCurrentItem').and.returnValue(Mock.itemB);
        spyOn(Mock.itemB, 'getPrevious').and.returnValue(Mock.itemA);

        expect(service.hasPrevious()).toBe(true);
      });

    });

    describe('when not exists previous item', function() {

      beforeEach(function() {
        spyOn(Mock.CurrentSurveyService, 'getSurvey').and.returnValue(Mock.savedSurveyActivity);
        spyOn(Mock.CurrentSurveyService, 'getItems').and.returnValue([Mock.itemCAD1, Mock.itemCAD2]);
        spyOn(Mock.CurrentSurveyService, 'getNavigations').and.returnValue([Mock.navigationCAD1, Mock.navigationCAD2]);
        spyOn(Mock.CurrentSurveyService, 'getItemByTemplateID').and.returnValue(Mock.itemCAD3);
        spyOn(Mock.CurrentSurveyService, 'getNavigationByOrigin').and.returnValue(Mock.navigationCAD3);
        spyOn(Mock.CurrentItemService, 'setup');
        spyOn(Mock.CurrentItemService, 'getItem').and.returnValue(Mock.itemCAD1);
        spyOn(Mock.RouteService, 'setup');
        spyOn(Mock.ActivityFacadeService, 'getCurrentSurvey').and.returnValue(Mock.CurrentSurveyService);
        spyOn(Mock.ActivityFacadeService, 'getCurrentItem').and.returnValue(Mock.CurrentItemService);

        service.initialize();
      });

      it('should return false', function() {
        spyOn(Mock.savedStack, 'getCurrentItem').and.returnValue(Mock.itemA);
        spyOn(Mock.itemA, 'getPrevious').and.returnValue(null);

        expect(service.hasPrevious()).toBe(false);
      });

    });

  });

  describe('loadNextItem method', function() {

    beforeEach(function() {
      spyOn(Mock.CurrentSurveyService, 'getSurvey').and.returnValue(Mock.newSurveyActivity);
      spyOn(Mock.CurrentSurveyService, 'getItems').and.returnValue([Mock.itemCAD1, Mock.itemCAD2]);
      spyOn(Mock.CurrentSurveyService, 'getNavigations').and.returnValue([Mock.navigationCAD1, Mock.navigationCAD2]);
      spyOn(Mock.CurrentSurveyService, 'getNavigationByOrigin').and.returnValue(Mock.navigationCAD3);

      spyOn(Mock.CurrentItemService, 'hasItem').and.returnValue(true);
      spyOn(Mock.CurrentItemService, 'getItem').and.returnValue(Mock.itemCAD1);
      spyOn(Mock.CurrentItemService, 'getNavigation').and.returnValue(Mock.navigationCAD1);
      spyOn(Mock.CurrentItemService, 'setup');

      spyOn(Mock.ActivityFacadeService, 'fetchItemByID').and.returnValue(Mock.itemCAD3);

      spyOn(Mock.RouteService, 'calculateRoute').and.returnValue(Mock.routeToCAD3);
      spyOn(Mock.RouteService, 'setup');

      spyOn(Mock.NavigationStackItemFactory, 'create').and.returnValue(Mock.stackItem);
      spyOn(Mock.newStack, 'add');

      service.initialize();
    });

    describe('when already exists a current item', function() {

      it('should retrieve the navigation of current item', function() {
        service.loadNextItem();

        expect(Mock.CurrentItemService.getNavigation).toHaveBeenCalledWith();
      });

      it('should retrieve the route to be used by navigation', function() {
        service.loadNextItem();

        expect(Mock.RouteService.calculateRoute).toHaveBeenCalledWith(Mock.navigationCAD1);
      });

      it('should retrieve the item that corresponds to route destination', function() {
        service.loadNextItem();

        expect(Mock.RouteService.calculateRoute).toHaveBeenCalledWith(Mock.navigationCAD1);
      });

      it('should retrieve the navigation that corresponds to route destination', function() {
        service.loadNextItem();

        expect(Mock.CurrentSurveyService.getNavigationByOrigin).toHaveBeenCalledWith(Mock.routeToCAD3.destination);
      });

      it('should load a next item', function() {

      });

      it('should stack up the next item', function() {
        service.loadNextItem();

        expect(Mock.newStack.add).toHaveBeenCalledWith(Mock.stackItem);
      });

    });

    describe('when does not exists a current item but a saved path to continue', function() {

      it('should load the last visited item of path', function() {

      });

      it('should stack up the next item', function() {
        service.loadNextItem();

        expect(Mock.newStack.add).toHaveBeenCalledWith(Mock.stackItem);
      });

    });

    describe('when does not exists neither a current item or a saved path to continue', function() {

      it('should load the first item of activity', function() {

      });

      it('should stack up the next item', function() {
        service.loadNextItem();

        expect(Mock.newStack.add).toHaveBeenCalledWith(Mock.stackItem);
      });

    });

  });

  function mockNavigationStackItemFactory($injector) {
    Mock.NavigationStackItemFactory = $injector.get('otusjs.model.navigation.NavigationPathItemFactory');

    var options = {};
    options.id = Mock.itemCAD1.customID;
    options.label = Mock.itemCAD1.label.ptBR.plainText;
    options.type = Mock.itemCAD1.objectType;
    Mock.stackItem = Mock.NavigationStackItemFactory.create(options);

    Injections.NavigationStackItemFactory = Mock.NavigationStackItemFactory;
  }

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
    Mock.itemCAD1.isQuestion = jasmine.createSpy('isQuestion').and.returnValue(true);
    Mock.itemCAD2.isQuestion = jasmine.createSpy('isQuestion').and.returnValue(true);
    Mock.itemCAD3.isQuestion = jasmine.createSpy('isQuestion').and.returnValue(true);
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

  function mockNavigationStackData($injector) {
    Mock.newStack = $injector.get('otusjs.model.navigation.NavigationPathFactory').create();
    Mock.savedStack = $injector.get('otusjs.model.navigation.NavigationPathFactory').create();

    itemFactory = $injector.get('otusjs.model.navigation.NavigationPathItemFactory');
    var options = { id: 'CAD1', label: 'Label', type: 'IntegerQuestion', answer: 'Label da resposta', metadata: 'Label do metdado.' };
    Mock.itemA = itemFactory.create(options);
    options = { id: 'CAD2', label: 'Label', type: 'IntegerQuestion', answer: 'Label da resposta', metadata: 'Label do metdado.' };
    Mock.itemB = itemFactory.create(options);
    options = { id: 'CAD3', label: 'Label', type: 'IntegerQuestion', answer: 'Label da resposta', metadata: 'Label do metdado.' };
    Mock.itemC = itemFactory.create(options);

    Mock.savedStack.add(Mock.itemA);
    Mock.savedStack.add(Mock.itemB);
    Mock.savedStack.add(Mock.itemC);
  }

  function mockSurveyActivityData() {
    Mock.newSurveyActivity = {};
    Mock.newSurveyActivity.getNavigationStack = jasmine.createSpy('getNavigationStack').and.returnValue(Mock.newStack);

    Mock.savedSurveyActivity = {};
    Mock.savedSurveyActivity.getNavigationStack = jasmine.createSpy('getNavigationStack').and.returnValue(Mock.savedStack);
  }
});
