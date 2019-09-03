(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusIntegerQuestion', {
      templateUrl: 'app/otusjs-player-component/survey-item/question/integer/integer-question-template.html',
      controller: "otusIntegerQuestionCtrl as $ctrl",
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    }).controller("otusIntegerQuestionCtrl", Controller);

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function Controller(CurrentItemService) {
    var self = this;

    self.$onInit = onInit;
    self.update = update;
    self.clear = clear;

    self.view = false;

    function onInit() {
      self.answer = CurrentItemService.getFilling(self.itemData.templateID).answer.value;
      self.otusQuestion.answer = self;
    }

    function update() {
      self.onUpdate({
        questionID: self.itemData.templateID,
        valueType: 'answer',
        value: self.answer
      });
    }

    function clear() {
      CurrentItemService.getFilling(self.itemData.templateID).answer.clear();
      delete self.answer;
    }
  }
}());
