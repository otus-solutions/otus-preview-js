(function() {
    'use strict';

    angular
        .module('otus.preview.component')
        .component('phoneQuestion', {
            templateUrl: 'app/components/survey-item/question/phone/phone-question-template.html',
            controller: PhoneQuestionController,
            bindings: {
                itemData: '<'
            }
        });

    function PhoneQuestionController() {
        var self = this;

        self.$onInit = function() {};
    }

})();
