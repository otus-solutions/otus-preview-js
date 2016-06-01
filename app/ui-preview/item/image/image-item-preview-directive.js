(function() {
    'use strict';

    angular
        .module('otus.preview')
        .directive('imageItemPreview', imageItemPreview);

    function imageItemPreview() {
        var ddo = {
            scope: {},
            templateUrl: 'node_modules/otus-preview-js/app/ui-preview/item/image/image-item-preview.html',
            retrict: 'E'
        };
        return ddo;
    }
}());
