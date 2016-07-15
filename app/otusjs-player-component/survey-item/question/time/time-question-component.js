(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusTimeQuestion', {
            templateUrl: 'app/otusjs-player-component/survey-item/question/time/time-question-template.html',
            controller: TimeQuestionController,
            bindings: {
                itemData: '=',
                onUpdate: '&'
            }
        });

    function TimeQuestionController() {
        var self = this;

        self.update = function() {
            self.onUpdate({
                valueType: 'answer',
                value: self.answer
            });
        };
    }

})();
