(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusIntegerQuestion', {
      templateUrl: 'app/otusjs-player-component/survey-item/question/integer/integer-question-template.html',
      controller: "otusIntegerQuestionCtrl as $ctrl",
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    }).controller("otusIntegerQuestionCtrl", Controller);

  Controller.$inject = [
    '$document',
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function Controller($document, CurrentItemService) {
    var self = this;

    self.$onInit = onInit;
    self.update = update;
    self.clear = clear;

    self.view = false;

    function onInit() {
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
    }

    function update() {
      self.onUpdate({
        valueType: 'answer',
        value: self.answer
      });
    }

    function clear() {
      CurrentItemService.getFilling(self.itemData.templateID).answer.clear();
      delete self.answer;
    }
  }
}());
