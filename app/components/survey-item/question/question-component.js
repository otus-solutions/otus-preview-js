(function() {
    'use strict';

    angular
        .module('otus.preview.component')
        .component('otusQuestion', {
            templateUrl: 'app/components/survey-item/question/question-template.html',
            controller: OtusQuestionController,
            bindings: {
                itemData: '<'
            }
        });

    OtusQuestionController.$inject = [];

    function OtusQuestionController($element) {
        var self = this;
        self.isCalendarQuestion = isCalendarQuestion;
        self.isIntegerQuestion = isIntegerQuestion;
        self.isDecimalQuestion = isDecimalQuestion;
        self.isSingleSelectionQuestion = isSingleSelectionQuestion;
        self.isCheckboxQuestion = isCheckboxQuestion;

        self.$onInit = function() {};

        function isCalendarQuestion() {
            return self.itemData.objectType === 'CalendarQuestion' ? true : false;
        }

        function isIntegerQuestion() {
            return self.itemData.objectType === 'IntegerQuestion' ? true : false;
        }

        function isDecimalQuestion() {
            return self.itemData.objectType === 'DecimalQuestion' ? true : false;
        }

        function isSingleSelectionQuestion() {
            return self.itemData.objectType === 'SingleSelectionQuestion' ? true : false;
        }

        function isCheckboxQuestion() {
            return self.itemData.objectType === 'CheckboxQuestion' ? true : false;
        }
    }

})();
