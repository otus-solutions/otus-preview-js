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
      }
    });

  Controller.$inject = [
    '$element',
    'otusjs.player.data.activity.CurrentItemService',
    'uiFormatedService'
  ];

  function Controller($element, CurrentItemService, uiFormatedService) {
    var self = this;

    _init();

    self.hasUpperCase = CurrentItemService.getFillingRules().upperCase;
    self.hasLowerCase = CurrentItemService.getFillingRules().lowerCase;

    var keycode = event.which;

    self.update = function() {
      var answer = self.answer;
      if (self.hasLowerCase) {
        answer = answer.toLowerCase();
      }
      if (self.hasUpperCase) {
        answer = answer.toUpperCase();
      }

      if (self.hasAlphanumeric && self.hasAlphanumeric.data.reference) {
        answer = uiFormatedService.apply($element, self.answer);
      }
      if (self.hasSpecials && self.hasSpecials.data.reference) {
        answer = uiFormatedService.apply($element, self.answer);
      }
      self.onUpdate({
        valueType: 'answer',
        value: answer
      });
    };

    function _init() {
      self.hasAlphanumeric = CurrentItemService.getFillingRules().alphanumeric;
      self.hasSpecials = CurrentItemService.getFillingRules().specials;
    }

  }
}());
