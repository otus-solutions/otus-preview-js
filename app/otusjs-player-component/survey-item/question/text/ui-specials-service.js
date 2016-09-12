(function() {
    'use strict';

    angular
        .module("otusjs.player.component")
        .service('uiSpecialsService', uiSpecialsService);

    function uiSpecialsService() {
        var self = this;

        self.apply = apply;

        function apply($element) {
            var lastValidValue;
            var element = $element.find('textarea');

            $element.on('keydown', shouldPrintChar);

            function shouldPrintChar(event) {
                console.log(event);
                var keycode = event.which;
                return (isSpecialsKey(keycode) || isValidKey(keycode));
            }

            //mudar a ordem de chamada, está chamando somente a primeira função.
            $element.on('keyup', formatedSpecials);

            function formatedSpecials(event) {

                var keycode = event.which;

                if (element.length === 0) {
                    lastValidValue = '';
                } else if (isSpecialsKey(keycode) || isValidKey(keycode)) {
                    lastValidValue = $element.val();
                } else if (!isValidKey(keycode)) {
                    $element.val(lastValidValue);
                }
            }

            function isSpecialsKey(keycode) {
                return ((keycode > 47 && keycode < 58) || (keycode > 186 && keycode < 195) || (keycode > 218 && keycode < 223) || (keycode > 105 && keycode < 112) || (keycode == 226)) ? true : false;
            }

            function isValidKey(keycode) {
                var shiftKey = (keycode === 16);
                var ctrlkey = (keycode === 17);
                var backspaceKey = (keycode === 8);
                var spacebar = (keycode === 32);
                var capslock = (keycode === 20);
                var homeKey = (keycode === 36);
                var endKey = (keycode === 35);
                var deleteKey = (keycode === 46);
                var leftKey = (keycode === 37);
                var rightKey = (keycode === 39);
                var enterkey = (keycode === 13);

                return (shiftKey || ctrlkey || backspaceKey || spacebar || capslock || homeKey || endKey || deleteKey || leftKey || rightKey || enterkey) ? true : false;
            }
        }
    }

}());
