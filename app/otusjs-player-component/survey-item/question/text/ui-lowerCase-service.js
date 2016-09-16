(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .service('uiLowerCaseService', uiLowerCaseService);

    function uiLowerCaseService() {
        var self = this;

        self.apply = apply;

        function apply($element) {
            var lastValidValue;
            var element = $element.find('textarea');

            element.on('blur', shouldPrintChar);
            element.on('keyup', transformInLowerCase);

            console.log(element);

            function shouldPrintChar(event) {
                console.log('entrou');
                var keycode = event.which;
                // console.log(element[0].value.toLowerCase());
                // element.value = element[0].value.toLowerCase();
                //answer
                return (characterInLowerCase(keycode));
            }

            function transformInLowerCase(event) {
                var keycode = event.which;
                var currentValue = element.val();

                if (currentValue.length === 0) {
                    lastValidValue = '';
                } else if (characterInLowerCase(keycode)) {
                    lastValidValue = element.val();
                    lastValidValue.toLowerCase();
                    return lastValidValue;
                }
            }

            function characterInLowerCase(keycode) {
                return ((keycode > 64 && keycode < 91) || (keycode == 186)) ? true : false;
            }
        }
    }
}());
