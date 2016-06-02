(function() {
    'use strict';

    angular
        .module('otus.preview')
        .directive('otusSheetPreview', otusSheetPreview);

    otusSheetPreview.$inject = [
        'CoreSheetContentPreviewService'
    ];

    function otusSheetPreview(CoreSheetContentPreviewService) {
        var ddo = {
            scope: {},
            templateUrl: 'node_modules/otus-preview-js/app/ui-preview/sheet/sheet-preview-container.html',
            retrict: 'E',
            link: function linkFunc() {
                CoreSheetContentPreviewService.startSheet();
            }
        };
        return ddo;
    }
}());
