(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusCheckboxQuestion', {
            templateUrl: 'app/otusjs-player-component/survey-item/question/checkbox/checkbox-question-template.html',
            controller: CheckboxQuestionController,
            bindings: {
                itemData: '<',
                onUpdate: '&'
            }
        });

    function CheckboxQuestionController() {
        var self = this;

        self.$onInit = function() {
            self.answerArray = [];
            self.itemData.options.forEach(function(option) {
                self.answerArray.push(_buildAnswerObject(option.value, false));
            });
        };

        self.update = function() {
            self.onUpdate({
                value: self.answerArray
            });
        };

        function _buildAnswerObject(index, value) {
            return {
                valueType: 'answer',
                value: {
                    option: index,
                    state: value
                }
            };
        }
    }

})();