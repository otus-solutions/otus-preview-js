(function() {
    'use strict';

    angular
        .module('otus.preview.component')
        .component('otusCalendarQuestion', {
            templateUrl: 'app/components/preview/survey-item/question/calendar/calendar-question-template.html',
            controller: OtusCalendarQuestionController,
            bindings: {
                itemData: '<',
                onUpdate: '&'
            }
        });

    function OtusCalendarQuestionController() {
        var self = this;

        self.update = function() {
            self.onUpdate({
                valueType: 'answer',
                value: self.answer
            });
        };
    }

})();
