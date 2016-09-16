(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .service('uiUpperCaseService', uiUpperCaseService);

    function uiUpperCaseService() {
        var self = this;

        self.apply = apply;

        function apply($element) {
            var lastValidValue;
            var element = $element.find('textarea');

            element.on('keydown', shouldPrintChar);
            element.on('keyup', transformInUpperCase);

            console.log('upperCase');

            function shouldPrintChar(event) {
                console.log('entrou');
                var keycode = event.which;
                return (characterInUpperCase(keycode));
            }

            function transformInUpperCase(event) {
                var keycode = event.which;
                var currentValue = element.val();

                if (currentValue.length === 0) {
                    lastValidValue = '';
                } else if (characterInUpperCase(keycode)) {
                    lastValidValue = element.val();
                    lastValidValue.toUpperCase();
                    console.log(lastValidValue.toUpperCase());
                    return lastValidValue;
                    // Não está transformando em upperCase na tela
                }
            }

            function characterInUpperCase(keycode) {
                return ((keycode > 64 && keycode < 91) || (keycode == 186)) ? true : false;
            }
        }
    }
}());
