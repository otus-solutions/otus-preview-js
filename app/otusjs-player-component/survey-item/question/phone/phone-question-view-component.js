(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusPhoneQuestionView', {
      templateUrl: 'app/otusjs-player-component/survey-item/question/phone/phone-question-template.html',
      controller: "otusPhoneQuestionViewCtrl as $ctrl",
      bindings: {
        itemData: '<'
      }
    }).controller("otusPhoneQuestionViewCtrl", Controller);

  Controller.$inject = [];

  function Controller() {
    var self = this;

    self.view = true;

    self.$onInit = function() {
      self.answer = self.itemData.data.answer.value;
    };

  }
}());
