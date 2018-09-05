(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusEmailQuestion', {
      templateUrl: 'app/otusjs-player-component/survey-item/question/email/email-question-template.html',
      controller: "otusEmailQuestionCtrl as $ctrl",
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require : {
        otusQuestion: '^otusQuestion'
      }
    }).controller("otusEmailQuestionCtrl", Controller);

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function Controller(CurrentItemService) {
    var self = this;

    self.$onInit = function() {
      self.answer = CurrentItemService.getFilling().answer.value;
      self.otusQuestion.answer = self;
      self.view = false;
    };

    self.update = function() {
      self.onUpdate({
        valueType: 'answer',
        value: self.answer
      });
    };

    self.ariaLabel = function() {
      return self.itemData.label.ptBR.plainText;
    };

    self.clear = function() {
      CurrentItemService.getFilling().answer.clear();
      delete self.answer;
    }
  }
}());
