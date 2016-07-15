(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusTextItem', {
            templateUrl: 'app/otusjs-player-component/survey-item/misc/text/text-item-template.html',
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
