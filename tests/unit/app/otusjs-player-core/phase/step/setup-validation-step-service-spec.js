xdescribe('SetupValidationStepService', function() {

  let Mock = {};
  let Injections = {};
  let service = {};
  let CAD1 = 'CAD1';

  beforeEach(function() {
    module('otusjs.player.core');

    inject(function(_$injector_) {
      mockExecutionPipe();
      mockFlowData();
      mockItemData();
      mockNavigationService(_$injector_);
      mockValidationService(_$injector_);
      mockElementRegisterFactory(_$injector_);
      service = _$injector_.get('otusjs.player.core.step.SetupValidationStepService', Injections);
    });
  });

  describe('effect method', function() {

    beforeEach(function() {
      spyOn(Mock.ElementRegisterFactory, 'create').and.returnValue(Mock.elementRegister);
      spyOn(Mock.ValidationService, 'registerElement');
      spyOn(Mock.elementRegister, 'addValidator');
      service.beforeEffect(Mock.pipe, Mock.flowData);
      service.effect(Mock.pipe, Mock.flowData);
    })

    it('should retrieve the current item', function() {
      expect(Mock.NavigationService.getCurrentItem).toHaveBeenCalledWith();
    });

    it('should create an ElementRegister instance', function() {
      expect(Mock.ElementRegisterFactory.create).toHaveBeenCalledWith(Mock.itemData.customID,   Mock.flowData.answerToEvaluate);
    });

    it('should add a validator in ElementRegister instance for each filling rule option', function() {
      expect(Mock.elementRegister.addValidator).toHaveBeenCalled();
    });

    it('should register the ElementRegister instance in ValidationService', function() {
      expect(Mock.ValidationService.registerElement).toHaveBeenCalledWith(Mock.elementRegister);
    });

  });

  function mockExecutionPipe() {
    Mock.pipe = {};
  }

  function mockFlowData() {
    Mock.flowData = {};
    Mock.flowData.answerToEvaluate = {};
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

  function mockNavigationService($injector) {
    Mock.NavigationService = $injector.get('otusjs.player.data.navigation.NavigationService');

    let currentItem = {};
    currentItem.getItem = () => { return Mock.itemData; };
    currentItem.shouldIgnoreResponseEvaluation = () => { return false; };
    spyOn(Mock.NavigationService, 'getCurrentItem').and.returnValue(currentItem);

    Injections.NavigationService = Mock.NavigationService;
  }

  function mockValidationService($injector) {
    Mock.ValidationService = $injector.get('ValidationService');
    Injections.ValidationService = Mock.ValidationService;
  }

  function mockElementRegisterFactory($injector) {
    Mock.ElementRegisterFactory = $injector.get('ElementRegisterFactory');
    Mock.elementRegister = Mock.ElementRegisterFactory.create(Mock.itemData, { data: {} });
    Injections.ElementRegisterFactory = Mock.ElementRegisterFactory;
  }
});
