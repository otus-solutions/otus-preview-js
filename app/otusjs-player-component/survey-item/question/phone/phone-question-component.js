(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusPhoneQuestion', {
            templateUrl: 'app/otusjs-player-component/survey-item/question/phone/phone-question-template.html',
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
