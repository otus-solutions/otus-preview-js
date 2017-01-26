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
    self.isAccept = false;

    self.$onInit = function() {
      self.otusQuestion.menuComponent = self;
      enableDialogSettings();
      disableDialogSettings();
    };

    self.clear = function(value) {
      self.onClear({
        value: value
      });
    };

    self.showConfirm = function(ev) {
      if (!self.isAccept) {
        $mdDialog
          .show(self.enableDialogSettings)
          .then(
            enableForwardSuccessfulExecution,
            enableForwardUnsuccessfulExecution
          );

        return {
          onConfirm: function(callback) {
            self.callback = callback;
          }
        };
      } else {
        $mdDialog
          .show(self.disableDialogSettings)
          .then(
            disableForwardSuccessfulExecution,
            disableForwardUnsuccessfulExecution
          );

        return {
          onConfirm: function(callback) {
            self.callback = callback;
          }
        };
      }
    };

    function enableForwardSuccessfulExecution(response) {
      if (response.action !== 'cancel') {
        self.onAccept({
          value: true
        });
        self.isAccept = true;
      }
    }

    function enableForwardUnsuccessfulExecution(error) {}

    function disableForwardSuccessfulExecution(response) {
      if (response.action !== 'cancel') {
        self.onAccept({
          value: false
        });
        self.isAccept = false;
      }
    }

    function disableForwardUnsuccessfulExecution(error) {}

    function enableDialogSettings() {
      self.enableDialogSettings = {
        parent: angular.element(document.body),
        templateUrl: 'app/otusjs-player-component/question-menu/accept-answer/enable-accept-answer-dialog-template.html',
        controller: DialogController,
        controllerAs: 'controller',
        openFrom: '#system-toolbar',
        closeTo: {
          bottom: 0
        }
      };
    }

    function disableDialogSettings() {
      self.disableDialogSettings = {
        parent: angular.element(document.body),
        templateUrl: 'app/otusjs-player-component/question-menu/accept-answer/disable-accept-answer-dialog-template.html',
        controller: DialogController,
        controllerAs: 'controller',
        openFrom: '#system-toolbar',
        closeTo: {
          bottom: 0
        }
      };
    }

  }

  function DialogController($mdDialog) {
    var self = this;

    /* Public interface */
    self.cancel = cancel;
    self.event = event;

    function cancel(response) {
      $mdDialog.hide(response);
    }

    function event(response) {
      $mdDialog.hide(response);
    }
  }

})();
