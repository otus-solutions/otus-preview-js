(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusCheckboxQuestion', {
      templateUrl: 'app/otusjs-player-component/survey-item/question/checkbox/checkbox-question-template.html',
      controller: Controller,
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require : {
        otusQuestion: '^otusQuestion'
      }
    });

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function Controller(CurrentItemService) {
    var self = this;

    self.$onInit = function() {
      self.answerArray = CurrentItemService.getFilling().answer.value;
      self.otusQuestion.answer = self;
      if (!self.answerArray) {
        self.answerArray = [];
        self.itemData.options.forEach(function(option) {
          self.answerArray.push(_buildAnswerObject(option));
        });
      }
    };

    self.update = function(index) {
      self.onUpdate({
        valueType: 'answer',
        value: self.answerArray
      });
    };

    function _buildAnswerObject(option) {
      return {
        option: option.customOptionID,
        state: option.value
      };
    }

    self.clear = function() {
      CurrentItemService.getFilling().answer.clear();
      delete self.answerArray;
    };
  }

}());
