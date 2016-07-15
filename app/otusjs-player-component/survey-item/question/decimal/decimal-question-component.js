(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusDecimalQuestion', {
            templateUrl: 'app/otusjs-player-component/survey-item/question/decimal/decimal-question-template.html',
            controller: DecimalQuestionController,
            bindings: {
                itemData: '=',
                onUpdate: '&'
            }
        });


    function DecimalQuestionController() {
        var self = this;

        self.update = function() {
            self.onUpdate({
                valueType: 'answer',
                value: self.answer
            });
        };
    }

})();
