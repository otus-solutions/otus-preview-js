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
        'uiFormatedService'
    ];

    function TextQuestionController($scope, $element, CurrentQuestion, uiFormatedService) {
        var self = this;

        _init();

        self.hasUpperCase = CurrentQuestion.getFillingRules().upperCase;
        self.hasLowerCase = CurrentQuestion.getFillingRules().lowerCase;

        var keycode = event.which;

        self.update = function() {
            var answer = self.answer;
            if (self.hasLowerCase) {
                answer = answer.toLowerCase();
            }
            if (self.hasUpperCase) {
                answer = answer.toUpperCase();
            }

            if (self.hasAlphanumeric && self.hasAlphanumeric.data.reference) {
              answer = uiFormatedService.apply($element, self.answer);
            }
            if (self.hasSpecials && self.hasSpecials.data.reference) {
              answer = uiFormatedService.apply($element, self.answer);
            }
            self.onUpdate({
                valueType: 'answer',
                value: answer
            });
        };

        function _init() {
          self.hasAlphanumeric = CurrentQuestion.getFillingRules().alphanumeric;
          self.hasSpecials = CurrentQuestion.getFillingRules().specials;
        }

    }

})();
