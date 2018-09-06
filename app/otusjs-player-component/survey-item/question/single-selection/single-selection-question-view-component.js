(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusSingleSelectionQuestionView', {
      templateUrl: 'app/otusjs-player-component/survey-item/question/single-selection/single-selection-question-template.html',
      controller: "otusSingleSelectionQuestionViewCtrl as $ctrl",
      bindings: {
        itemData: '<'
      }
    }).controller("otusSingleSelectionQuestionViewCtrl", Controller);

   function Controller() {
    var self = this;

     self.view = true;

    self.$onInit = function() {
      self.answer = self.itemData.data.answer.value;
    };

  }
}());
