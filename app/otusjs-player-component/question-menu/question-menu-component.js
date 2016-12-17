(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusQuestionMenu', {
      templateUrl: 'app/otusjs-player-component/question-menu/question-menu-template.html',
      controller: OtusSurveyMenuController,
      bindings: {
        onClear: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    });

  function OtusSurveyMenuController() {
    var self = this;

    self.$onInit = function() {
      self.otusQuestion.menuComponent = self;
    };

    self.clear = function(value) {
      self.onClear({
        value: value
      });
    };
  }

})();
