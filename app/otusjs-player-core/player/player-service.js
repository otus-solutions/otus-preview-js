(function() {
  'use strict';

  angular
    .module('otusjs.player.core.player')
    .service('otusjs.player.core.player.PlayerService', PlayerService);

  PlayerService.$inject = [
    'otusjs.player.data.activity.ActivityFacadeService',
    'otusjs.player.data.navigation.NavigationService',
    'otusjs.player.core.phase.PlayActionService',
    'otusjs.player.core.phase.AheadActionService',
    'otusjs.player.core.phase.BackActionService',
  ];

  function PlayerService(ActivityFacadeService, NavigationService, PlayActionService, AheadActionService, BackActionService) {
    var self = this;
    var _nextItems = [];

    self.getItem = getItem;
    self.goAhead = goAhead;
    self.goBack = goBack;
    self.play = play;
    self.setup = setup;

    function getItem() {
      return NavigationService.getCurrentItem().getItem();
    }

    function goAhead() {
      AheadActionService.execute();
    }

    function goBack() {
      BackActionService.execute();
    }

    function play() {
      PlayActionService.execute();
    }

    function setup() {
      ActivityFacadeService.setup();
    }
  }
})();
