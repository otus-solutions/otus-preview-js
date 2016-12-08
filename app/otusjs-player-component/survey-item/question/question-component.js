(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusQuestion', {
            templateUrl: 'app/otusjs-player-component/survey-item/question/question-component-template.html',
            controller: OtusQuestionController,
            bindings: {
                itemData: '<',
                onUpdate: '&',
                onClear: '&'
            },
            require: {
                otusSurveyItem: '^otusSurveyItem'
            }
        });

    OtusQuestionController.$inject = [
      'otusjs.player.core.renderer.TagComponentBuilderService',
      'otusjs.player.data.activity.CurrentItemService',
    ];

    function OtusQuestionController(TagComponentBuilderService, CurrentItemService) {
        var self = this;

        self.$onInit = function() {
            self.template = TagComponentBuilderService.createTagElement(self.itemData.objectType);
            self.otusSurveyItem.questionComponent = self;
            self.item = {};
            self.metadata = {};
        };

        self.update = function(prop, value) {
            self.onUpdate({
                valueType: prop,
                value: value
            });
        };

        self.clear = function(prop, value) {
            self.onClear({
                valueType: prop,
                value: value
            });
        };

        self.clearAnswer = function() {
          self.item.clear();
        };

        self.clearMetadataAnswer = function() {
          self.metadata.clear();
        };

    }

})();
