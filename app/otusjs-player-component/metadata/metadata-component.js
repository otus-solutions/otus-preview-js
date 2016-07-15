(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('metadataGroup', {
            templateUrl: 'app/otusjs-player-component/metadata/metadata-group-template.html',
            controller: MetadataGroupController,
            bindings: {
                itemData : '<',
                onUpdate: '&'
            }
        });

    function MetadataGroupController() {
        var self = this;

        self.update = function() {
            self.onUpdate({
                valueType: 'metadata',
                value: self.metadata
            });
        };
    }

})();
