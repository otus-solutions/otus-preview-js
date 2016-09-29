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
            var element = $element.find('textarea')[0];

            shouldPrintChar();
            formatedAlphanumeric();

            function shouldPrintChar() {
                var key = element.value;
                return (isValidKey(key));
            }

            function formatedAlphanumeric() {
                var key = element.value;
                var currentValue = element.value;

                if (currentValue.length === 0) {
                    lastValidValue = '';
                } else if (isValidKey(key)) {
                    lastValidValue = element.value;
                    console.log(lastValidValue);
                } else if (!isValidKey(key)) {
                    $element.find('textarea').val(lastValidValue);
                    console.log($element.find('textarea').val(lastValidValue));
                }
            }

            function isValidKey(key) {
                var key = element.value;
                var reg = /^[a-zçA-ZÇ0-9 .,]*$/;
                return (reg.test(key) && key !== 'Dead' && key !== 'Unidentified') ? true : false;
            }
        }
    }
}());
