(function() {
    'use strict';

    angular
        .module("otusjs.player.component")
        .service('uiAlphanumericService', uiAlphanumericService);

    function uiAlphanumericService() {
        var self = this;

        self.apply = apply;

        function apply($element, answer) {
            var lastValidValue;
            var element = $element.find('textarea');

            element.on('keydown', shouldPrintChar);
            element.on('keyup', formatedAlphanumeric);

            function shouldPrintChar(event) {
                var keycode = event.which;
                return (isValidKey());
            }

            function formatedAlphanumeric(event) {
                console.log(element);
                var currentValue = element[0].value;
                if (currentValue.length === 0) {
                    lastValidValue = '';
                } else if (isValidKey()) {
                    // lastValidValue = element[0].val();
                } else {
                    console.log('voutrocar');
                    element.val(lastValidValue);
                }
            }

            function isValidKey() {
                var lastChar = answer[answer.length - 1];
                var reg = /^[a-zA-Z0-9 ]*$/;
                return (reg.test(lastChar) && lastChar !== 'Dead' && lastChar !== 'Unidentified') ? true : false;
            }
        }
    }
}());
