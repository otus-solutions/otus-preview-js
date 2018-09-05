(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusPhoneQuestion', {
      templateUrl: 'app/otusjs-player-component/survey-item/question/phone/phone-question-template.html',
      controller: "otusPhoneQuestionCtrl as $ctrl",
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require : {
        otusQuestion: '^otusQuestion'
      }
    }).controller("otusPhoneQuestionCtrl", Controller);

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

    self.clear = function() {
      CurrentItemService.getFilling().answer.clear();
      delete self.answer;
    }
  }
}());
