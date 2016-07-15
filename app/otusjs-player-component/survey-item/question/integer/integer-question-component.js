(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusIntegerQuestion', {
            templateUrl: 'app/otusjs-player-component/survey-item/question/integer/integer-question-template.html',
            controller: IntegerQuestionController,
            bindings: {
                itemData: '=',
                onUpdate: '&'
            }
        });

    function IntegerQuestionController() {
        var self = this;

        self.update = function() {
            self.onUpdate({
                valueType: 'answer',
                value: self.answer
            });
        };
    }

})();
