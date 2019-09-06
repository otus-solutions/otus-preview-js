(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusGridTextQuestion', {
      templateUrl: 'app/otusjs-player-component/survey-item/question/grid-text/grid-text-question-template.html',
      controller: "otusGridTextQuestionCtrl as $ctrl",
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    }).controller("otusGridTextQuestionCtrl", Controller);

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function Controller(CurrentItemService) {
    var self = this;

    /* Public Interface */
    self.$onInit = onInit;
    self.update = update;
    self.clear = clear;

    self.view = false;

    function onInit() {
      self.answerArray = CurrentItemService.getFilling(self.itemData.templateID).answer.value;
      self.otusQuestion.answer = self;
      _fixArray();
    }

    function update(outerIndex, innerIndex) {
      if (!_checkIfAnswered()) {
        clear();
        self.onUpdate({
          valueType: 'answer',
          value: null
        });
      } else {
        assignNullsToEmptyValues();
        self.onUpdate({
          valueType: 'answer',
          value: self.answerArray
        });
      }
    }

    function _fixArray() {
      if (!self.answerArray) {
        self.answerArray = [[]];

        self.itemData.getLinesList().forEach(function (line, outerIndex) {
          self.answerArray[outerIndex] = [];
          line.getGridTextList().forEach(function (gridText, innerIndex) {
            self.answerArray[outerIndex][innerIndex] = _buildAnswerObject(gridText);
          });
        });
      }
    }

    function _buildAnswerObject(gridText) {
      return {
        objectType: 'GridTextAnswer',
        gridText: gridText.customID,
        value: (gridText.value === undefined || gridText.value === '') ? null : gridText.value
      };
    }

    function _checkIfAnswered() {
      var result = false;
      self.itemData.getLinesList().forEach(function (line, outerIndex) {
        line.getGridTextList().forEach(function (gridText, innerIndex) {
          if (self.answerArray[outerIndex][innerIndex].value && self.answerArray[outerIndex][innerIndex].value !== null) {
            result = true;
          }
        });
      });
      return result;
    }

    function assignNullsToEmptyValues() {
      self.itemData.getLinesList().forEach(function (line, outerIndex) {
        line.getGridTextList().forEach(function (gridText, innerIndex) {
          if (self.answerArray[outerIndex][innerIndex].value === '') {
            self.answerArray[outerIndex][innerIndex].value = null;
          }
        });
      });
    }

    function clear() {
      CurrentItemService.getFilling(self.itemData.templateID).answer.clear();
      delete self.answerArray;
      _fixArray();
    }
  }
}());
