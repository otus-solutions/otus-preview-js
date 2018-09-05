(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusCheckboxQuestionView', {
      templateUrl: 'app/otusjs-player-component/survey-item/question/checkbox/checkbox-question-template.html',
      controller: "otusCheckboxQuestionViewCtrl as $ctrl",
      bindings: {
        itemData: '<'
      }
    }).controller("otusCheckboxQuestionViewCtrl", Controller);

  function Controller() {
    var self = this;

    self.$onInit = function () {
      self.answerArray = self.itemData.data.answer.value;
      self.view = true;
    };
  }
}());
