(function() {
    'use strict';

    angular
        .module('otus.preview.component')
        .component('decimalQuestion', {
            templateUrl: 'app/components/survey-item/question/decimal/decimal-question-template.html',
            controller: DecimalQuestionController,
            bindings: {
                itemData: '<'
            }
        });


    function DecimalQuestionController() {
        var self = this;

        self.$onInit = function() {
        };
    }

})();
