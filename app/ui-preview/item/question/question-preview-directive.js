(function functionName() {
    'use strict';

    angular
        .module('otus.preview')
        .directive('questionPreview', questionPreview);

    questionPreview.$inject = [
        'UiTemplateContentFactory'
    ];

    function questionPreview(UiTemplateContentFactory) {
        var ddo = {
            scope: {},
            retrict: 'E',
            templateUrl: 'node_modules/otus-preview-js/app/ui-preview/item/question/question-preview.html',
            link: function linkFunc(scope, element) {
                scope.widget = UiTemplateContentFactory.create(scope, element);
                console.log(scope.widget);
            }
        };

        return ddo;
    }

})();
