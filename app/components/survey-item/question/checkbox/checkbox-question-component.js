(function() {
    'use strict';

    angular
        .module('otus.preview.component')
        .component('checkboxQuestion', {
            templateUrl: 'app/components/survey-item/question/checkbox/checkbox-question-template.html',
            controller: CheckboxQuestionController,
            bindings: {
                itemData: '<'
            }
        });


    function CheckboxQuestionController() {
        var self = this;

        self.$onInit = function() {};
    }

})();
