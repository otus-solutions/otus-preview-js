(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusImageItem', {
            templateUrl: 'app/otusjs-player-component/survey-item/misc/image/image-item-template.html',
            controller: ImageItemController,
            bindings: {
                itemData : '='
            }
        });

    function ImageItemController() {
        var self = this;

        self.$onInit = function() {};
    }

})();
