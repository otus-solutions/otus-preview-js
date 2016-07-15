(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusCalendarQuestion', {
            templateUrl: 'app/otusjs-player-component/survey-item/question/calendar/calendar-question-template.html',
            controller: OtusCalendarQuestionController,
            bindings: {
                itemData: '=',
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
