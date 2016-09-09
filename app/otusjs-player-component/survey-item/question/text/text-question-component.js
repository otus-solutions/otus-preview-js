(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusTextQuestion', {
            templateUrl: 'app/otusjs-player-component/survey-item/question/text/text-question-template.html',
            controller: TextQuestionController,
            bindings: {
                itemData: '<',
                onUpdate: '&'
            }
        });

    TextQuestionController.$inject = [
        '$scope',
        '$element',
        'otusjs.player.core.CurrentQuestion',
        'uiSpecialsService',
        'uiAlphanumericService'
    ];

    function TextQuestionController($scope, $element, CurrentQuestion, uiSpecialsService, uiAlphanumericService) {
        var self = this;

        self.update = function() {
            self.onUpdate({
                valueType: 'answer',
                value: self.answer
            });
        };

        self.verifyValidator = function($event) {
            console.log('É um validador ');
            uiAlphanumericService.apply($element);

            if (CurrentQuestion.getFillingRules().validatorType == 'alphanumeric') {
                uiAlphanumericService.apply($element);

            } else if (CurrentQuestion.getFillingRules().validatorType == 'specials') {
                uiSpecialsService.apply($element);
            }
        }
    }

})();
