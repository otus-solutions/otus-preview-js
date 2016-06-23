(function() {
    'use strict';

    angular
        .module('otus.preview')
        .component('calendarQuestion', {
            templateUrl: 'otus-preview-js/app/components/survey-item/question/calendar/calendar-question-template.html',
            controller: CalendarQuestionController,
        });

    CalendarQuestionController.$inject = [];

    function CalendarQuestionController() {
        var self = this;

        self.$onInit = function() {

        };
    }

})();
