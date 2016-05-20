(function() {
    'use strict';

    angular
        .module('otus.preview')
        .directive('otusSheetPreview', otusSheetPreview);

    function otusSheetPreview() {
        var ddo = {
            scope: {},
            templateUrl: 'node_modules/otus-preview-js/app/preview/container-sheet/preview-container-sheet.html',
            retrict: 'E'
        };
        return ddo;
    }
}());
