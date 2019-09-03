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
      self.filling = CurrentItemService.getFilling(self.itemData.templateID) || {};
      self.answer = CurrentItemService.getFilling(self.itemData.templateID).answer || {};
      self.metadata = CurrentItemService.getFilling(self.itemData.templateID).metadata || {};
      self.comment = CurrentItemService.getFilling(self.itemData.templateID).comment || {};
      self.menuComponent = {};
      self.menuComponent.error = false;

      self.setError();
    };

    self.update = function(questionID, prop, value) {
      self.onUpdate({
        questionID: questionID,
        valueType: prop,
        value: value
      });
    };

    self.forceAnswer = function(questionID, value) {
      self.onUpdate({
        questionID: questionID,
        valueType: 'forceAnswer',
        value: value
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
    };

    self.clearAnswer = function() {
      self.answer.clear();
    };

    self.clearMetadataAnswer = function() {
      self.metadata.clear();
    };

    self.clearCommentAnswer = function() {
      self.comment.clear();
    };

    self.setError = function(error) {
      if (self.filling.forceAnswer) {
        self.menuComponent.error = true;
      } else if (self.itemData.isQuestion() && error) {
        if (Object.keys(self.itemData.fillingRules.options).every(_canBeIgnored(error))) {
          self.menuComponent.error = true;
        } else {
          self.menuComponent.error = false;
        }
      } else {
        self.menuComponent.error = false;
      }
    };

    self.isAccept = function() {
      return self.itemData.fillingRules.options.accept === undefined ? false : true;
    };

    function _canBeIgnored(error) {
      return function(validator) {
        return self.itemData.fillingRules.options[validator].data.canBeIgnored || !error[validator];
      };
    }
  }

})();
