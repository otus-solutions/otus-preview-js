describe('CurrentItemService', function() {

  var UNIT_NAME = 'otusjs.player.data.activity.CurrentItemService';
  var Mock = {};
  var Injections = {};
  var service;
  var data = {};
  var VAL1 = 'VAL1';
  var VAL2 = 'VAL2';

  beforeEach(function () {
    module('otusjs.player');

    inject(function (_$injector_) {
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
    data.items = Mock.itemContainer;
    data.navigation = Mock.navigation;
  });

  it('controller method should have a defined controller', function () {
    expect(service).toBeDefined();
  });

  it('Methods should defined service', function () {
    expect(service.applyFilling).toBeDefined();
    expect(service.attachValidationError).toBeDefined();
    expect(service.clearData).toBeDefined();
    expect(service.fill).toBeDefined();
    expect(service.getFilling).toBeDefined();
    expect(service.getFillingContainer).toBeDefined();
    expect(service.getFillingRules).toBeDefined();
    expect(service.getItems).toBeDefined();
    expect(service.getItemsByTemplateID).toBeDefined();
    expect(service.getNavigation).toBeDefined();
    expect(service.getValidationError).toBeDefined();
    expect(service.hasItems).toBeDefined();
    expect(service.shouldIgnoreResponseEvaluation).toBeDefined();
    expect(service.shouldApplyAnswer).toBeDefined();
    expect(service.observerRegistry).toBeDefined();
    expect(service.setup).toBeDefined();
  });

  describe('getFillingRules method', function () {

    beforeEach(function () {
      Mock.ActivityFacadeService.getFillingByQuestionID = jasmine.createSpy('getFillingByQuestionID').and.returnValue(Mock.filling);
      service.setup(data);
      service.fill({'VAL1': Mock.filling});
    });

    it('should getFillingRules return fillingRules options', function () {

      expect(JSON.stringify(service.getFillingRules(VAL1))).toEqual(Mock.option);
    });

  });

  describe('getItemsByTemplateID method', function () {

    beforeEach(function () {
      Mock.ActivityFacadeService.getFillingByQuestionID = jasmine.createSpy('getFillingByQuestionID').and.returnValue(Mock.filling);
      service.setup(data);
    });

    it('should getItemsByTemplateID return surveyItemGroup', function () {

      expect(JSON.stringify(service.getItemsByTemplateID(VAL1))).toEqual(JSON.stringify(Mock.surveyItemGruop));
    });

  });

  describe('applyFilling method', function () {

    beforeEach(function () {
      Mock.ActivityFacadeService.getFillingByQuestionID = jasmine.createSpy('getFillingByQuestionID').and.returnValue(Mock.filling);
      service.setup(data);
      service.fill(Mock.filling);
    });

    it('should apply the answer to SurveyActivity model', function () {
      service.applyFilling();

      expect(Mock.ActivityFacadeService.fillQuestion).toHaveBeenCalledWith(Mock.filling);
    });

  });

  describe('attachValidationError method', function () {

    beforeEach(function () {
      Mock.ActivityFacadeService.getFillingByQuestionID = jasmine.createSpy('getFillingByQuestionID').and.returnValue(Mock.filling);
      service.setup(data);
      service.observerRegistry(Mock.itemObserver);
      service.fill(Mock.filling);
    });

    it('should keep the validation error data', function () {
      service.attachValidationError(Mock.validationError);

      expect(service.getValidationError()).toEqual(Mock.validationError);
    });

    it('should notify the observer', function () {
      service.attachValidationError({'VAL1': {}});

      expect(Mock.itemObserver.updateValidation).toHaveBeenCalledTimes(1);
    });

  });

  describe('fill method', function () {

    describe('when the item is a question', function () {

      beforeEach(function () {
        Mock.ActivityFacadeService.getFillingByQuestionID = jasmine.createSpy('getFillingByQuestionID').and.returnValue(Mock.filling);
        service.setup(data);
        service.fill(Mock.filling);
      });

      it('should keep the answer value', function () {
        expect(service.getFilling(VAL1).answer.value).toBe(Mock.filling.answer.value);
      });

      it('should keep the metadata value', function () {
        expect(service.getFilling(VAL1).metadata.value).toBe(Mock.filling.metadata.value);
      });

      it('should keep the comment value', function () {
        expect(service.getFilling(VAL1).comment).toBe(Mock.filling.comment);
      });

    });

    describe('when the item is not a question', function () {
      it('should not change the filling value', function () {
        service.fill({});
        expect(JSON.stringify(service.getFillingContainer())).toBe(JSON.stringify({undefined: {}}));
      });
    });

  });

  describe('hasItems method', function () {

    describe('when an item has been setted', function () {

      beforeEach(function () {
        Mock.ActivityFacadeService.getFillingByQuestionID = jasmine.createSpy('getFillingByQuestionID').and.returnValue(Mock.filling);
        service.setup(data);
      });

      it('should return true', function () {
        expect(service.hasItems()).toBe(true);
      });

    });

    describe('when an item not has been setted', function () {

      it('should return false', function () {
        expect(service.hasItems()).toBe(false);
      });

    });

  });

  describe('shouldApplyAnswer method', function () {

    describe('when item is a question', function () {

      beforeEach(function () {
        Mock.ActivityFacadeService.getFillingByQuestionID = jasmine.createSpy('getFillingByQuestionID').and.returnValue(Mock.filling);
        service.setup(data);
      });

      it('should return true', function () {
        expect(service.shouldApplyAnswer()).toBe(true);
      });

    });

    xdescribe('when item is not a question', function () {

      beforeEach(function () {
        service.setup(data);
      });

      it('should return false', function () {
        expect(service.shouldApplyAnswer()).toBe(false);
      });

    });

  });

  describe('shouldIgnoreResponseEvaluation method', function () {

    describe('when item is a question', function () {

      beforeEach(function () {
        Mock.ActivityFacadeService.getFillingByQuestionID = jasmine.createSpy('getFillingByQuestionID').and.returnValue(Mock.filling);
        service.setup(data);
      });

      it('should return false', function () {
        expect(service.shouldIgnoreResponseEvaluation()).toBe(false);
      });

    });

    xdescribe('when item is not a question', function () {

      beforeEach(function () {
        service.setup(data);
      });

      it('should return true', function () {
        expect(service.shouldIgnoreResponseEvaluation()).toBe(true);
      });

    });

  });

  describe('setup method', function () {

    describe('on all cases', function () {

      beforeEach(function () {
        Mock.ActivityFacadeService.getFillingByQuestionID = jasmine.createSpy('getFillingByQuestionID').and.returnValue(Mock.filling);
      });

      it('should keep a reference to the item in use', function () {
        service.setup(data);

        expect(service.getItems()).toEqual(Mock.itemContainer);
      });

      it('should keep a reference to navigation of the item in use', function () {
        service.setup(data);

        expect(service.getNavigation()).toEqual(Mock.navigation);
      });

      describe('when item is a question', function () {

        describe('and exists a filling to question', function () {

          beforeEach(function () {
            Mock.ActivityFacadeService.getFillingByQuestionID = jasmine.createSpy('getFillingByQuestionID').and.returnValue(Mock.filling);
          });

          it('should not create a QuestionFill and keep the existent data', function () {
            service.setup(data);

            expect(service.getFilling(VAL1)).toEqual(Mock.filling);
          });

        });

        describe('and not exists a filling to question', function () {

          beforeEach(function () {
            Mock.ActivityFacadeService.getFillingByQuestionID = jasmine.createSpy('getFillingByQuestionID').and.returnValue(null);
            Mock.ActivityFacadeService.createQuestionFill = jasmine.createSpy('createQuestionFill').and.returnValue(Mock.filling);
          });

          it('should create a QuestionFill and keep it', function () {
            service.setup(data);

            expect(service.getFilling(VAL1)).toEqual(Mock.filling);
          });

        });

      });

      describe('when item is not a question', function () {

        it('should not create a QuestionFill and keep a undefined to these data', function () {
          service.setup(data);

          expect(service.getFilling('VAL3')).toEqual(undefined);
        });

      });

    });

  });

  function mockItemObserver() {
    Mock.itemObserver = {
      'itemData': {
        'templateID': 'VAL1'
      }
    };
    Mock.itemObserver.updateValidation = jasmine.createSpy('updateValidation');
    Mock.itemObserver.pushData = jasmine.createSpy('pushData');
  }

  function mockValidationError() {
    Mock.validationError = {};
  }

  function mockItemFilling($injector) {
    Mock.rawFilling = {};
    Mock.rawFilling.customID = VAL1;
    Mock.rawFilling.templateID = VAL1;
    Mock.rawFilling.answer = '10/09/2016';
    Mock.rawFilling.metadata = 0;
    Mock.rawFilling.comment = 'Aceitar essa responsta a qualquer custo!';

    Mock.QuestionFillFactory = $injector.get('otusjs.model.activity.QuestionFillFactory');
    Mock.filling = Mock.QuestionFillFactory.create(Mock.rawFilling.templateID);
    Mock.option = '{"mandatory":{"extends":"StudioObject","objectType":"Rule","validatorType":"mandatory","data":{"reference":true}},"rangeDate":{"extends":"StudioObject","objectType":"Rule","validatorType":"rangeDate","data":{"reference":{"initial":"2016-09-01T03:00:00.000Z","end":"2016-10-01T03:00:00.000Z"}}},"minDate":{"extends":"StudioObject","objectType":"Rule","validatorType":"minDate","data":{"reference":"2016-07-01T03:00:00.000Z"}},"maxDate":{"extends":"StudioObject","objectType":"Rule","validatorType":"maxDate","data":{"reference":"2016-12-01T02:00:00.000Z"}}}';
    Mock.surveyItemGruop = {
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
  Mock.itemVAL3 = {};

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
  };
}

function mockActivityFacadeService($injector) {
  Mock.ActivityFacadeService = $injector.get('otusjs.model.activity.ActivityFacadeService');

  Mock.ActivityFacadeService.fillQuestion = jasmine.createSpy('fillQuestion');

  Injections.ActivityFacadeService = Mock.ActivityFacadeService;
}
});
