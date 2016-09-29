describe('Current Question Service', function() {

  var Mock = {};
  var Injections = {};
  var service;
  var VAL1 = 'VAL1';
  var VAL2 = 'VAL2';

  beforeEach(function() {
    module('otusjs.player.core');

    inject(function(_$injector_) {
      mockItemObserver();
      mockSurveyItems();
      mockNavigations()
      mockValidationError()
      mockItemFilling(_$injector_);
      mockActivityFacadeService(_$injector_);
      mockValidationService(_$injector_);
      service = _$injector_.get('otusjs.player.core.activity.CurrentItemService', Injections);
    });
  });

  describe('applyFilling method', function() {

    beforeEach(function() {
      service.setup(Mock.itemVAL1, Mock.navigation);
      service.fill(Mock.rawFilling);
    });

    it('should apply the answer to SurveyActivity model', function() {
      service.applyFilling();

      expect(Mock.ActivityFacadeService.fillQuestion).toHaveBeenCalledWith(Mock.filling);
    });

  });

  describe('attachValidationError method', function() {

    beforeEach(function() {
      service.setup(Mock.itemVAL1, Mock.navigation);
      service.observerRegistry(Mock.itemObserver);
      service.fill(Mock.rawFilling);
    });

    it('should keep the validation error data', function() {
      service.attachValidationError(Mock.validationError);

      expect(service.getValidationError()).toEqual(Mock.validationError);
    });

    it('should notify the observer', function() {
      service.attachValidationError(Mock.validationError);

      expect(Mock.itemObserver.updateValidation).toHaveBeenCalledWith(Mock.validationError);
    });

  });

  describe('fill method', function() {

    beforeEach(function() {
      service.setup(Mock.itemVAL1, Mock.navigation);
    })

    it('should get a QuestionFill based on raw filling data', function() {
      service.fill(Mock.rawFilling);

      expect(Mock.ActivityFacadeService.createQuestionFill).toHaveBeenCalledWith(Mock.itemVAL1.customID);
    });

    it('should keeps the QuestionFill created', function() {
      service.fill(Mock.rawFilling);

      expect(service.getFilling()).toEqual(Mock.filling);
    });

  });

  describe('getRoutes method', function() {

    describe('when exists next items', function() {

      beforeEach(function() {
        service.setup(Mock.itemVAL1, Mock.navigation);
      });

      it('should return an array with the routes of current item', function() {
        var routes = service.getRoutes();

        expect(routes.length).not.toBe(0);
      });

      it('should return an array with VAL2 route present', function() {
        var routes = service.getRoutes();

        expect(routes[0].destination).toBe(VAL2);
      });

    });

    describe('when not exists next items', function() {

      beforeEach(function() {
        service.setup(Mock.itemVAL2, Mock.undefinedNavigation);
      });

      it('should return an empty array of routes', function() {
        var routes = service.getRoutes();

        expect(routes.length).toBe(0);
      });

    });

  });

  describe('getPreviousItem method', function() {

    describe('when exists next item', function() {

      beforeEach(function() {
        service.setup(Mock.itemVAL2, null, VAL1);
      });

      it('should return the customID of item that precedes the current item', function() {
        var previousItem = service.getPreviousItem();

        expect(previousItem).toEqual(VAL1);
      });

    });

    describe('when not exists previous item', function() {

      beforeEach(function() {
        service.setup(Mock.itemVAL1, Mock.navigation);
      });

      it('should return an empty array of items', function() {
        var previousItem = service.getPreviousItem();

        expect(previousItem).toBe(null);
      });

    });

  });

  describe('hasItem method', function() {

    describe('when an item has been setted', function() {

      beforeEach(function() {
        service.setup(Mock.itemVAL1, Mock.navigation);
      });

      it('should return true', function() {
        expect(service.hasItem()).toBe(true);
      });

    });

    describe('when an item not has been setted', function() {

      it('should return false', function() {
        expect(service.hasItem()).toBe(false);
      });

    });

  });

  describe('ignoreValidation method', function() {

    describe('when validation should be ignored', function() {
      // TODO
      // it('should return true', function() {
      //   expect(service.ignoreValidation()).toBe(true);
      // });

    });

    describe('when validation should not be ignored', function() {
      // TODO
      // it('should return false', function() {
      //   expect(service.hasItem()).toBe(false);
      // });

    });

  });

  describe('setup method', function() {

    describe('on all cases', function() {

      it('should keep a reference to the item in use', function() {
        service.setup(Mock.itemVAL1);

        expect(service.getItem()).toEqual(Mock.itemVAL1);
      });

      it('should keep a reference to navigation of the item in use', function() {
        service.setup(Mock.itemVAL1, Mock.navigation);

        expect(service.getItemNavigation()).toEqual(Mock.navigation);
      });

    });

    describe('when the current item has not a previous item', function() {

      it('should keep a null value', function() {
        service.setup(Mock.itemVAL1, Mock.navigation);

        expect(service.getPreviousItem()).toBe(null);
      });

    });

    describe('when the current item has a previous item', function() {

      it('should keep the customID of previous item', function() {
        service.setup(Mock.itemVAL1, Mock.navigation, VAL2);

        expect(service.getPreviousItem()).toEqual(VAL2);
      });

    });

  });

  function mockItemObserver() {
    Mock.itemObserver = {};
    Mock.itemObserver.updateValidation = jasmine.createSpy('updateValidation');
  }

  function mockValidationError() {
    Mock.validationError = {};
  }

  function mockItemFilling($injector) {
    Mock.rawFilling = {};
    Mock.rawFilling.customID = VAL1;
    Mock.rawFilling.answer = '10/09/2016';
    Mock.rawFilling.metadata = 0;
    Mock.rawFilling.comment = 'Aceitar essa responsta a qualquer custo!';

    Mock.QuestionFillFactory = $injector.get('QuestionFillFactory');
    Mock.filling = Mock.QuestionFillFactory.create(Mock.rawFilling.customID, Mock.rawFilling.answer, Mock.rawFilling.metadata, Mock.rawFilling.comment);
  }

  function mockSurveyItems() {
    Mock.itemVAL1 = {
      "extents": "SurveyItem",
      "objectType": "CalendarQuestion",
      "templateID": "VAL1",
      "customID": "VAL1",
      "dataType": "LocalDate",
      "label": {
        "ptBR": {
          "extends": "StudioObject",
          "objectType": "Label",
          "oid": "",
          "plainText": "",
          "formattedText": ""
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
        "options": []
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
          "rangeDate": {
            "extends": "StudioObject",
            "objectType": "Rule",
            "validatorType": "rangeDate",
            "data": {
              "reference": {
                "initial": "2016-09-01T03:00:00.000Z",
                "end": "2016-10-01T03:00:00.000Z"
              }
            }
          },
          "minDate": {
            "extends": "StudioObject",
            "objectType": "Rule",
            "validatorType": "minDate",
            "data": {
              "reference": "2016-07-01T03:00:00.000Z"
            }
          },
          "maxDate": {
            "extends": "StudioObject",
            "objectType": "Rule",
            "validatorType": "maxDate",
            "data": {
              "reference": "2016-12-01T02:00:00.000Z"
            }
          }
        }
      }
    };
    Mock.itemVAL2 = {
      "extents": "SurveyItem",
      "objectType": "CalendarQuestion",
      "templateID": "VAL2",
      "customID": "VAL2",
      "dataType": "LocalDate",
      "label": {
        "ptBR": {
          "extends": "StudioObject",
          "objectType": "Label",
          "oid": "",
          "plainText": "",
          "formattedText": ""
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
        "options": []
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
          "rangeDate": {
            "extends": "StudioObject",
            "objectType": "Rule",
            "validatorType": "rangeDate",
            "data": {
              "reference": {
                "initial": "2016-09-01T03:00:00.000Z",
                "end": "2016-10-01T03:00:00.000Z"
              }
            }
          },
          "minDate": {
            "extends": "StudioObject",
            "objectType": "Rule",
            "validatorType": "minDate",
            "data": {
              "reference": "2016-07-01T03:00:00.000Z"
            }
          },
          "maxDate": {
            "extends": "StudioObject",
            "objectType": "Rule",
            "validatorType": "maxDate",
            "data": {
              "reference": "2016-12-01T02:00:00.000Z"
            }
          }
        }
      }
    };

    Mock.itemContainer = [Mock.itemVAL1, Mock.itemVAL2];
  }

  function mockNavigations() {
    Mock.undefinedNavigation = undefined;
    Mock.navigation = {
      "extents": "SurveyTemplateObject",
      "objectType": "Navigation",
      "origin": "VAL1",
      "index": 0,
      "inNavigations": [],
      "routes": [{
        "extents": "SurveyTemplateObject",
        "objectType": "Route",
        "origin": "VAL1",
        "destination": "VAL2",
        "name": "VAL1_VAL2",
        "isDefault": true,
        "conditions": []
      }]
    }
  }

  function mockActivityFacadeService($injector) {
    Mock.ActivityFacadeService = $injector.get('ActivityFacadeService');
    Mock.ActivityFacadeService.fillQuestion = jasmine.createSpy('fillQuestion');
    Mock.ActivityFacadeService.createQuestionFill = jasmine.createSpy('createQuestionFill').and.returnValue(Mock.filling);
    Injections.ActivityFacadeService = Mock.ActivityFacadeService;
  }

  function mockValidationService($injector) {
    Mock.ValidationService = $injector.get('otusjs.player.core.validation.ValidationService');
    Injections.ValidationService = Mock.ValidationService;
  }
});
