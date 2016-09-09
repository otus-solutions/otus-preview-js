(function() {
    'use strict';

    angular
        .module("otusjs.player.component")
        .service('uiSpecialsService', uiSpecialsService);

    function uiSpecialsService() {
        var self = this;
        var lastValidValue;

        self.apply = apply;

        function apply($element) {

            $element.on('keydown', shouldPrintChar);

            function shouldPrintChar(event) {
                var element = angular.element(event.currentTarget);
                var keycode = event.which;
                return (isSpecialsKey(keycode) || isValidKey(keycode));
            }

            $element.on('keyup', formatedSpecials);

            function formatedSpecials(event) {
                var element = angular.element(event.currentTarget);
                var keycode = event.which;
                // var currentValue = element.val();

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
                var homeKey = (keycode === 36);
                var endKey = (keycode === 35);
                var deleteKey = (keycode === 46);
                var leftKey = (keycode === 37);
                var rightKey = (keycode === 39);

                return (shiftKey || ctrlkey || backspaceKey || homeKey || endKey || deleteKey || leftKey || rightKey);
            }
        }
    }

}());
