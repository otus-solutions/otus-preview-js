(function() {
    'use strict';

    angular
        .module('otus.preview.component')
        .component('textItem', {
            templateUrl: 'app/components/survey-item/misc/text/text-item-template.html',
            controller: TextItemController,
            bindings: {
                itemData : '<'
            }
        });

    function TextItemController() {
        var self = this;

        self.$onInit = function() {};
    }

})();
