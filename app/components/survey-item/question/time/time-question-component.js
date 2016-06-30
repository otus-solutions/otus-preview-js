(function() {
    'use strict';

    angular
        .module('otus.preview.component')
        .component('timeQuestion', {
            templateUrl: 'app/components/survey-item/question/time/time-question-template.html',
            controller: TimeQuestionController,
            bindings: {
                itemData: '<'
            }
        });

    function TimeQuestionController() {
        var self = this;

        self.$onInit = function() {
        };
    }

})();
