(function() {
    'use strict';

    angular
        .module('otus.preview')
        .directive('questionPreview', calendarQuestionPreview);

    function calendarQuestionPreview() {
        var ddo = {
            scope: {},
            templateUrl: 'node_modules/otus-preview-js/app/preview/item/question/calendar/calendar-question-preview.html',
            retrict: 'E'
        };
        return ddo;
    }
}());
