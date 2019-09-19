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

    self.$onInit = onInit;
    self.setError = setError;
    self.update = update;
    self.forceAnswer = forceAnswer;
    self.clear = clear;
    self.clearAnswer = clearAnswer;
    self.clearMetadataAnswer = clearMetadataAnswer;
    self.clearCommentAnswer = clearCommentAnswer;
    self.isAccept = isAccept;

    function onInit() {
      self.template = TagComponentBuilderService.createTagElement(self.itemData.objectType);
      self.otusSurveyItem.questionComponent = self;
      self.filling = CurrentItemService.getFilling(self.itemData.templateID) || {};
      self.answer = CurrentItemService.getFilling(self.itemData.templateID).answer || {};
      self.metadata = CurrentItemService.getFilling(self.itemData.templateID).metadata || {};
      self.comment = CurrentItemService.getFilling(self.itemData.templateID).comment || {};
      self.menuComponent = {};
      self.menuComponent.error = false;

      setError();
    }

    function update(prop, value) {
      self.onUpdate({
        valueType: prop,
        value: value
      });
    }

    function forceAnswer(value) {
      self.onUpdate({
        valueType: 'forceAnswer',
        value: value
      });
    }

    function clear(value) {
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

    function clearAnswer() {
      self.answer.clear();
    }

    function clearMetadataAnswer() {
      self.metadata.clear();
    }

    function clearCommentAnswer() {
      self.comment.clear();
    }

    function setError(error) {
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
    }

    function isAccept() {
      return self.itemData.fillingRules.options.accept === undefined ? false : true;
    }

    function _canBeIgnored(error) {
      return function(validator) {
        return self.itemData.fillingRules.options[validator].data.canBeIgnored || !error[validator];
      };
    }
  }

})();
