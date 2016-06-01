(function() {
    'use strict';
    angular
        .module('otus.preview')
        .directive('otusItemContainerPreview', otusItemContainerPreview);

    function otusItemContainerPreview() {
        var ddo = {
            scope: {},
            templateUrl: 'node_modules/otus-preview-js/app/ui-preview/item-container/item-container-preview.html',
            retrict: 'E'
        };
        return ddo;
    }
}());
