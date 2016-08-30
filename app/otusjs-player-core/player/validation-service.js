(function() {
    'use strict';

    angular
        .module('otusjs.player.core')
        .service('otusjs.player.core.ValidateService', Service);

    Service.$inject = [
        'ElementRegisterFactory',
        'ValidationService',
    ];

    function Service(ElementRegisterFactory, ValidationService) {
        var self = this;

        self.setValidation = setValidation;
        self.applyValidation = applyValidation;

        function setValidation(question, answer) {
          var fillingRules = question.fillingRules.options;
            var elementRegister = ElementRegisterFactory.create(question.customID, answer);

            Object.keys(fillingRules).map(function(validator) {
                var reference = fillingRules[validator].data;
                elementRegister.addValidator(validator, reference);
            });
            ValidationService.registerElement(elementRegister);
        }

        function applyValidation(question, callback) {
          ValidationService.validateElement(question.customID, function(validationResponse) {
            console.log(question.fillingRules);
              console.log(validationResponse);
          });
        }
    }
}());
