(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusTextQuestionView', {
      templateUrl: 'app/otusjs-player-component/survey-item/question/text/text-question-template.html',
      controller: "otusTextQuestionViewCtrl as $ctrl",
      bindings: {
        itemData: '<'
      }
    }).controller("otusTextQuestionViewCtrl", Controller);

  Controller.$inject = [];

  function Controller() {
    var self = this;

    self.view = true;

    self.$onInit = function () {
      self.answer = self.itemData.data.answer.value;
    };

  }
}());
