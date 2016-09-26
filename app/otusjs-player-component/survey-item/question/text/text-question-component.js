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
        'otusjs.player.core.activity.CurrentItemService',
        'uiSpecialsService',
        'uiAlphanumericService'
    ];

    function TextQuestionController($scope, $element, CurrentItemService, uiSpecialsService, uiAlphanumericService) {
        var self = this;

        _init();

        self.hasUpperCase = CurrentItemService.getFillingRules().upperCase;
        self.hasLowerCase = CurrentItemService.getFillingRules().lowerCase;

        self.update = function() {
            var answer = self.answer;
            if (self.hasLowerCase) {
                answer = answer.toLowerCase();
            }
            if (self.hasUpperCase) {
                answer = answer.toUpperCase();
            }
            self.onUpdate({
                valueType: 'answer',
                value: answer
            });
        };

        function _init() {
            var hasAlphanumeric = CurrentItemService.getFillingRules().alphanumeric;
            var hasSpecials = CurrentItemService.getFillingRules().specials;

            if (hasAlphanumeric && hasAlphanumeric.data.reference) {
                uiAlphanumericService.apply($element);
            }
            if (hasSpecials && hasSpecials.data.reference) {
                uiSpecialsService.apply($element);
            }
        }

    }

})();
