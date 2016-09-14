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
        'uiAlphanumericService',
        'uiLowerCaseService'
    ];

    function TextQuestionController($scope, $element, CurrentQuestion, uiSpecialsService, uiAlphanumericService, uiLowerCaseService) {
        var self = this;

        _init();

        self.update = function() {
            self.onUpdate({
                valueType: 'answer',
                value: self.answer
            });
        };

        function _init() {
            var hasAlphanumeric = CurrentQuestion.getFillingRules()['alphanumeric'];
            var hasSpecials = CurrentQuestion.getFillingRules()['specials'];
            var hasLowerCase = CurrentQuestion.getFillingRules()['lowerCase'];
            if (hasAlphanumeric && hasAlphanumeric.data.reference) {
                uiAlphanumericService.apply($element);
            }
            if (hasSpecials && hasSpecials.data.reference) {
                uiSpecialsService.apply($element);
            }
            if(hasLowerCase && hasLowerCase.data.reference) {
                uiLowerCaseService.apply($element);
            }
        }
    }

})();
