(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusSingleSelectionQuestion', {
            templateUrl: 'app/otusjs-player-component/survey-item/question/single-selection/single-selection-question-template.html',
            controller: SingleSelectionQuestionController,
            bindings: {
                itemData: '=',
                onUpdate: '&'
            }
        });

    function SingleSelectionQuestionController() {
        var self = this;

        self.update = function() {
            self.onUpdate({
                valueType: 'answer',
                value: self.answer
            });
        };
    }

})();
