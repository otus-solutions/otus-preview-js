xdescribe('ItemFillingValidatorService', function() {

  let UNIT_NAME = 'otusjs.player.data.validation.ItemFillingValidatorService';
  let Mock = {};
  let Injections = {};
  let service;

  beforeEach(function() {
    module('otusjs.player.data');

    inject(function(_$injector_) {
      mockItemData();
      mockElementRegisterFactory(_$injector_);
      mockValidationService(_$injector_);
      service = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('whatever', function() {

    it('should do whatever', function() {
      service.setValidation(Mock.question, {});
    });

  });

  function mockItemData() {
    Mock.question = {
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

  function mockElementRegisterFactory($injector) {
    Mock.ElementRegisterFactory = $injector.get('ElementRegisterFactory');
    Injections.ElementRegisterFactory = Mock.ElementRegisterFactory;
  }

  function mockValidationService($injector) {
    Mock.ValidationService = $injector.get('ValidationService');
    Injections.ValidationService = Mock.ValidationService;
  }
});
