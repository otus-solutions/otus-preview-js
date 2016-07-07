(function() {
    'use strict';

    angular
        .module('otus.preview.component')
        .component('calendarQuestion', {
            templateUrl: 'app/components/preview/survey-item/question/calendar/calendar-question-template.html',
            controller: CalendarQuestionController,
            bindings: {
                itemData: '<',
                date: '<',
                onUpdate: '&'
            }
        });

    CalendarQuestionController.$inject = ['$element'];

    function CalendarQuestionController($element) {
        var self = this;

        self.update = function() {
            self.onUpdate({
                value: self.date
            });
        };
    }

})();
