(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusQuestionMenu', {
      templateUrl: 'app/otusjs-player-component/question-menu/question-menu-template.html',
      controller: OtusSurveyMenuController,
      bindings: {
        onClear: '&',
        onAccept: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    });

  OtusSurveyMenuController.$inject = [
    '$mdDialog',
    '$mdMedia'
  ];

  function OtusSurveyMenuController($mdDialog, $mdMedia) {
    var self = this;

    self.$onInit = function() {
      self.otusQuestion.menuComponent = self;
      self.dialogSettings = {
        parent: angular.element(document.body),
        templateUrl: 'app/otusjs-player-component/question-menu/accept-answer/accept-answer-dialog-template.html',
        controller: DialogController,
        controllerAs: 'controller',
        openFrom: '#system-toolbar',
        closeTo: {
          bottom: 0
        }
      };
    };

    self.clear = function(value) {
      self.onClear({
        value: value
      });
    };

    self.showConfirm = function(ev) {
      $mdDialog
        .show(self.dialogSettings)
        .then(
          forwardSuccessfulExecution,
          forwardUnsuccessfulExecution
        );

      return {
        onConfirm: function(callback) {
          self.callback = callback;
        }
      };
    };

    function forwardSuccessfulExecution(response) {
      self.onAccept({
        value: true
      });
    }

    function forwardUnsuccessfulExecution(error) {}
  }

  function DialogController($mdDialog) {
    var self = this;

    /* Public interface */
    self.cancel = cancel;
    self.accept = accept;

    function cancel(response) {
      $mdDialog.hide(response);
    }

    function accept(response) {
      $mdDialog.hide(response);
    }
  }

})();
