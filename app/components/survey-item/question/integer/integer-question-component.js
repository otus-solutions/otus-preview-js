(function() {
    'use strict';

    angular
        .module('otus.preview.component')
        .component('integerQuestion', {
            templateUrl: 'app/components/survey-item/question/integer/integer-question-template.html',
            controller: IntegerQuestionController,
            bindings: {
                itemData: '<'
            }
        });


    function IntegerQuestionController() {
        var self = this;

        self.$onInit = function() {
        };
    }

})();
