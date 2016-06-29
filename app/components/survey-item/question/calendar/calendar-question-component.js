(function() {
    'use strict';

    angular
        .module('otus.preview.component')
        .component('calendarQuestion', {
            templateUrl: 'app/components/survey-item/question/calendar/calendar-question-template.html',
            controller: CalendarQuestionController,
            require: {
                surveyItemCtrl: '^^surveyItem'
            }
        });


    function CalendarQuestionController() {
        var self = this;

        self.$onInit = function() {
            // console.log(self.surveyItemCtrl.itemData);
        };


    }

})();
