(function() {
    'use strict';

    angular
        .module('otus.component.editor')
        .directive('otusMetadataGroup', otusMetadataGroup);

    otusMetadataGroup.$inject = [
        'MetadataGroupWidgetFactory'
    ];

    function otusMetadataGroup(MetadataGroupWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/metadata/group/metadata-group.html',
            link: function(scope, element) {
                scope.widget = MetadataGroupWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }

}());
