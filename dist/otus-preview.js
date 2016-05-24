(function() {
    'use strict';

    angular.module('otus.preview', []);

}());

(function() {
    'use strict';

    angular
        .module('otus.preview')
        .directive('otusItemPreview', otusItemPreview);

    function otusItemPreview() {
        var ddo = {
            scope: {},
            templateUrl: 'node_modules/otus-preview-js/app/preview/item/item-preview-container.html',
            retrict: 'E'
        };
        return ddo;
    }
}());

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
