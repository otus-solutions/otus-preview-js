(function() {
    'use strict';

    angular
        .module('otus.preview.component')
        .component('textQuestion', {
            templateUrl: 'app/components/survey-item/question/text/text-question-template.html',
            controller: TextQuestionController,
            bindings: {
                itemData: '<'
            }
        });

    function TextQuestionController() {
        var self = this;

        self.$onInit = function() {};
    }

})();
