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

        _init();

        self.update = function() {
            self.onUpdate({
                valueType: 'answer',
                value: self.answer
            });
        };

        function _init() {
            // if (CurrentQuestion.getFillingRules().validatorType == 'alphanumeric') {
            console.log($element.find('input'));
            uiSpecialsService.apply($element);

            //    } else if (CurrentQuestion.getFillingRules().validatorType == 'specials') {
            // uiSpecialsService.apply($element);
            //    }
        }
    }

})();
