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
            var element = $element.find('textarea');

            element.on('keydown', shouldPrintChar);
            element.on('keyup', formatedAlphanumeric);

            function shouldPrintChar(event) {
                var keycode = event.which;
                return (isAlphanumericKey(keycode) || isValidKey(keycode));
            }

            function formatedAlphanumeric(event) {
                var keycode = event.which;
                var currentValue = element.val();

                var reg = /^[a-zA-Z0-9 ]*$/;
                console.log(event.key);
                console.log(reg.test(event.key));
                console.log(event.key!=='Dead');
                if (reg.test(event.key) || event.key!=='Dead') {

                }
                if (currentValue.length === 0) {
                    lastValidValue = '';
                } else if (isAlphanumericKey(keycode) || isValidKey(keycode)) {
                    lastValidValue = element.val();
                } else if (!isValidKey(keycode)) {
                    element.val(lastValidValue);
                }
            }

            function isAlphanumericKey(keycode) {
                return ((keycode > 47 && keycode < 58) || (keycode > 64 && keycode < 91) || (keycode > 96 && keycode < 105)) ? true : false;
            }

            function isValidKey(keycode) {
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
