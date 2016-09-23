(function() {
  'use strict';

  angular
    .module('otusjs.player.core.player')
    .service('otusjs.player.core.player.PlayerService', PlayerService);

  PlayerService.$inject = [
    'otusjs.player.core.activity.ActivityFacadeService',
    'otusjs.player.core.activity.CurrentQuestionService'
  ];

  function PlayerService(ActivityFacadeService, CurrentQuestionService) {
    var self = this;
    var _nextItems = [];

    self.play = play;
    self.getNext = getNext;
    self.getPrevious = getPrevious;
    self.hasNext = hasNext;
    self.hasPrevious = hasPrevious;
    self.canWeGo = canWeGo;

    function play(survey) {
      ActivityFacadeService.setup(survey);
    }

    function goAhead() {
      
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

    function canWeGo(where) {
      var ignoreValidation = CurrentQuestionService.ignoreValidation();
      var directions = {
        'ahead': function() {
          CurrentQuestionService.validateQuestion(); //updates getValidationError
          var validationOk = !CurrentQuestionService.getValidationError();
          var conditions = [
            ActivityFacadeService.hasNext(),
            (validationOk || ignoreValidation)
          ];
          return conditions.indexOf(false, conditions) === -1;
        },
        'back': function() {
          var conditions = [
            ActivityFacadeService.hasPrevious()
          ];
          return conditions.indexOf(false, conditions) === -1;
        }
      };
      return directions[where]();
    }
  }
})();
