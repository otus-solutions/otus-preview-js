(function() {
    'use strict';

    angular
        .module('otusjs.player.core')
        .service('otusjs.player.core.ValidateService', Service);

    Service.$inject = [
        'ElementRegisterFactory',
        'ValidationService',
        'otusjs.player.core.CurrentQuestion'
    ];

    function Service(ElementRegisterFactory, ValidationService, CurrentQuestion) {
        var self = this;

        self.validationPreview = validationPreview;
        self.applyValidation = applyValidation;

        function validationPreview() {
            var question = CurrentQuestion.getQuestion();
            var model = CurrentQuestion.getAnswer();
            var fillingRulesList = question.fillingRules.options;
            var elementRegister = ElementRegisterFactory.create(question.customID, model);
            Object.keys(fillingRulesList).map(function(validator){
              reference = fillingRulesList[validator].data.reference;
              elementRegister.addValidator(validator, {
                  'reference': reference
              });            });

            ValidationService.registerElement(elementRegister);
            ValidationService.validateAllElements(function(validationResponse) {
                // console.log(validationResponse);
            });
        }
        function applyValidation(){
          var question = CurrentQuestion.getQuestion();
          var model = CurrentQuestion.getAnswer();
          var fillingRulesList = question.fillingRules.options;
          var elementRegister = ElementRegisterFactory.create(question.customID, model);
          Object.keys(fillingRulesList).map(function(validator){
            // console.log(fillingRulesList[validator].data.reference);
          });
        }
    }
}());
