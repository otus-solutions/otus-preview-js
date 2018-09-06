(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusDecimalQuestionView', {
      templateUrl: 'app/otusjs-player-component/survey-item/question/decimal/decimal-question-template.html',
      controller: "otusDecimalQuestionViewCtrl as $ctrl",
      bindings: {
        itemData: '<'
      }
    }).controller("otusDecimalQuestionViewCtrl", Controller);

  Controller.$inject = [];

  function Controller() {
    var self = this;

    self.view = true;

    self.$onInit = function() {
      self.answer = self.itemData.data.answer.value;
    };

  }
}());
