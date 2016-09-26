describe('ReadValidationErrorStepService', function() {

  let Mock = {};
  let Injections = {};
  let service = {};
  let CAD1 = 'CAD1';

  beforeEach(function() {
    module('otusjs.player.core');

    inject(function(_$injector_) {
      mockItemData();
      mockActivityFacadeService(_$injector_);
      service = _$injector_.get('otusjs.player.core.player.ReadValidationErrorStepService', Injections);
    });
  });

  describe('effect method', function() {

    beforeEach(function() {
      mockTrueValidationResponse();
      spyOn(Mock.ActivityFacadeService, 'getCurrentItem').and.returnValue(Mock.itemData);
      service.catchPreData(Mock.flowData);
      service.effect();
    })

    it('should build an object with all validator results', function() {
      let flowData = service.getEffectResult();

      expect(flowData.validationResult.mandatory).toBeDefined();
      expect(flowData.validationResult.rangeDate).toBeDefined();
      expect(flowData.validationResult.minDate).toBeDefined();
    });

  });

  describe('afterEffect method', function() {

    // TODO

  });

  describe('getEffectResult method', function() {

    describe('when validation found problems', function() {

      beforeEach(function() {
        mockFalseValidationResponse();
        service.catchPreData(Mock.flowData);
        service.effect();
      })

      it('should return the flag hasError equal to true', function() {
        let flowData = service.getEffectResult();

        expect(flowData.validationResult.hasError).toBe(true);
      });

    });

    describe('when validation not found problems', function() {

      beforeEach(function() {
        mockTrueValidationResponse();
        service.catchPreData(Mock.flowData);
        service.effect();
      })

      it('should return the flag hasError equal to false', function() {
        let flowData = service.getEffectResult();

        expect(flowData.validationResult.hasError).toBe(false);
      });

    });

  });

  function mockItemData() {
    Mock.itemData = {
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
  }

  function mockActivityFacadeService($injector) {
    Mock.ActivityFacadeService = $injector.get('otusjs.player.core.activity.ActivityFacadeService');
    Injections.ActivityFacadeService = Mock.ActivityFacadeService;
  }

  function mockTrueValidationResponse() {
    Mock.flowData = {};
    Mock.flowData.validationResponse = {
      "elementID": "CAD1",
      "validators": [{
        "name": "mandatory",
        "reference": "true",
        "result": true
      }, {
        "name": "rangeDate",
        "reference": {
          "initial": "2016-09-01T03:00:00.000Z",
          "end": "2016-10-01T03:00:00.000Z"
        },
        "result": true
      }, {
        "name": "minDate",
        "reference": "2016-07-01T03:00:00.000Z",
        "result": true
      }]
    };
  }

  function mockFalseValidationResponse() {
    Mock.flowData = {};
    Mock.flowData.validationResponse = {
      "elementID": "CAD1",
      "validators": [{
        "name": "mandatory",
        "reference": "true",
        "result": true
      }, {
        "name": "rangeDate",
        "reference": {
          "initial": "2016-09-01T03:00:00.000Z",
          "end": "2016-10-01T03:00:00.000Z"
        },
        "result": false
      }, {
        "name": "minDate",
        "reference": "2016-07-01T03:00:00.000Z",
        "result": true
      }]
    };
  }
});
