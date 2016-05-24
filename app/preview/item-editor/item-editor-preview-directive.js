(function() {
    'use strict';

    angular
        .module('otus.preview')
        .directive('otusItemEditorPreview', otusItemEditorPreview);

    function otusItemEditorPreview() {
        var ddo = {
            scope: {},
            templateUrl: 'node_modules/otus-preview-js/app/preview/item-editor/item-editor-preview.html',
            retrict: 'E'
        };
        return ddo;
    }
}());
