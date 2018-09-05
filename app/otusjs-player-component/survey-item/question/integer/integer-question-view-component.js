(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusIntegerQuestionView', {
      templateUrl: 'app/otusjs-player-component/survey-item/question/integer/integer-question-template.html',
      controller: "otusIntegerQuestionViewCtrl as $ctrl",
      bindings: {
        itemData: '<'
      }
    }).controller("otusIntegerQuestionViewCtrl", Controller);

  Controller.$inject = [];

  function Controller() {
    var self = this;

    self.$onInit = function() {
      self.answer = self.itemData.data.answer.value;
      self.view = true;
    };

  }
}());
