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
        // Public Interface
        self.isCalendarQuestion = isCalendarQuestion;
        self.isIntegerQuestion = isIntegerQuestion;
        self.isDecimalQuestion = isDecimalQuestion;
        self.isSingleSelectionQuestion = isSingleSelectionQuestion;
        self.isCheckboxQuestion = isCheckboxQuestion;
        self.isTextQuestion = isTextQuestion;
        self.isEmailQuestion = isEmailQuestion;
        self.isTimeQuestion = isTimeQuestion;
        self.isPhoneQuestion = isPhoneQuestion;

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

        function isTextQuestion() {
            return self.itemData.objectType === 'TextQuestion' ? true : false;
        }

        function isEmailQuestion() {
            return self.itemData.objectType === 'EmailQuestion' ? true : false;
        }

        function isTimeQuestion() {
            return self.itemData.objectType === 'TimeQuestion' ? true : false;
        }

        function isPhoneQuestion() {
            return self.itemData.objectType === 'PhoneQuestion' ? true : false;
        }
    }

})();
