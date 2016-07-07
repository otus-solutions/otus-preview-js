(function() {
    'use strict';

    angular
        .module('otus.preview.component')
        .component('textQuestion', {
            templateUrl: 'app/components/preview/survey-item/question/text/text-question-template.html',
            controller: TextQuestionController,
            bindings: {
                itemData: '<'
            }
        });

    function TextQuestionController() {
        var self = this;

        self.update = function(prop, value) {
            self.onUpdate({
                answer: value
            });
        };
    }

})();
