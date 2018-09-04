(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusCheckboxQuestionView', {
      templateUrl: 'app/otusjs-player-component/survey-item/question/checkbox/checkbox-question-template.html',
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
