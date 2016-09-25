(function() {
  'use strict';

  angular
    .module('otusjs.player.core.player')
    .service('otusjs.player.core.player.PlayerService', PlayerService);

  PlayerService.$inject = [
    'otusjs.player.core.player.AheadActionService',
    'otusjs.player.core.activity.ActivityFacadeService'
  ];

  function PlayerService(AheadActionService, ActivityFacadeService) {
    var self = this;
    var _nextItems = [];

    self.goAhead = goAhead;
    self.goBack = goBack;
    self.getNext = getNext;
    self.getPrevious = getPrevious;
    self.play = play;
    self.setup = setup;
    // self.canWeGo = canWeGo;

    function goAhead() {
      AheadActionService.execute();
    }

    function goBack() {
      // PreBackService.execute();
      // BackService.execute();
      // PostBackService.execute();
    }

    function getNext() {
      if (ActivityFacadeService.hasNext()) {
        return ActivityFacadeService.getNextItem();
      }
    }

    function getPrevious() {
      if (ActivityFacadeService.hasPrevious()) {
        return ActivityFacadeService.getPreviousItem();
      }
    }

    function play() {
      ActivityFacadeService.initialize();
    }

    function setup(survey) {
      ActivityFacadeService.setup(survey);
    }

    // function canWeGo(where) {
    //   var ignoreValidation = CurrentQuestionService.ignoreValidation();
    //   var directions = {
    //     'ahead': function() {
    //       CurrentQuestionService.validateQuestion(); //updates getValidationError
    //       var validationOk = !CurrentQuestionService.getValidationError();
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
