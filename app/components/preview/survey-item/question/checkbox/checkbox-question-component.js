(function() {
    'use strict';

    angular
        .module('otus.preview.component')
        .component('checkboxQuestion', {
            templateUrl: 'app/components/preview/survey-item/question/checkbox/checkbox-question-template.html',
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
            console.log(self.answerArray);
        };

        self.update = function(optionIndex) {
            self.onUpdate({
                value: self.answerArray
            });
        };

        function _buildAnswerObject(index, value) {
            return {
                value: {
                    option: index,
                    state: value
                }
            };
        }
    }

})();
