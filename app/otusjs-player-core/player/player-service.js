(function() {
  'use strict';

  angular
    .module('otusjs.player.core.player')
    .service('otusjs.player.core.player.PlayerService', PlayerService);

  PlayerService.$inject = [
    'otusjs.player.data.activity.ActivityFacadeService',
    'otusjs.player.core.phase.PlayerStartActionService',
    'otusjs.player.core.phase.PlayActionService',
    'otusjs.player.core.phase.AheadActionService',
    'otusjs.player.core.phase.BackActionService',
  ];

  function PlayerService(ActivityFacadeService, PlayerStartActionService, PlayActionService, AheadActionService, BackActionService) {
    var self = this;
    var _nextItems = [];

    self.getItemData = getItemData;
    self.goAhead = goAhead;
    self.goBack = goBack;
    self.play = play;
    self.setup = setup;

    function getItemData() {
      return ActivityFacadeService.getCurrentItem().getItem();
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
      PlayerStartActionService.execute();
    }
  }
})();
