(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusTextQuestion', {
      templateUrl: 'app/otusjs-player-component/survey-item/question/text/text-question-template.html',
      controller: "otusTextQuestionCtrl as $ctrl",
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    }).controller("otusTextQuestionCtrl", Controller);

  Controller.$inject = [
    '$element',
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function Controller($element, CurrentItemService) {
    var self = this;

    self.$onInit = onInit;
    self.update = update;
    self.clear = clear;

    self.view = false;

    function onInit() {
      self.answer = CurrentItemService.getFilling(self.itemData.templateID).answer.value;
      self.hasAlphanumeric = CurrentItemService.getFillingRules(self.itemData.templateID).alphanumeric;
      self.hasSpecials = CurrentItemService.getFillingRules(self.itemData.templateID).specials;
      self.hasUpperCase = CurrentItemService.getFillingRules(self.itemData.templateID).upperCase;
      self.hasLowerCase = CurrentItemService.getFillingRules(self.itemData.templateID).lowerCase;
      self.otusQuestion.answer = self;
    }

    function update() {
      _runValidationSteps();

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

    function _filter() {
      var element = angular.element($element[0].querySelector('textarea#textQuestion'));
      self.answer = self.answer.replace(/[^A-Za-z0-9\u00C0-\u00FF,.'"\s]/g, '');
      element.value = self.answer;
    }

    function _isEmpty() {
      return self.answer.length == 0;
    }

    function _runValidationSteps() {
      if (self.hasLowerCase) {
        self.answer.toLowerCase();
      }

      if (self.hasUpperCase) {
        self.answer.toUpperCase();
      }

      if ((self.hasAlphanumeric && self.hasAlphanumeric.data.reference) ||
        (self.hasSpecials && self.hasSpecials.data.reference)) {
        _filter();
      }

      if (_isEmpty()) {
        delete self.answer;
      }
    }
  }
}());
