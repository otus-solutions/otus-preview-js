(function() {
    'use strict';

    angular
        .module('otus.preview.component')
        .component('otusSurveyItem', {
            templateUrl: 'app/components/preview/survey-item/survey-item-template.html',
            controller: OtusSurveyItemController,
            bindings: {
                itemData: '<'
            }
        });

    // OtusSurveyItemController.$inject = ['AnswerFactory'];

    function OtusSurveyItemController() {
        var self = this;

        var filling = {};

        /* Public methods */
        self.isQuestion = isQuestion;
        self.isItem = isItem;
        self.restoreAll = restoreAll;
        self.confirmAnswer = confirmAnswer;
        self.update = update;

        self.$onInit = function() {
            // loadAnswer
        };

        function isQuestion() {
            return (self.itemData.objectType === 'ImageItem') || (self.itemData.objectType === 'TextItem') ? false : true;
        }

        function isItem() {
            return (self.itemData.objectType === 'ImageItem') || (self.itemData.objectType === 'TextItem') ? true : false;
        }

        function restoreAll() {
            console.log(self.itemData);
        }

        function confirmAnswer() {
            console.log(filling);
            // Service.fillQuestion(ID, _answer, meta);
            // self.itemData.answer = _answer;
        }

        function update(prop, value) {
            filling[prop] = value;
        }
    }

})();
