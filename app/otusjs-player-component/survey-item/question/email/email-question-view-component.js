(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusEmailQuestionView', {
      templateUrl: 'app/otusjs-player-component/survey-item/question/email/email-question-template.html',
      controller: "otusEmailQuestionViewCtrl as $ctrl",
      bindings: {
        itemData: '<'
      }
    }).controller("otusEmailQuestionViewCtrl", Controller);

  Controller.$inject = [];

  function Controller() {
    var self = this;

    self.$onInit = function() {
      self.answer = self.itemData.data.answer.value;
      self.view = true;
    };

    self.ariaLabel = function() {
      return self.itemData.label.ptBR.plainText;
    };


  }
}());
