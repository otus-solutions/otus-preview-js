(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusTimeQuestion', {
      templateUrl: 'app/otusjs-player-component/survey-item/question/time/time-question-template.html',
      controller: Controller,
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    });

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService',
    'otusjs.utils.ImmutableDate'
  ];

  function Controller(CurrentItemService, ImmutableDate) {
    var self = this;

    self.$onInit = function() {
      self.answer = CurrentItemService.getFilling().answer.value || new ImmutableDate(null);
      self.otusQuestion.answer = self;
    };

    self.update = function() {
      self.onUpdate({
        valueType: 'answer',
        value: (self.answer.date instanceof Date) ? self.answer : new ImmutableDate(null)
      });
    };

    self.clear = function() {
      CurrentItemService.getFilling().answer.clear();
      delete self.answer;
    };
  }
}());
