(function() {
    'use strict';

    angular
        .module('otus.component.preview')
        .component('otusTimeQuestion', {
            templateUrl: 'app/components/preview/survey-item/question/time/time-question-template.html',
            controller: TimeQuestionController,
            bindings: {
                itemData: '<',
                onUpdate: '&'
            }
        });

    function TimeQuestionController() {
        var self = this;

        self.update = function() {
            self.onUpdate({
                valueType: 'answer',
                value: self.answer
            });
        };
    }

})();
