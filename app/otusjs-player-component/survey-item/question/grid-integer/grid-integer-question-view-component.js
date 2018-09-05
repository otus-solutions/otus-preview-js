(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusGridIntegerQuestionView', {
      templateUrl: 'app/otusjs-player-component/survey-item/question/grid-integer/grid-integer-question-template.html',
      controller: "otusGridIntegerQuestionViewCtrl as $ctrl",
      bindings: {
        itemData: '<'
      }
    }).controller("otusGridIntegerQuestionViewCtrl", Controller);

  Controller.$inject = [];

  function Controller() {
    var self = this;

    /* Public Interface */
    self.$onInit = onInit;

    function onInit() {
      self.answerArray = self.itemData.data.answer.value;
      _fixArray();
      self.view = false;
    }

    function _fixArray() {
      if (!Array.isArray(self.answerArray)) {
        self.answerArray = [
          []
        ];

        self.itemData.getLinesList().forEach(function (line, outerIndex) {
          self.answerArray[outerIndex] = [];
          line.getGridIntegerList().forEach(function (gridInteger,
            innerIndex) {
            self.answerArray[outerIndex][innerIndex] =
              _buildAnswerObject(gridInteger);
          });
        });
      }
    }

    function _buildAnswerObject(gridInteger) {
      return {
        objectType: 'GridIntegerAnswer',
        customID: gridInteger.customID,
        value: (gridInteger.value === undefined || gridInteger.value === '') ? null : Number(gridInteger.value)
      };
    }

  }
}());
