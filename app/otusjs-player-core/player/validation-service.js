(function() {
    'use strict';

    angular
        .module('otusjs.player.core')
        .service('otusjs.player.core.ValidateService', ValidateService);

    ValidateService.$inject = ['ElementRegisterFactory', 'ValidationService'];

    function ValidateService(ElementRegisterFactory, ValidationService){
        var self = this;

        self.validationPreview = validationPreview;

        function validationPreview() {
            var model;

            console.log('entrou aqui');
            var elementRegister = ElementRegisterFactory.create('IDENTIFICADOR', model);

            elementRegister.addValidator('upper-limit', {'reference': 10});
            elementRegister.addValidator('distinct', {'reference': 10});

            ValidationService.registerElement(elementRegister);
            ValidationService.validateAllElements(function(validationResponse) {
                console.log(validationResponse);
            });
        }
    }
}());
