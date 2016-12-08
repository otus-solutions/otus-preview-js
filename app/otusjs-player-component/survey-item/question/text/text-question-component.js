(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusTextQuestion', {
      templateUrl: 'app/otusjs-player-component/survey-item/question/text/text-question-template.html',
      controller: Controller,
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require : {
        otusQuestion: '^otusQuestion'
      }
    });

  Controller.$inject = [
    '$element',
    'otusjs.player.data.activity.CurrentItemService',
    'uiFormatedService'
  ];

  function Controller($element, CurrentItemService, uiFormatedService) {
    var self = this;

    self.$onInit = function() {
      self.answer = CurrentItemService.getFilling().answer.value;
      self.hasAlphanumeric = CurrentItemService.getFillingRules().alphanumeric;
      self.hasSpecials = CurrentItemService.getFillingRules().specials;
      self.hasUpperCase = CurrentItemService.getFillingRules().upperCase;
      self.hasLowerCase = CurrentItemService.getFillingRules().lowerCase;
      self.otusQuestion.item = self;
    };

    self.update = function() {
      if (self.hasLowerCase) {
        self.answer.value.toLowerCase();
      }
      if (self.hasUpperCase) {
        self.answer.value.toUpperCase();
      }

      if ((self.hasAlphanumeric && self.hasAlphanumeric.data.reference) ||
        (self.hasSpecials && self.hasSpecials.data.reference)) {
        uiFormatedService.apply($element, self.answer);
      }

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
