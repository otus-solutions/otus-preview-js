(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusEmailQuestion', {
            templateUrl: 'app/otusjs-player-component/survey-item/question/email/email-question-template.html',
            controller: EmailQuestionController,
            bindings: {
                itemData: '=',
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
