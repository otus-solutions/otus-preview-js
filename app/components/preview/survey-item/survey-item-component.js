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

    function OtusSurveyItemController() {
        var self = this;

        var _answer;

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
            // Service.fillQuestion(ID, _answer, meta);
            self.itemData.answer = _answer;
            console.log(self.itemData);
        }

        function update(prop, value) {
            _answer = value;
        }
    }

})();
