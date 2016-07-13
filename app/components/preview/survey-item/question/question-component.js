(function() {
    'use strict';

    angular
        .module('otus.component.preview')
        .component('otusQuestion', {
            templateUrl: 'app/components/preview/survey-item/question/question-component-template.html',
            controller: OtusQuestionController,
            bindings: {
                itemData: '<',
                onUpdate: '&'
            },
            require: {
                otusSurveyItem: '^otusSurveyItem'
            }
        });

    OtusQuestionController.$inject = ['TagComponentBuilderService'];

    function OtusQuestionController(TagComponentBuilderService) {
        var self = this;

        self.$onInit = function() {
            self.template = TagComponentBuilderService.createTagElement(self.itemData.objectType);
        };

        self.update = function(prop, value) {
            self.onUpdate({
                valueType: prop,
                value: value
            });
        };

    }

})();
