(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusCalendarQuestionView', {
      templateUrl: 'app/otusjs-player-component/survey-item/question/calendar/calendar-question-template.html',
      controller: "otusCalendarQuestionViewCtrl as $ctrl",
      bindings: {
        itemData: '<'
      }
    }).controller("otusCalendarQuestionViewCtrl", Controller);

  Controller.$inject = [];

  function Controller() {
    var self = this;

    self.$onInit = function() {
      self.answer = self.itemData.data.answer.value;
      self.view = true;
    };
  }
}());
