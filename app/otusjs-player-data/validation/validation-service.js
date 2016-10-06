(function() {
  'use strict';

  angular
    .module('otusjs.player.data.validation')
    .service('otusjs.player.data.validation.ItemFillingValidatorService', Service);

  Service.$inject = [
    'ElementRegisterFactory',
    'ValidationService',
  ];

  function Service(ElementRegisterFactory, ValidationService) {
    var self = this;
    var elementRegister;

    /* Public methods */
    self.applyValidation = applyValidation;
    self.setupValidation = setupValidation;

    function applyValidation(item, callback) {
      ValidationService.validateElement(item.customID, callback);
    }

    function setupValidation(item, answer) {
      let elementRegister = ElementRegisterFactory.create(item.customID, answer);

      Object.keys(item.fillingRules.options).map((validator) => {
        let reference = item.fillingRules.options[validator].data;
        elementRegister.addValidator(validator, reference);
      });

      ValidationService.unregisterElement(elementRegister.id);
      ValidationService.registerElement(elementRegister);
    }
  }
}());
