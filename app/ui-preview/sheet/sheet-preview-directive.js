(function() {
    'use strict';

    angular
        .module('otus.preview')
        .directive('otusSheetPreview', otusSheetPreview);

    function otusSheetPreview() {
        var ddo = {
            scope: {},
            templateUrl: 'node_modules/otus-preview-js/app/ui-preview/sheet/sheet-preview-container.html',
            retrict: 'E',
            link: function (scope) {
                scope.$on("$destroy", function () {
                    console.log("directive destroy");
                });
            }
        };
        return ddo;
    }
}());
