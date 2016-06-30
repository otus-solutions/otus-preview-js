(function() {
    'use strict';

    angular
        .module('otus.preview.component')
        .component('surveyItem', {
            templateUrl: 'app/components/survey-item/survey-item-template.html',
            controller: SurveyItemController,
            bindings: {
                itemData : '<'
            }
        });

    function SurveyItemController() {
        var self = this;

        self.isQuestion = isQuestion;
        self.isItem = isItem;

        function isQuestion() {
            return (self.itemData.objectType === 'ImageItem') || (self.itemData.objectType === 'TextItem') ? false : true;
        }

        function isItem() {
            return (self.itemData.objectType === 'ImageItem') || (self.itemData.objectType === 'TextItem') ? true : false;
        }

        self.$onInit = function() {};
    }

})();
