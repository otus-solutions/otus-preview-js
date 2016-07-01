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

    EmailQuestionController.$inject = ['$element'];

    function EmailQuestionController($element) {
        var self = this;

        self.ariaLabel = ariaLabel;

        self.$onInit = function() {
            // var input = $element.find('input');
            //
            // input.on('keyup', function(event) {
            //     itemData.input.val();
            // });
        };

        function ariaLabel() {
            return self.itemData.label.ptBR.plainText;
        }
    }

})();
