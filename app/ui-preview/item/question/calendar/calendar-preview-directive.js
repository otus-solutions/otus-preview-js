(function() {
    'use strict';

    angular
        .module('otus.preview')
        .directive('otusPreviewCalendarQuestion', directive);

    directive.inject = ['UiItemPreviewService'];

    function directive(UiItemPreviewService) {
        var ddo = {
            scope: {},
            link: function(scope) {
                scope.widget = UiItemPreviewService.currentQuestionToLoad;
                scope.widgetMetadata = UiItemPreviewService.listMetadata;
            },
            templateUrl: 'node_modules/otus-preview-js/app/ui-preview/item/question/calendar/calendar-question-preview.html',
            retrict: 'E'
        };

        return ddo;
    }

}());
