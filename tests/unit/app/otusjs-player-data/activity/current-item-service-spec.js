describe('CurrentItemService', () => {

  let UNIT_NAME = 'otusjs.player.data.activity.CurrentItemService';
  let Mock = {};
  let Injections = {};
  let service;
  let VAL1 = 'VAL1';
  let VAL2 = 'VAL2';

  beforeEach(() => {
    module('otusjs.player.data');

    inject(function(_$injector_) {
      /* Test data */
      mockSurveyItems();
      mockValidationError();
      mockNavigations();
      mockItemFilling(_$injector_);

      /* Injectable mocks */
      mockActivityFacadeService(_$injector_);

      /* Helper mocks */
      mockItemObserver();

      service = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('applyFilling method', () => {

    beforeEach(() => {
      service.setup(Mock.itemVAL1, Mock.navigation);
      service.fill(Mock.rawFilling);
    });

    it('should apply the answer to SurveyActivity model', () => {
      service.applyFilling();

      expect(Mock.ActivityFacadeService.fillQuestion).toHaveBeenCalledWith(Mock.filling);
    });

  });

  describe('attachValidationError method', () => {

    beforeEach(() => {
      service.setup(Mock.itemVAL1, Mock.navigation);
      service.observerRegistry(Mock.itemObserver);
      service.fill(Mock.rawFilling);
    });

    it('should keep the validation error data', () => {
      service.attachValidationError(Mock.validationError);

      expect(service.getValidationError()).toEqual(Mock.validationError);
    });

    it('should notify the observer', () => {
      service.attachValidationError(Mock.validationError);

      expect(Mock.itemObserver.updateValidation).toHaveBeenCalledWith(Mock.validationError);
    });

  });

  describe('fill method', () => {

    describe('when the item is a question', () => {

      beforeEach(() => {
        service.setup(Mock.itemVAL1, Mock.navigation);
        service.fill(Mock.rawFilling);
      });

      it('should keep the answer value', () => {
        expect(service.getFilling().answer.value).toBe(Mock.rawFilling.answer);
      });

      it('should keep the metadata value', () => {
        expect(service.getFilling().metadata.value).toBe(Mock.rawFilling.metadata);
      });

      it('should keep the comment value', () => {
        expect(service.getFilling().comment).toBe(Mock.rawFilling.comment);
      });

    });

    describe('when the item is not a question', () => {

      beforeEach(() => {
        service.setup(Mock.itemVAL3, Mock.navigation);
      });

      it('should not change the filling value', () => {
        service.fill(Mock.rawFilling);
        expect(service.getFilling()).toBe(null);
      })

    });

  });

  describe('hasItem method', () => {

    describe('when an item has been setted', () => {

      beforeEach(() => {
        service.setup(Mock.itemVAL1, Mock.navigation);
      });

      it('should return true', () => {
        expect(service.hasItem()).toBe(true);
      });

    });

    describe('when an item not has been setted', () => {

      it('should return false', () => {
        expect(service.hasItem()).toBe(false);
      });

    });

  });

  describe('shouldApplyAnswer method', () => {

    describe('when item is a question', () => {

      beforeEach(() => {
        service.setup(Mock.itemVAL1, Mock.navigation);
      });

      it('should return true', () => {
        expect(service.shouldApplyAnswer()).toBe(true);
      });

    });

    describe('when item is not a question', () => {

      beforeEach(() => {
        service.setup(Mock.itemVAL3, Mock.navigation);
      });

      it('should return false', () => {
        expect(service.shouldApplyAnswer()).toBe(false);
      });

    });

  });

  describe('shouldIgnoreResponseEvaluation method', () => {

    describe('when item is a question', () => {

      beforeEach(() => {
        service.setup(Mock.itemVAL1, Mock.navigation);
      });

      it('should return false', () => {
        expect(service.shouldIgnoreResponseEvaluation()).toBe(false);
      });

    });

    describe('when item is not a question', () => {

      beforeEach(() => {
        service.setup(Mock.itemVAL3, Mock.navigation);
      });

      it('should return true', () => {
        expect(service.shouldIgnoreResponseEvaluation()).toBe(true);
      });

    });

  });

  describe('setup method', () => {

    describe('on all cases', () => {

      it('should keep a reference to the item in use', () => {
        service.setup(Mock.itemVAL1);

        expect(service.getItem()).toEqual(Mock.itemVAL1);
      });

      it('should keep a reference to navigation of the item in use', () => {
        service.setup(Mock.itemVAL1, Mock.navigation);

        expect(service.getNavigation()).toEqual(Mock.navigation);
      });

      describe('when item is a question', () => {

        it('should create a QuestionFill and keep it', () => {
          service.setup(Mock.itemVAL1, Mock.navigation);

          expect(service.getFilling()).toEqual(Mock.filling);
        });

      });

      describe('when item is not a question', () => {

        it('should not create a QuestionFill and keep a null to these data', () => {
          service.setup(Mock.itemVAL3, Mock.navigation);

          expect(service.getFilling()).toEqual(null);
        });

      });

    });

    describe('when the current item has not a previous item', () => {

      it('should keep a null value', () => {
        service.setup(Mock.itemVAL1, Mock.navigation);

        expect(service.getPreviousItem()).toBe(null);
      });

    });

    describe('when the current item has a previous item', () => {

      it('should keep the customID of previous item', () => {
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
    Mock.filling = Mock.QuestionFillFactory.create(Mock.rawFilling.customID);
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
    Mock.itemVAL3 = {}

    Mock.itemVAL1.isQuestion = jasmine.createSpy('isQuestion').and.returnValue(true);
    Mock.itemVAL2.isQuestion = jasmine.createSpy('isQuestion').and.returnValue(true);
    Mock.itemVAL3.isQuestion = jasmine.createSpy('isQuestion').and.returnValue(false);

    Mock.itemContainer = [Mock.itemVAL1, Mock.itemVAL2, Mock.itemVAL3];
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
});
