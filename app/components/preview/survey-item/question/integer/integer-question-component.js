(function() {
    'use strict';

    angular
        .module('otus.preview.component')
        .component('otusIntegerQuestion', {
            templateUrl: 'app/components/preview/survey-item/question/integer/integer-question-template.html',
            controller: IntegerQuestionController,
            bindings: {
                itemData: '<',
                onUpdate: '&'
            }
        });

    function IntegerQuestionController() {
        var self = this;

        self.update = function() {
            self.onUpdate({
                valueType: 'answer',
                value: self.answer
            });
        };
    }

})();
