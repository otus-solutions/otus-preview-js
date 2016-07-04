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

    OtusQuestionController.$inject = ['TagComponentBuilderService'];

    function OtusQuestionController(TagComponentBuilderService) {
        var self = this;

        self.$onInit = function() {
            self.template = TagComponentBuilderService.createTagElement(self.itemData.objectType);
        };

    }

})();
