(function() {
    'use strict';

    angular
        .module('otus.preview')
        .directive('otusPreviewCalendarQuestion', directive);

    function directive() {
        var ddo = {
            scope: {},
            templateUrl: 'node_modules/otus-preview-js/app/ui-preview/item/question/calendar/calendar-question-preview.html',
            retrict: 'E'
        };

        return ddo;
    }

}());
