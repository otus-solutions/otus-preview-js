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

    self.view = false;

    self.$onInit = function() {
      self.answer = CurrentItemService.getFilling().answer.value;
      self.otusQuestion.answer = self;
    };

    self.update = function() {
      self.onUpdate({
        valueType: 'answer',
        value: self.answer
      });
    };

    self.clear = function() {
      CurrentItemService.getFilling().answer.clear();
      delete self.answer;
    }

    //OPJ-21 Remove classe md-focused que é adicionada pelo componete radiogroup do angular-material para que
    //não ative os atalhos do teclado nativos do componente
    self.blurOnClick = function() {
      $element.find('#singleSelectionQuestionRadioGroup').removeClass('md-focused');
    }
  }
}());
