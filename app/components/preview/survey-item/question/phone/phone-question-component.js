(function() {
    'use strict';

    angular
        .module('otus.preview.component')
        .component('otusPhoneQuestion', {
            templateUrl: 'app/components/preview/survey-item/question/phone/phone-question-template.html',
            controller: PhoneQuestionController,
            bindings: {
                itemData: '<',
                onUpdate: '&'
            }
        });

    function PhoneQuestionController() {
        var self = this;

        self.update = function() {
            self.onUpdate({
                valueType: 'answer',
                value: self.answer
            });
        };
    }

})();
