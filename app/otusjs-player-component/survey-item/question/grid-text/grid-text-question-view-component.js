(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusGridTextQuestionView', {
      templateUrl: 'app/otusjs-player-component/survey-item/question/grid-text/grid-text-question-template.html',
      controller: Controller,
      bindings: {
        itemData: '<'
      }
    });

   function Controller() {
    var self = this;

    self.$onInit = function() {
      self.answerArray = self.itemData.data.answer.value;
      self.view = true;
    };

    self.update = ()=>{};
    self.blurOnClick=()=>{};


  }
}());
