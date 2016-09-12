(function() {
    'use strict';

    angular
        .module("otusjs.player.component")
        .service('uiAlphanumericService', uiAlphanumericService);

    function uiAlphanumericService() {
        var self = this;

        self.apply = apply;

        function apply($element) {
            var lastValidValue;

            $element.on('keydown', shouldPrintChar);

            function shouldPrintChar(event) {
                var element = angular.element(event.currentTarget);
                var keycode = event.which;
                return (isAlphanumericKey(keycode) || isValidKey(keycode));
            } //está saindo aqui e não executa o resto

            $element.on('keyup', formatedAlphanumeric);

            function formatedAlphanumeric(event) {

                var element = angular.element(event.currentTarget);
                var keycode = event.which;

                if (element.length === 0) {
                    lastValidValue = '';
                } else if (isAlphanumericKey(keycode) || isValidKey(keycode)) {
                    lastValidValue = $element.val();
                } else if (!isValidKey(keycode)) {
                    $element.val(lastValidValue);
                }
            }

            function isAlphanumericKey(keycode) {
                console.log('is alphanumeric key');
                return ((keycode > 47 && keycode < 58) || (keycode > 64 && keycode < 91) || (keycode > 96 && keycode < 105)) ? true : false;
            }

            function isValidKey(keycode) {
                console.log('is alpha valid key');
                var shiftKey = (keycode === 16);
                var capslock = (keycode === 20);
                var backspaceKey = (keycode === 8);
                var spacebar = (keycode === 32);
                var capslock = (keycode === 20);
                var homeKey = (keycode === 36);
                var endKey = (keycode === 35);
                var deleteKey = (keycode === 46);
                var leftKey = (keycode === 37);
                var rightKey = (keycode === 39);
                var enterkey = (keycode === 13);

                return (shiftKey || capslock || backspaceKey || spacebar || capslock || homeKey || endKey || deleteKey || leftKey || rightKey || enterkey) ? true : false;
            }
        }
    }
}());
