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
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function OtusQuestionController(TagComponentBuilderService, CurrentItemService) {
    var self = this;

    self.$onInit = function() {
      self.template = TagComponentBuilderService.createTagElement(self.itemData.objectType);
      self.otusSurveyItem.questionComponent = self;
      self.item = {};
      self.metadata = {};
      self.comment = {};
      self.menuComponent = {};
      self.menuComponent.error = false;
    };

    self.update = function(prop, value) {
      self.onUpdate({
        valueType: prop,
        value: value
      });
    };

    self.forceAnswer = function() {
      self.onUpdate({
        valueType: 'forceAnswer',
        value: true
      });
    };

    self.clear = function(value) {
      if (value) {
        if (value === 'answer') {
          self.clearAnswer();
        } else if (value === 'metadata') {
          self.clearMetadataAnswer();
        } else if (value === 'comment') {
          self.clearCommentAnswer();
        }
      }
    }

    self.clearAnswer = function() {
      self.item.clear();
    };

    self.clearMetadataAnswer = function() {
      self.metadata.clear();
    };

    self.clearCommentAnswer = function() {
      self.comment.clear();
    };

    self.setError = function() {
      if (self.item.itemData.isQuestion() && self.item.itemData.fillingRules.options.accept !== undefined)
        self.menuComponent.error = true;
    }
  }

})();
