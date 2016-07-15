(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusQuestion', {
            templateUrl: 'app/otusjs-player-component/survey-item/question/question-component-template.html',
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
            console.log(self.template);
        };

        self.update = function(prop, value) {
            self.onUpdate({
                valueType: prop,
                value: value
            });
        };

    }

})();
