describe('ItemFillingValidatorService', function() {

  var UNIT_NAME = 'otusjs.player.data.validation.ItemFillingValidatorService';
  var Mock = {};
  var Injections = [];
  var service;
  var data = {};
  var _answers = [];

  beforeEach(function() {
    angular.mock.module('otusjs.player');

    angular.mock.inject(function(_$injector_) {
      mockItemData(_$injector_);
      Injections.ElementRegisterFactory =  _$injector_.get('ElementRegisterFactory');
      Injections.ValidationService = _$injector_.get('otusjs.validation.api.ValidationService');

      service = _$injector_.get(UNIT_NAME, Injections);
    });

    data.items = Mock.itemContainer;
    data.navigation = Mock.navigation;

    Mock.currentItemService.setup(data);
    _answers = {'VAL1': {'data': '1'}};

    spyOn(Injections.ValidationService, 'validateElement');
    spyOn(Injections.ValidationService, 'unregisterElement');
    spyOn(Injections.ValidationService, 'registerElement');

    service.setupValidation(Mock.currentItemService,_answers);
  });

  describe('applyValidation method', function() {

    it('should execute element validation upon question', function() {
      var callback = jasmine.any(Function);

      service.applyValidation(Mock.currentItemService, callback);

      expect(Injections.ValidationService.validateElement).toHaveBeenCalledTimes(1);
    });

  });

  describe('setupValidation method', function() {

    it('should execute element validation and element register upon question', function() {
      service.setupValidation(Mock.currentItemService,_answers);

      expect(Injections.ValidationService.unregisterElement).toHaveBeenCalledTimes(2);
      expect(Injections.ValidationService.registerElement).toHaveBeenCalledTimes(2);
    });

  });

  function mockItemData($injector) {
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

    Mock.rawFilling = {};
    Mock.rawFilling.customID = 'VAL1';
    Mock.rawFilling.templateID = 'VAL1';
    Mock.rawFilling.answer = '10/09/2016';
    Mock.rawFilling.metadata = 0;
    Mock.rawFilling.comment = 'Aceitar essa responsta a qualquer custo!';

    Mock.QuestionFillFactory = $injector.get('otusjs.model.activity.QuestionFillFactory');
    Mock.filling = Mock.QuestionFillFactory.create(Mock.rawFilling.templateID);

    Mock.itemVAL1.isQuestion = jasmine.createSpy('isQuestion').and.returnValue(true);

    Mock.itemContainer = [Mock.itemVAL1];

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

    Mock.ActivityFacadeService = $injector.get('otusjs.model.activity.ActivityFacadeService');

    spyOn(Mock.ActivityFacadeService,'getFillingByQuestionID').and.returnValue(Mock.filling);

    Mock.currentItemService = $injector.get('otusjs.player.data.activity.CurrentItemService');
  }

});
