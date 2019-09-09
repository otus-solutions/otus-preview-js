(function () {
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
    var _elementRegisters = {};
    var _answers = [];

    /* Public methods */
    self.applyValidation = applyValidation;
    self.setupValidation = setupValidation;

    function applyValidation(currentItemService, callback) {
      // ValidationService.unregisterElement(_elementRegisters.id);
      setupValidation(currentItemService, _answers);
      Object.keys(_answers).forEach(templateID => {
        ValidationService.validateElement(templateID, callback);
      });
    }

    function setupValidation(currentItemService, answerObject) {
      _answers = answerObject;

      currentItemService.getItems().forEach(function (surveyItem) {
        let templateID = surveyItem.templateID;
        let answer = answerObject[templateID];

        let elementRegister = ElementRegisterFactory.create(templateID, answer);

        if (currentItemService.getFilling(templateID).forceAnswer) {
          Object.keys(surveyItem.fillingRules.options).filter(function (validator) {
            if (!surveyItem.fillingRules.options[validator].data.canBeIgnored) {
              _addValidator(elementRegister, validator, surveyItem);
            }
          });
        } else {
          Object.keys(surveyItem.fillingRules.options).map(function (validator) {
            _addValidator(elementRegister, validator, surveyItem);
          });
          _setupImmutableDateValidation(elementRegister, surveyItem);
        }
        _elementRegisters[templateID] = elementRegister;

        ValidationService.unregisterElement(elementRegister.id);
        ValidationService.registerElement(elementRegister);
      });
    }

    function _addValidator(elementRegister, validator, surveyItem) {
      var reference = surveyItem.fillingRules.options[validator].data;
      elementRegister.addValidator(validator, reference);
    }

    function _setupImmutableDateValidation(elementRegister, surveyItem) {
      var currentItemItemType = surveyItem.objectType;
      if (currentItemItemType === "TimeQuestion" || currentItemItemType === "CalendarQuestion") {
        elementRegister.addValidator("ImmutableDate", surveyItem);
      }
    }
  }
}());
