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
    var SURVEY_ITEM = '<otus-survey-item item-data="itemData" />';
    var self = this;

    /* Public methods */
    self.catchMouseWheel = catchMouseWheel;
    self.eject = eject;
    self.goAhead = goAhead;
    self.goBack = goBack;
    self.pause = pause;
    self.play = play;
    self.stop = stop;
    self.showBack = showBack;
    self.showCover = showCover;
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
      PlayerService.goAhead();
      _loadItem();
    }

    function goBack() {
      PlayerService.goBack();
      _loadItem();
    }

    function pause() {}

    function play() {
      self.showBackCover = false;
      self.showCover = false;
      self.showActivity = true;
      PlayerService.play();
      _loadItem();
    }

    function stop() {}

    function showCover() {
      self.playerCover.show();
    }

    function showBack() {
      self.showBackCover = true;
      self.showCover = false;
      self.showActivity = false;
    }

    function onInit() {
      self.showBackCover = false;
      self.showCover = true;
      self.showActivity = false;

      /*
       * These objects are initialized by child components of Player
       * See player-commander-component.js (onInit method)
       * See player-display-component.js (onInit method)
       */
      self.playerCommander = {};
      self.playerDisplay = {};
      self.playerCover = {};
      self.playerBackCover = {};      
      PlayerService.bindComponent(self);
    }

    function _loadItem() {
      if (PlayerService.getItemData()) {
        self.playerDisplay.loadItem(PlayerService.getItemData());
      }
    }
  }
}());
