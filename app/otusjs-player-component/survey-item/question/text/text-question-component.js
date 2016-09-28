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
        tabletKey();

        self.tabletKey = tabletKey;

        self.hasUpperCase = CurrentQuestion.getFillingRules().upperCase;
        self.hasLowerCase = CurrentQuestion.getFillingRules().lowerCase;

        var keycode = event.which;

        self.update = function() {
            var answer = self.answer;

            console.log(typeof answer);
            if (self.hasLowerCase) {
                answer = answer.toLowerCase();
            }
            if (self.hasUpperCase) {
                answer = answer.toUpperCase();
            }

            if (self.hasAlphanumeric && self.hasAlphanumeric.data.reference) {
              uiAlphanumericService.apply($element, self.answer);
            }
            if (self.hasSpecials && self.hasSpecials.data.reference) {
              uiSpecialsService.apply($element);
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

        function tabletKey(keycode) {
            console.log('entrou unicode');

            var uagent = navigator.userAgent.toLowerCase();

            if (uagent.search("android") > -1) {
                // alert('true');

                // uiSpecialsService.apply($element).formatedSpecials(event);
                // var str = $element.find('textarea');
                // str.match(re);
            } else {
                // alert('false');
            }
        }
    }

})();
