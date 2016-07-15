(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusMiscItem', {
            templateUrl: 'app/otusjs-player-component/survey-item/misc/misc-item-template.html',
            controller: OtusMiscItemController,
            bindings: {
                itemData : '='
            }
        });

    function OtusMiscItemController() {
        var self = this;

        self.isImageItem = isImageItem;
        self.isTextItem = isTextItem;

        function isImageItem() {
            return self.itemData.objectType === 'ImageItem' ? true : false;
        }

        function isTextItem() {
            return self.itemData.objectType === 'TextItem' ? true : false;
        }

        self.$onInit = function() {};
    }

})();
