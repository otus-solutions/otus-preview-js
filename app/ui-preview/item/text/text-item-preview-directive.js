(function() {
    'use strict';

    angular
        .module('otus.preview')
        .directive('textItemPreview', textItemPreview);

    function textItemPreview() {
        var ddo = {
            scope: {},
            templateUrl: 'node_modules/otus-preview-js/app/ui-preview/item/text/text-item-preview.html',
            retrict: 'E'
        };
        return ddo;
    }
}());
