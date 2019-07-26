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
        onEject: '&'
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
    self.ejectError = ejectError;

    function onInit() {
      $scope.$parent.$ctrl.playerCover = self;
      var activity = ActivityFacadeService.getCurrentSurvey().getSurvey();
      self.title = activity.getName();
      _unblock();
    }

    function _unblock() {
      var umbloqueio = false;
      var outroBloqueio = false;
      if (self.phaseBlocker()) {
        umbloqueio = true;

        self.block = true;
        self.phaseBlocker()
          .then(function (thing) {
            self.block = false;
          })
          .catch(function () {
            self.errorBlock = true;
          });
      }
    }

    function play() {
      self.onPlay();
    }

    function ejectError() {
      self.onEject();
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
