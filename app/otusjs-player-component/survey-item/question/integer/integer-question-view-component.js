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

  function Controller() {
    var self = this;

    self.view = true;

    self.$onInit = function() {
      self.answer = self.itemData.data.answer.value;
    };

  }
}());
