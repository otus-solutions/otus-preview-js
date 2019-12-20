(function () {
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

    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;

    angular.element(document.querySelector('.otus-player-display-container')).bind('wheel', function () {
      didScroll = true;
    });

    angular.element(document.querySelector('.otus-player-display-container')).bind('touchmove', function () {
      didScroll = true;
    });

    setInterval(function () {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 250);

    function hasScrolled() {
      var st = angular.element(document.querySelector('.otus-player-display-container')).scrollTop();

      if (Math.abs(lastScrollTop - st) <= delta)
        return;

      if (st > lastScrollTop) {
        $('otus-survey-header').removeClass('nav-down').addClass('nav-up');
      } else {

        $('otus-survey-header').removeClass('nav-up').addClass('nav-down');

      }

      lastScrollTop = st;
    }

    function catchMouseWheel($event) {
      if (event.deltaY > 0) {
        goAhead();
      } else {
        goBack();
      }
    }

    function eject() {
      PlayerService.eject();
    }

    function goAhead() {
      PlayerService.goAhead();
      _loadItem();
    }

    function goBack() {
      PlayerService.goBack();
      _loadItem();
    }

    function pause() {
      PlayerService.save();
    }

    function play() {
      self.showBackCover = false;
      self.showCover = false;
      self.showActivity = true;
      PlayerService.play();
      _loadItem();
    }

    function stop() {
      PlayerService.stop();
    }

    function showCover() {
      self.playerCover.show();
    }

    function showBack() {
      self.playerCover.remove();
      self.playerDisplay.remove();
      self.showBackCover = true;
      self.showActivity = false;
    }

    function onInit() {
      self.showBackCover = false;
      self.showCover = true;
      self.showActivity = false;

      _setupHardBlocker();
      _setupSoftBlocker();

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

    function _setupHardBlocker() {
      self.hardBlocker = PlayerService.getHardBlocker();
    }

    function _setupSoftBlocker() {
      self.softBlocker = PlayerService.getSoftBlocker();
    }

    function _loadItem() {
      let itemData = PlayerService.getItemData();
      if (itemData) {
        self.playerDisplay.loadItem(itemData);
        self.onProcessing = true;
      }
    }
  }
}());
