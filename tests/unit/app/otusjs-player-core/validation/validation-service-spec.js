describe('Validate Service', function() {

  var Mock = {};
  var service;

  beforeEach(function() {
    module('otusjs.player.core');

    inject(function(_$injector_) {
      service = _$injector_.get('otusjs.player.core.validation.ValidationService');

      mockElementRegisterFactory(_$injector_);
      mockValidationService(_$injector_);
    });
  });

  describe('whatever', function() {

    it('should do whatever', function() {
      service.setValidation(Mock.question, {});
    });
  });

  function mockElementRegisterFactory($injector) {
    Mock.ElementRegisterFactory = $injector.get('ElementRegisterFactory');

    // spyOn(Mock.ItemManagerService, 'init').and.callThrough();

    return Mock.ElementRegisterFactory;
  }

  function mockValidationService($injector) {
    Mock.ValidationService = $injector.get('ValidationService');

    return Mock.ValidationService;
  }

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
});
