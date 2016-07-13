(function() {
    'use strict';

    angular
        .module('otus.component.preview')
        .component('otusSingleSelectionQuestion', {
            templateUrl: 'app/components/preview/survey-item/question/single-selection/single-selection-question-template.html',
            controller: SingleSelectionQuestionController,
            bindings: {
                itemData: '<',
                onUpdate: '&'
            }
        });

    function SingleSelectionQuestionController() {
        var self = this;

        self.update = function() {
            self.onUpdate({
                valueType: 'answer',
                value: self.answer
            });
        };
    }

})();
