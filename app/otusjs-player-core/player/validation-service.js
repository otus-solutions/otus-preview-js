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
                response.map(function(validationResponse) {
                  console.log('id - ' + validationResponse.elementID);
                    validationResponse.validatorsResponse.map(function(ValidatorResponse) {
                        console.log(ValidatorResponse.name + ' - ' + ValidatorResponse.result);
                    });
                });
            });
        }

        function applyValidation(question, callback) {
            ValidationService.validateElement(question.customID, callback);
        }
    }
}());
