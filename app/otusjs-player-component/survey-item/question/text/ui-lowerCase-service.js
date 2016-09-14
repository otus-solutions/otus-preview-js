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

            element.on('keydown', shouldPrintChar);
            element.on('keyup', transformInLowerCase);

            console.log('lowercase');

            function shouldPrintChar(event) {
                console.log('entrou');
                var keycode = event.which;
                return (characterInLowerCase(keycode));
            }

            function transformInLowerCase(event) {
                var keycode = event.which;
                var currentValue = element.val();

                if (currentValue.length === 0) {
                    lastValidValue = '';
                } else if (characterInLowerCase(keycode)) {
                    lastValidValue = element.val().toLowerCase();
                    console.log('lastValidValue');
                }
            }

            function characterInLowerCase(keycode) {
                return (event.shiftKey == true || keycode == 20) ? true : false;
                // && ((keycode > 64 && keycode < 91) || (keycode == 186))
            }
        }

    }
}());
