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
        'otusjs.player.core.CurrentQuestion'
    ];

    function TextQuestionController($scope, $element, CurrentQuestion) {
        var self = this;

        self.update = function() {
            self.onUpdate({
                valueType: 'answer',
                value: self.answer
            });
        };

        self.verifyValidator = function() {
            // Responsável por identificar qual é o validador corrente

            console.log('É um validador ');
            var uiAlphanumeric = false;
            var uiSpecial = false;

            console.log(CurrentQuestion.getFillingRules());
            if (CurrentQuestion.getFillingRules().validatorType == 'alphanumeric') {
                console.log('alphanumeric');
                //aplicar uiAlphanumeric
                uiAlphanumeric = true;
            } else if (CurrentQuestion.getFillingRules().validatorType == 'specials') {
                console.log('specials');
                //aplicar uiSpecials
                uiSpecial = true;
            }
        }
    }

})();
