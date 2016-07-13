(function() {
    'use strict';

    angular
        .module('otus.component.preview')
        .component('otusDecimalQuestion', {
            templateUrl: 'app/components/preview/survey-item/question/decimal/decimal-question-template.html',
            controller: DecimalQuestionController,
            bindings: {
                itemData: '<',
                onUpdate: '&'
            }
        });


    function DecimalQuestionController() {
        var self = this;

        self.update = function() {
            self.onUpdate({
                valueType: 'answer',
                value: self.answer
            });
        };
    }

})();
