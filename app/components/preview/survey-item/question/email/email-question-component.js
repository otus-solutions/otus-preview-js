(function() {
    'use strict';

    angular
        .module('otus.preview.component')
        .component('otusEmailQuestion', {
            templateUrl: 'app/components/preview/survey-item/question/email/email-question-template.html',
            controller: EmailQuestionController,
            bindings: {
                itemData: '<',
                onUpdate: '&'
            }
        });

    EmailQuestionController.$inject = ['$element'];

    function EmailQuestionController($element) {
        var self = this;

        self.update = function() {
            self.onUpdate({
                valueType: 'answer',
                value: self.answer
            });
        };

        self.ariaLabel = function() {
            return self.itemData.label.ptBR.plainText;
        };
    }

})();
