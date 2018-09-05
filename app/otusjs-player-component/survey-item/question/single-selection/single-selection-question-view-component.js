(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusSingleSelectionQuestionView', {
      templateUrl: 'app/otusjs-player-component/survey-item/question/single-selection/single-selection-question-template.html',
      controller: Controller,
      bindings: {
        itemData: '<'
      }
    });

   function Controller() {
    var self = this;

    self.$onInit = function() {
      self.answer = self.itemData.data.answer.value;
      // self.otusQuestion.answer = self;
      self.view = true;
    };

  }
}());
