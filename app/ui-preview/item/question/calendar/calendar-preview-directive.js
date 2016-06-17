(function() {
    'use strict';

    angular
        .module('otus.preview')
        .directive('otusPreviewCalendarQuestion', directive);

    directive.inject = ['UiItemPreviewViewService'];

    function directive(UiItemPreviewViewService) {
        var ddo = {
            link: function(scope) {
                scope.widget = UiItemPreviewViewService.currentQuestionToLoad;
                scope.widgetMetadata = UiItemPreviewViewService.listMetadata;
            },
            templateUrl: 'node_modules/otus-preview-js/app/ui-preview/item/question/calendar/calendar-question-preview.html',
            retrict: 'E'
        };

        return ddo;
    }

}());
