(function() {
    'use strict';

    angular
        .module('otus.preview.component')
        .component('decimalQuestion', {
            templateUrl: 'app/components/preview/survey-item/question/decimal/decimal-question-template.html',
            controller: DecimalQuestionController,
            bindings: {
                itemData: '<'
            }
        });


    function DecimalQuestionController() {
        var self = this;

        self.update = function(prop, value) {
            self.onUpdate({
                answer: value
            });
        };
    }

})();
