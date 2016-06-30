(function() {
    'use strict';

    angular
        .module('otus.preview.component')
        .component('emailQuestion', {
            templateUrl: 'app/components/survey-item/question/email/email-question-template.html',
            controller: EmailQuestionController,
            bindings: {
                itemData: '<'
            }
        });


    function EmailQuestionController() {
        var self = this;

        self.$onInit = function() {
        };
    }

})();
