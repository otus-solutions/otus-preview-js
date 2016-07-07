(function() {
    'use strict';

    angular
        .module('otus.preview.component')
        .component('imageItem', {
            templateUrl: 'app/components/preview/survey-item/misc/image/image-item-template.html',
            controller: ImageItemController,
            bindings: {
                itemData : '<'
            }
        });

    function ImageItemController() {
        var self = this;

        self.$onInit = function() {};
    }

})();
