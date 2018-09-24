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
      self.view = true;
    }
   }
}());
