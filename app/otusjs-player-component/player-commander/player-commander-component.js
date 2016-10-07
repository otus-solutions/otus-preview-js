(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusPlayerCommander', {
      templateUrl: 'app/otusjs-player-component/player-commander/player-commander-template.html',
      controller: Controller,
      bindings: {
        onGoAhead: '&',
        onGoBack: '&',
        onPause: '&',
        onStop: '&'
      }
    });

  Controller.$inject = [
    '$scope'
  ];

  function Controller($scope) {
    var self = this;

    /* Public methods */
    self.goBack = goBack;
    self.goAhead = goAhead;
    self.pause = pause;
    self.stop = stop;
    self.$onInit = onInit;

    function goAhead() {
      self.onGoAhead();
    }

    function goBack() {
      self.onGoBack();
    }

    function pause() {
      self.onPause();
    }

    function stop() {
      self.onStop();
    }

    function onInit() {
      $scope.$parent.$ctrl.playerCommander = self;
    }
  }
}());
