(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusLabel', {
            controller: LabelController,
            bindings: {
                itemLabel: '='
            }
        });

    LabelController.$inject = ['$element'];

    function LabelController($element) {
        var self = this;

        self.$onInit = function() {
            _fillLabel();
        };

        function _fillLabel() {
            $element[0].innerHTML = _getLabel();
        }

        function _getLabel() {
            if (self.itemLabel instanceof Object) {
                return self.itemLabel.ptBR.formattedText;
            } else {
                return self.itemLabel;
            }
        }
    }

})();
