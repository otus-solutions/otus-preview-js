(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusGridTextQuestionView', {
      templateUrl: 'app/otusjs-player-component/survey-item/question/grid-text/grid-text-question-template.html',
      controller: "otusGridTextQuestionViewCtrl as $ctrl",
      bindings: {
        itemData: '<'
      }
    }).controller("otusGridTextQuestionViewCtrl", Controller);

  Controller.$inject = [];

  function Controller() {
    var self = this;

    /* Public Interface */
    self.$onInit = onInit;

    function onInit() {
      self.answerArray = self.itemData.data.answer.value;
      _fixArray();
      self.view = true;
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

  }
}());
