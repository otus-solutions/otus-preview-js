(function() {
  'use strict';

  angular
    .module('otusjs.player.core.player')
    .service('otusjs.player.core.player.PlayerService', PlayerService);

  PlayerService.$inject = [
    'otusjs.player.core.activity.ItemManagerService',
    'otusjs.player.core.activity.CurrentQuestionService',
    'otusjs.player.core.activity.CurrentSurveyService'
  ];

  function PlayerService(ItemManagerService, CurrentQuestionService, CurrentSurveyService) {
    var self = this;
    var _nextItems = [];

    self.play = play;
    self.getNext = getNext;
    self.getPrevious = getPrevious;
    self.hasNext = hasNext;
    self.hasPrevious = hasPrevious;
    self.canWeGo = canWeGo;

    function play(survey) {
      ItemManagerService.init(survey.itemContainer);
      CurrentSurveyService.setSurvey(survey);
      CurrentQuestionService.setQuestion(survey.itemContainer[0]);
    }

    function getNext() {
      if (hasNext()) {
        return ItemManagerService.next();
      }
    }

    function getPrevious() {
      if (hasPrevious()) {
        return ItemManagerService.previous();
      }
    }

    function hasNext() {
      _nextItems = CurrentSurveyService.getNextItemsFrom(CurrentQuestionService.getQuestion().templateID);
      return _nextItems.length;
    }

    function hasPrevious() {
      return ItemManagerService.hasPrevious();
    }

    function canWeGo(where) {
      var ignoreValidation = CurrentQuestionService.ignoreValidation();
      var directions = {
        'ahead': function() {
          CurrentQuestionService.validateQuestion(); //updates getValidationError
          var validationOk = !CurrentQuestionService.getValidationError();
          var conditions = [
            hasNext(),
            (validationOk || ignoreValidation)
          ];
          return conditions.indexOf(false, conditions) === -1;
        },
        'back': function() {
          var conditions = [
            hasPrevious(),
          ];
          return conditions.indexOf(false, conditions) === -1;
        }
      };
      return directions[where]();
    }
  }
})();
