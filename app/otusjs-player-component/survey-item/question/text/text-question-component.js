(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusTextQuestion', {
            templateUrl: 'app/cotusjs-player-component/survey-item/question/text/text-question-template.html',
            controller: TextQuestionController,
            bindings: {
                itemData: '=',
                onUpdate: '&'
            }
        });

    function TextQuestionController() {
        var self = this;

        self.update = function() {
            self.onUpdate({
                valueType: 'answer',
                value: self.answer
            });
        };
    }

})();
