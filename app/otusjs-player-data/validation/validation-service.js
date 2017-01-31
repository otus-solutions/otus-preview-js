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
      ValidationService.validateElement(currentItemService.getItem().customID, callback);
    }

    function setupValidation(currentItemService, answer) {
      _answer = answer;
      _elementRegister = ElementRegisterFactory.create(currentItemService.getItem().customID, answer);

      if (currentItemService.getFilling().forceAnswer) {
        Object.keys(currentItemService.getItem().fillingRules.options).filter(function(validator) {
          if (!currentItemService.getItem().fillingRules.options[validator].data.canBeIgnored) {
            _addValidator(validator, currentItemService);
          }
        });
      } else {
        Object.keys(currentItemService.getItem().fillingRules.options).map(function(validator) {
          _addValidator(validator, currentItemService);
        });
      }

      ValidationService.unregisterElement(_elementRegister.id);
      ValidationService.registerElement(_elementRegister);
    }

    function _addValidator(validator, currentItemService) {
      var reference = currentItemService.getItem().fillingRules.options[validator].data;
      _elementRegister.addValidator(validator, reference);
    }
  }
}());
