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

    self.update = function(e) {
      var _answer = {};

      if (e.target.validity.valid) {
        _answer = self.answer;
        if (self.answer === null) {
          _answer = {};
        } else {
          if (self.answer.hasOwnProperty('date')) {
            if (self.answer.date === null || self.answer.date === undefined) {
              _answer = {};
            }
          }
        }
      } else {
        _answer = "invalid format";
      }



      self.onUpdate({
        valueType: 'answer',
        value: _answer
      });
    };

    self.clear = function() {
      CurrentItemService.getFilling().answer.clear();
      delete self.answer;
    };
  }

}());
