(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusPlayer', {
      templateUrl: 'app/otusjs-player-component/player/player-template.html',
      controller: Controller
    });

  Controller.$inject = [
    'otusjs.player.core.player.PlayerService'
  ];

  function Controller(PlayerService) {
    let SURVEY_ITEM = '<otus-survey-item item-data="itemData" />';
    let self = this;

    /* Public methods */
    self.catchMouseWheel = catchMouseWheel;
    self.eject = eject;
    self.goAhead = goAhead;
    self.goBack = goBack;
    self.pause = pause;
    self.play = play;
    self.stop = stop;
    self.$onInit = onInit;

    function catchMouseWheel($event) {
      if (event.deltaY > 0) {
        goAhead();
      } else {
        goBack();
      }
    }

    function eject() {}

    function goAhead() {
      self.playerDisplay.loadItem();
    }

    function goBack() {
      self.playerDisplay.loadItem();
    }

    function pause() {}

    function play() {
      self.playerDisplay.loadItem();
    }

    function stop() {}

    function onInit() {
      /*
       * These objects are initialized by child components of Player
       * See player-commander-component.js (onInit method)
       * See player-display-component.js (onInit method)
       */
      self.playerCommander = {};
      self.playerDisplay = {};

      PlayerService.setup();
    }
  }
}());
