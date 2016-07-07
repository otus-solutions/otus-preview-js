(function() {
    'use strict';

    angular
        .module('otus.preview.component')
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

        self.$onInit = function() {
            console.log(self.itemData);
        };

        self.update = function(optionIndex) {
            self.onUpdate({
                value: self.answer
            });
        };
    }

})();
