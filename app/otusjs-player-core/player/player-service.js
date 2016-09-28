(function() {
  'use strict';

  angular
    .module('otusjs.player.core.player')
    .service('otusjs.player.core.player.PlayerService', PlayerService);

  PlayerService.$inject = [
    'otusjs.player.core.activity.ActivityFacadeService',
    'otusjs.player.core.player.PlayActionService',
    'otusjs.player.core.player.AheadActionService'
  ];

  function PlayerService(ActivityFacadeService, PlayActionService, AheadActionService) {
    var self = this;
    var _nextItems = [];

    self.getItem = getItem;
    self.goAhead = goAhead;
    self.goBack = goBack;
    self.play = play;
    self.setup = setup;

    function getItem() {
      return ActivityFacadeService.getCurrentItem().getItem();
    }

    function goAhead() {
      AheadActionService.execute();
    }

    function goBack() {
      // PreBackService.execute();
      // BackService.execute();
      // PostBackService.execute();
    }

    function play() {
      PlayActionService.execute();
    }

    function setup() {
      ActivityFacadeService.setup();
    }

    // function canWeGo(where) {
    //   var ignoreValidation = CurrentItemService.ignoreValidation();
    //   var directions = {
    //     'ahead': function() {
    //       CurrentItemService.validateQuestion(); //updates getValidationError
    //       var validationOk = !CurrentItemService.getValidationError();
    //       var conditions = [
    //         ActivityFacadeService.hasNext(),
    //         (validationOk || ignoreValidation)
    //       ];
    //       return conditions.indexOf(false, conditions) === -1;
    //     },
    //     'back': function() {
    //       var conditions = [
    //         ActivityFacadeService.hasPrevious()
    //       ];
    //       return conditions.indexOf(false, conditions) === -1;
    //     }
    //   };
    //   return directions[where]();
    // }
  }
})();
