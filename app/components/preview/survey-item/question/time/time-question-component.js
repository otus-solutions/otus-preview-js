(function() {
    'use strict';

    angular
        .module('otus.preview.component')
        .component('timeQuestion', {
            templateUrl: 'app/components/preview/survey-item/question/time/time-question-template.html',
            controller: TimeQuestionController,
            bindings: {
                itemData: '<'
            }
        });

    function TimeQuestionController() {
        var self = this;

        self.update = function(prop, value) {
            self.onUpdate({
                answer: value
            });
        };
    }

})();
