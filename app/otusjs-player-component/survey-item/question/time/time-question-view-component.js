(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusTimeQuestionView', {
      templateUrl: 'app/otusjs-player-component/survey-item/question/time/time-question-template.html',
      controller: "otusTimeQuestionViewCtrl as $ctrl",
      bindings: {
        itemData: '<'
      }
    }).controller("otusTimeQuestionViewCtrl", Controller);

  Controller.$inject = [];

  function Controller() {
    var self = this;

    self.$onInit = function() {
      self.answer = self.itemData.data.answer.value;
      self.view = true;
    };

  }

}());
