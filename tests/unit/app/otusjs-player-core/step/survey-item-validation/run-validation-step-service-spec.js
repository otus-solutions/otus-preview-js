xdescribe('RunValidationStepService', function() {

  var Mock = {};
  var Injections = {};
  var service = {};
  var CAD1 = 'CAD1';

  beforeEach(function() {
    module('otusjs.player.core');

    inject(function(_$injector_) {
      mockExecutionPipe();
      mockFlowData();
      mockItemData();
      mockActivityFacadeService(_$injector_);
      mockActionOverflowService(_$injector_);
      mockReadValidationErrorStepService(_$injector_);
      mockValidationService(_$injector_);
      service = _$injector_.get('otusjs.player.core.step.RunValidationStepService', Injections);
    });
  });

  describe('effect method', function() {

    beforeEach(function() {
      spyOn(Mock.currentItem, 'getItem');
      spyOn(Mock.ValidationService, 'validateElement');

      service.beforeEffect(Mock.pipe, Mock.flowData);
      service.effect(Mock.pipe, Mock.flowData);
    })

    it('should retrieve the current item', function() {
      expect(Mock.currentItem.getItem).toHaveBeenCalledWith();
    });

    it('should validate the item with ValidationService', function() {
      expect(Mock.ValidationService.validateElement).toHaveBeenCalledWith(Mock.itemData.customID, jasmine.any(Function));
    });

  });

  describe('afterEffect method', function() {

    describe('when validation found error', function() {

      beforeEach(function() {
        mockFalseValidationResponse();
        spyOn(Mock.ValidationService, 'validateElement').and.callFake(_callback);
        spyOn(Mock.ActionOverflowService, 'pipe');
        spyOn(Mock.ActionOverflowService, 'execute');
        service.effect(Mock.pipe, Mock.flowData);
        service.afterEffect(Mock.pipe, Mock.flowData);
      })

      it('should pipe ReadValidationErrorStepService to ActionOverflowService', function() {
        expect(Mock.ActionOverflowService.pipe).toHaveBeenCalledWith(Mock.ReadValidationErrorStepService, Mock.validationResponse);
      });

      it('should execute ActionOverflowService', function() {
        expect(Mock.ActionOverflowService.execute).toHaveBeenCalledWith();
      });

    });

    describe('when validation does not found error', function() {

      beforeEach(function() {
        mockTrueValidationResponse();
        spyOn(Mock.ValidationService, 'validateElement').and.callFake(_callback);
        spyOn(Mock.ActionOverflowService, 'pipe');
        spyOn(Mock.ActionOverflowService, 'execute');
        service.effect(Mock.pipe, Mock.flowData);
        service.afterEffect(Mock.pipe, Mock.flowData);
      })

      it('should pipe ReadValidationErrorStepService to ActionOverflowService', function() {
        expect(Mock.ActionOverflowService.pipe).not.toHaveBeenCalledWith(Mock.ReadValidationErrorStepService, Mock.validationResponse);
      });

      it('should execute ActionOverflowService', function() {
        expect(Mock.ActionOverflowService.execute).not.toHaveBeenCalledWith();
      });

    });

  });

  describe('getEffectResult method', function() {

    it('should return null', function() {
      expect(service.getEffectResult(Mock.pipe, Mock.flowData)).toBeDefined();
    });

  });

  function _callback() {
    var callback = arguments[1];
    return callback([Mock.validationResponse]);
  }

  function mockExecutionPipe() {
    Mock.pipe = {};
  }

  function mockFlowData() {
    Mock.flowData = {};
  }

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

  function mockTrueValidationResponse() {
    Mock.validationResponse = {
      "elementID": "CAD1",
      "validatorsResponse": [{
        "name": "mandatory",
        "reference": "true",
        "result": "true"
      }, {
        "name": "rangeDate",
        "reference": {
          "initial": "2016-09-01T03:00:00.000Z",
          "end": "2016-10-01T03:00:00.000Z"
        },
        "result": "true"
      }, {
        "name": "minDate",
        "reference": "2016-07-01T03:00:00.000Z",
        "result": "true"
      }]
    };
  }

  function mockFalseValidationResponse() {
    Mock.validationResponse = {
      "elementID": "CAD1",
      "validatorsResponse": [{
        "name": "mandatory",
        "reference": "true",
        "result": "true"
      }, {
        "name": "rangeDate",
        "reference": {
          "initial": "2016-09-01T03:00:00.000Z",
          "end": "2016-10-01T03:00:00.000Z"
        },
        "result": "false"
      }, {
        "name": "minDate",
        "reference": "2016-07-01T03:00:00.000Z",
        "result": "true"
      }]
    };
  }

  function mockActivityFacadeService($injector) {
    Mock.ActivityFacadeService = $injector.get('otusjs.player.data.activity.ActivityFacadeService');
    Mock.currentItem = {};
    Mock.currentItem.getItem = function() { return false; };
    Mock.currentItem.shouldIgnoreResponseEvaluation = function() { return false; };

    spyOn(Mock.ActivityFacadeService, 'getCurrentItem').and.returnValue(Mock.currentItem);

    Injections.ActivityFacadeService = Mock.ActivityFacadeService;
  }

  function mockActionOverflowService($injector) {
    Mock.ActionOverflowService = $injector.get('otusjs.player.core.player.ActionOverflowService');
    Injections.ActionOverflowService = Mock.ActionOverflowService;
  }

  function mockReadValidationErrorStepService($injector) {
    Mock.ReadValidationErrorStepService = $injector.get('otusjs.player.core.step.ReadValidationErrorStepService');
    Injections.ReadValidationErrorStepService = Mock.ReadValidationErrorStepService;
  }

  function mockValidationService($injector) {
    Mock.ValidationService = $injector.get('ValidationService');
    Injections.ValidationService = Mock.ValidationService;
  }
});
