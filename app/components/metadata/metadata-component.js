(function() {
    'use strict';

    angular
        .module('otus.preview.component')
        .component('metadataGroup', {
            templateUrl: 'app/components/metadata/metadata-group-template.html',
            controller: MetadataGroupController,
            bindings: {
                itemData : '<'
            }
        });

    function MetadataGroupController() {
        var self = this;

        self.$onInit = function() {
        };
    }

})();
