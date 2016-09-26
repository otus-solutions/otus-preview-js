(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusPlayerCommander', {
      templateUrl: 'app/otusjs-player-component/player-commander/player-commander-template.html',
      controller: Controller
    });

  Controller.$inject = [
    'otusjs.player.core.player.PlayerService'
  ];

  function Controller(PlayerService) {
    var self = this;

    /* Public methods */
    self.goBack = goBack;
    self.goAhead = goAhead;
    self.pause = pause;
    self.play = play;
    self.stop = stop;

    function goAhead() {
      PlayerService.goAhead();
    }

    function goBack() {
      PlayerService.goBack();
    }

    function pause() {
      console.log('Pausing player...');
    }

    function play() {
      PlayerService.play();
    }

    function stop() {
      console.log('Stoping player...');
    }
  }
}());
