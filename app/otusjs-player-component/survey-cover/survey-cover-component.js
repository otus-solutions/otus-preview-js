(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusSurveyCover', {
      templateUrl: 'app/otusjs-player-component/survey-cover/survey-cover-template.html',
      controller: Controller,
      bindings: {
        onPlay: '&',
        phaseBlocker: '&',
        onStop: '&'
      }
    });

  Controller.$inject = [
    '$scope',
    '$element',
    '$mdToast',
    'otusjs.player.data.activity.ActivityFacadeService'
  ];

  function Controller($scope, $element,$mdToast, ActivityFacadeService) {
    var self = this;

    /* Public methods */
    self.$onInit = onInit;
    self.play = play;
    self.show = show;
    self.remove = remove;
    self.stopError = stopError;

    function onInit() {
      $scope.$parent.$ctrl.playerCover = self;
      var activity = ActivityFacadeService.getCurrentSurvey().getSurvey();
      self.title = activity.getName();
      _unblock();
    }

    function _unblock() {
      if (self.phaseBlocker()) {

        self.progress = true;
        self.block = true;
        self.phaseBlocker()
          .then(function (thing) {
            self.block = false;
            self.progress = false;
          })
          .catch(function () {
            self.errorBlock = true;
            self.block = true;
            self.progress = false;
            self.message = "Ocorreu um error na conexão de banco de dados, clique para sair.";
          });
      }
    }

    function play() {
      self.onPlay();
    }

    function stopError() {
      self.onStop();
    }

    function show() {
      var activity = ActivityFacadeService.getCurrentSurvey().getSurvey();
      self.title = activity.getName();
    }

    function remove() {
      $element.remove();
    }
  }
}());
