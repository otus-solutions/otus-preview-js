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
    self.forceAnswer = false;

    /* Public methods */
    self.showAccept = showAccept;

    self.$onInit = function() {
      self.otusQuestion.menuComponent = self;
      _enableDialogSettings();
      _disableDialogSettings();

      self.forceAnswer = self.otusQuestion.menuComponent.otusQuestion.filling.forceAnswer;
    };

    self.clear = function(value) {
      self.onClear({
        value: value
      });
    };

    self.showConfirm = function(ev) {
      if (!self.forceAnswer) {
        $mdDialog
          .show(self.enableDialogSettings)
          .then(
            _enableForwardSuccessfulExecution,
            _enableForwardUnsuccessfulExecution
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
            _disableForwardSuccessfulExecution,
            _disableForwardUnsuccessfulExecution
          );

        return {
          onConfirm: function(callback) {
            self.callback = callback;
          }
        };
      }
    };

    function _enableForwardSuccessfulExecution(response) {
      if (response.action !== 'cancel') {
        self.onAccept({
          value: true
        });
        self.forceAnswer = self.otusQuestion.menuComponent.otusQuestion.filling.forceAnswer;
      }
    }

    function _enableForwardUnsuccessfulExecution(error) {}

    function _disableForwardSuccessfulExecution(response) {
      if (response.action !== 'cancel') {
        self.onAccept({
          value: false
        });
        self.forceAnswer = self.otusQuestion.menuComponent.otusQuestion.filling.forceAnswer;
      }
    }

    function _disableForwardUnsuccessfulExecution(error) {}

    function _enableDialogSettings() {
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

    function _disableDialogSettings() {
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

    function showAccept() {
      return self.error || self.forceAnswer;
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
