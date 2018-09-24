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
      self.view = true;
    }
  }
}());
