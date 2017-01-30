(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusCalendarQuestion', {
      templateUrl: 'app/otusjs-player-component/survey-item/question/calendar/calendar-question-template.html',
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
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function Controller(CurrentItemService) {
    var self = this;

    self.$onInit = function() {
      var modelAnswer = CurrentItemService.getFilling().answer.value;
      if (modelAnswer) {
        self.answer = new Date(modelAnswer);
      }
      self.otusQuestion.item = self;
    };

    self.update = function() {
      self.onUpdate({
        valueType: 'answer',
        value: (self.answer instanceof Date) ? self.answer.getTime() : null
      });
    };

    self.clear = function() {
      CurrentItemService.getFilling().answer.clear();
      delete self.answer;
    };
  }
}());
