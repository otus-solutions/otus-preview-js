(function() {
    'use strict';

    angular
        .module("otusjs.player.component")
        .service('uiFormatedService', uiFormatedService);

    function uiFormatedService() {

        var self = this;

        self.apply = apply;

        function apply($element, answer) {
            var lastValidValue;

            var element = $element.find('textarea');
            var key = answer[answer.length - 1];
            if (isValidKey(key)) {
                return answer;
            } else {
                var formatedAnswer = answer.slice(0, -1);
                $element.find('textarea')[0].value = formatedAnswer;
                return formatedAnswer;
            }

            function isValidKey(key) {
                var reg = /^[a-záàâãéèêíïóòôõöúùçA-ZÁÀÂÃÉÈÊÍÓÒÔÕÚÙÇ0-9 .,]*$/;
                return (reg.test(key)) ? true : false;
            }
        }
    }
}());
