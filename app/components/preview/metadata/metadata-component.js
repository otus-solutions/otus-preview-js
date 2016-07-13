(function() {
    'use strict';

    angular
        .module('otus.component.preview')
        .component('metadataGroup', {
            templateUrl: 'app/components/preview/metadata/metadata-group-template.html',
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
