(function() {
    'use strict';

    angular
        .module('otus.preview.component')
        .component('singleSelectionQuestion', {
            templateUrl: 'app/components/preview/survey-item/question/single-selection/single-selection-question-template.html',
            controller: SingleSelectionQuestionController,
            bindings: {
                itemData: '<'
            }
        });

    function SingleSelectionQuestionController() {
        var self = this;

        self.update = function(prop, value) {
            self.onUpdate({
                answer: value
            });
        };
    }

})();
