(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusSingleSelectionQuestion', {
      templateUrl: 'app/otusjs-player-component/survey-item/question/single-selection/single-selection-question-template.html',
      controller: Controller,
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require : {
        otusQuestion: '^otusQuestion'
      }
    });

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService',
    '$element'
  ];

  function Controller(CurrentItemService,$element) {
    var self = this;

    self.$onInit = onInit;
    self.update = update;
    self.clear = clear;
    self.blurOnClick = blurOnClick;

    self.view = false;

    function onInit() {
      self.answer = CurrentItemService.getFilling(self.itemData.templateID).answer.value;
      self.otusQuestion.answer = self;
    }

    function update() {
      self.onUpdate({
        questionID: self.itemData.templateID,
        valueType: 'answer',
        value: self.answer
      });
    }

    function clear() {
      CurrentItemService.getFilling(self.itemData.templateID).answer.clear();
      delete self.answer;
    }

    //OPJ-21 Remove classe md-focused que é adicionada pelo componete radiogroup do angular-material para que
    //não ative os atalhos do teclado nativos do componente
    function blurOnClick() {
      $element.find('#singleSelectionQuestionRadioGroup').removeClass('md-focused');
    }
  }
}());
