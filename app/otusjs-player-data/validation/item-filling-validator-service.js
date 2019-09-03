(function() {
  'use strict';

  angular
    .module('otusjs.player.data.validation')
    .service('otusjs.player.data.validation.ItemFillingValidatorService', Service);

  Service.$inject = [
    'ElementRegisterFactory',
    'otusjs.validation.api.ValidationService',
  ];

  function Service(ElementRegisterFactory, ValidationService) {
    var self = this;
    var _elementRegister;
    var _answer = {};

    /* Public methods */
    self.applyValidation = applyValidation;
    self.setupValidation = setupValidation;

    function applyValidation(currentItemService, callback) {
      ValidationService.unregisterElement(_elementRegister.id);
      setupValidation(currentItemService, _answer);
      currentItemService.getItems().forEach(function (surveyItem) {
        ValidationService.validateElement(surveyItem.customID, callback);
      });
    }

    function setupValidation(currentItemService, answer) {
      _answer = answer;
      console.log(_answer);
      _elementRegister = null;

      currentItemService.getItems().forEach(function (surveyItem) {
        _elementRegister = ElementRegisterFactory.create(surveyItem.customID, answer);
        if (currentItemService.getFilling(surveyItem.templateID).forceAnswer) {
          console.log("Passou pelo if");
          Object.keys(surveyItem.fillingRules.options).filter(function(validator) {
            if (!surveyItem.fillingRules.options[validator].data.canBeIgnored) {
              _addValidator(validator, surveyItem);
            }
          });
        } else {
          console.log("Passou pelo else");
          Object.keys(surveyItem.fillingRules.options).map(function(validator) {
            _addValidator(validator, surveyItem);
          });
          _setupImmutableDateValidation(surveyItem);
        }
        ValidationService.unregisterElement(_elementRegister.id);
        ValidationService.registerElement(_elementRegister);
      });
    }

    function _addValidator(validator, surveyItem) {
      var reference = surveyItem.fillingRules.options[validator].data;
      _elementRegister.addValidator(validator, reference);
    }

    function _setupImmutableDateValidation(surveyItem) {
      var currentItemItemType = surveyItem.objectType;
      if(currentItemItemType === "TimeQuestion" || currentItemItemType === "CalendarQuestion") {
        _elementRegister.addValidator("ImmutableDate", surveyItem);
      }
    }
  }
}());
