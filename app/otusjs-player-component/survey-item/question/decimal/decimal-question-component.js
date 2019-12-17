(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusDecimalQuestion', {
      templateUrl: 'app/otusjs-player-component/survey-item/question/decimal/decimal-question-template.html',
      controller: "otusDecimalQuestionCtrl as $ctrl",
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require : {
        otusQuestion: '^otusQuestion'
      }
    }).controller("otusDecimalQuestionCtrl", Controller);

  Controller.$inject = [
    '$document',
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function Controller($document,CurrentItemService) {
    var self = this;

    self.view = false;

    self.$onInit = function() {
      self.answer = CurrentItemService.getFilling(self.itemData.templateID).answer.value;
      self.otusQuestion.answer = self;

      $document.on('focus blur', 'select, textarea, input', function(e){
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
          self.mobileInput = true;
        }
        else{
          self.mobileInput = false;
        }
      });
    };

    self.update = function() {
      self.onUpdate({
        valueType: 'answer',
        value: self.answer
      });
    };

    self.clear = function() {
      CurrentItemService.getFilling(self.itemData.templateID).answer.clear();
      delete self.answer;
    };
  }
}());
