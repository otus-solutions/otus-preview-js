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
                var key = event.key;
                console.log(key);
                return (isValidKey(key));
            }

            function formatedAlphanumeric(event) {
                var key = event.key;
                var currentValue = element[0].value;

                if (currentValue.length === 0) {
                    lastValidValue = '';
                } else if (isValidKey(key)) {
                    lastValidValue = element[0].value;
                } else if (!isValidKey(key)) {
                    // console.log('voutrocar');
                    element.val(lastValidValue);
                }
            }

            function isValidKey(key) {
                var key = event.key;
                var reg = /^[a-zA-Z0-9 ]*$/;
                return (reg.test(key) && key !== 'Dead' && key !== 'Unidentified') ? true : false;
            }
        }
    }
}());
