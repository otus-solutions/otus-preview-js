(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusPlayerCommander', {
      templateUrl: 'app/otusjs-player-component/player-commander/player-commander-template.html',
      controller: Controller,
      bindings: {
        onEject: '&',
        onGoAhead: '&',
        onGoBack: '&',
        onPause: '&',
        onPlay: '&',
        onStop: '&'
      }
    });

  Controller.$inject = [
    '$scope',
    'otusjs.player.core.player.PlayerService'
  ];

  function Controller($scope, PlayerService) {
    var self = this;

    /* Public methods */
    self.goBack = goBack;
    self.goAhead = goAhead;
    self.pause = pause;
    self.play = play;
    self.stop = stop;
    self.$onInit = onInit;

    function goAhead() {
      PlayerService.goAhead();
      self.onGoAhead();
    }

    function goBack() {
      PlayerService.goBack();
      self.onGoBack();
    }

    function pause() {
      self.onPause();
    }

    function play() {
      PlayerService.play();
      self.onPlay();
    }

    function stop() {
      self.onStop();
    }

    function onInit() {
      $scope.$parent.$ctrl.playerCommander = self;
    }
  }
}());
