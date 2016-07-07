(function() {
    'use strict';

    angular
        .module('otus.preview.component')
        .component('emailQuestion', {
            templateUrl: 'app/components/preview/survey-item/question/email/email-question-template.html',
            controller: EmailQuestionController,
            bindings: {
                itemData: '<'
            }
        });

    EmailQuestionController.$inject = ['$element'];

    function EmailQuestionController($element) {
        var self = this;

        self.update = function(prop, value) {
            self.onUpdate({
                answer: value
            });
        };

        self.ariaLabel = function() {
            return self.itemData.label.ptBR.plainText;
        };
    }

})();
