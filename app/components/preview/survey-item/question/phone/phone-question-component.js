(function() {
    'use strict';

    angular
        .module('otus.preview.component')
        .component('phoneQuestion', {
            templateUrl: 'app/components/preview/survey-item/question/phone/phone-question-template.html',
            controller: PhoneQuestionController,
            bindings: {
                itemData: '<'
            }
        });

    function PhoneQuestionController() {
        var self = this;

        self.update = function(prop, value) {
            self.onUpdate({
                answer: value
            });
        };
    }

})();
