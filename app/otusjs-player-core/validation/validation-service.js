(function() {
  'use strict';

  angular
    .module('otusjs.player.core.validation')
    .service('otusjs.player.core.validation.ValidationService', Service);

  Service.$inject = [
    'ElementRegisterFactory',
    'ValidationService',
  ];

  function Service(ElementRegisterFactory, ValidationService) {
    var self = this;
    var elementRegister;

    self.setValidation = setValidation;
    self.applyValidation = applyValidation;
    self.finishValidation = finishValidation;

    function setValidation(question, answer) {
      var fillingRules = question.fillingRules.options;
      elementRegister = ElementRegisterFactory.create(question.customID, answer);
      Object.keys(fillingRules).map(function(validator) {
        var reference = fillingRules[validator].data;
        elementRegister.addValidator(validator, reference);
      });
      ValidationService.registerElement(elementRegister);
    }

    function finishValidation() {
      ValidationService.validateAllElements(function(response) {
        //TODO
      });
    }

    function applyValidation(question, callback) {
      ValidationService.validateElement(question.customID, callback);
    }
  }
}());
