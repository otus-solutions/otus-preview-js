(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusSurveyCover', {
      templateUrl: 'app/otusjs-player-component/survey-cover/survey-cover-template.html',
      controller: Controller,
      bindings: {
        onPlay: '&',
        hardBlocker: '&',
        softBlocker: '&',
        onStop: '&'
      }
    });

  Controller.$inject = [
    '$scope',
    '$element',
    'otusjs.player.data.activity.ActivityFacadeService'
  ];

  function Controller($scope, $element, ActivityFacadeService) {
    var self = this;

    /* Public methods */
    self.$onInit = onInit;
    self.play = play;
    self.show = show;
    self.remove = remove;
    self.stop = stop;

    function onInit() {
      $scope.$parent.$ctrl.playerCover = self;
      var activity = ActivityFacadeService.getCurrentSurvey().getSurvey();
      self.title = activity.getName();
      _unblock();
    }

    function _unblock() {
      if (self.hardBlocker()) {
        self.progress = true;
        self.block = true;
        self.hardBlocker()
          .then(function () {
            self.block = false;
            self.progress = false;
          })
          .catch(function () {
            self.erroBlock = true;
            self.block = true;
            self.progress = false;
            self.message = 'Ocorreu um erro ao baixar informações necessárias ao preenchimento da atividade. Clique para sair.';
          });
      }

      if(self.softBlocker){
        self.progress = true;
        self.block = true;
        self.erroBlock = false;
        self.softBlocker()
          .then(function () {
            self.progress = false;
            self.block = false;
            self.erroBlock = false;
          })
          .catch(function () {
            self.progress = false;
          });
      }
    }

    function play() {
      self.onPlay();
    }

    function stop() {
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
