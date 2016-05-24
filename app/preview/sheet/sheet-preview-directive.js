(function() {
    'use strict';

    angular
        .module('otus.preview')
        .directive('otusSheetPreview', otusSheetPreview);

    function otusSheetPreview() {
        var ddo = {
            scope: {},
            templateUrl: 'node_modules/otus-preview-js/app/preview/sheet/sheet-preview-container.html',
            retrict: 'E'
        };
        return ddo;
    }
}());