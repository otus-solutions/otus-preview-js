(function() {
    'use strict';

    angular
        .module('otus.preview')
        .directive('otusItemPreview', otusItemPreview);

    function otusItemPreview() {
        var ddo = {
            scope: {},
            templateUrl: 'node_modules/otus-preview-js/app/preview/container-item/preview-container-item.html',
            retrict: 'E'
        };
        return ddo;
    }
}());
