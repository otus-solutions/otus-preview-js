(function() {
  'use strict';

  angular
    .module('otusjs.player.data.activity')
    .service('otusjs.player.data.activity.ActivityFacadeService', Service);

  Service.$inject = [
    'otusjs.player.data.activity.CurrentSurveyService',
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function Service(CurrentSurveyService, CurrentItemService) {
    let self = this;

    /* Public Interface */
    self.applyAnswer = applyAnswer;
    self.attachItemValidationError = attachItemValidationError;
    self.fetchItemAnswerByCustomID = fetchItemAnswerByCustomID;
    self.fetchItemByID = fetchItemByID;
    self.fetchNavigationByOrigin = fetchNavigationByOrigin;
    self.getCurrentItem = getCurrentItem;
    self.getCurrentSurvey = getCurrentSurvey;
    self.initialize = initialize;
    self.setupAnswer = setupAnswer;
    self.setup = setup;

    function applyAnswer() {
      CurrentItemService.applyFilling();
    }

    function attachItemValidationError(validationError) {
      CurrentItemService.attachValidationError(validationError);
    }

    function fetchItemAnswerByCustomID(id) {
      return CurrentSurveyService.getAnswerByItemID(id);
    }

    function fetchItemByID(id) {
      return CurrentSurveyService.getItemByCustomID(id);
    }

    function fetchNavigationByOrigin(id) {
      return CurrentSurveyService.getNavigationByOrigin(id);
    }

    function getCurrentItem() {
      return CurrentItemService;
    }

    function getCurrentSurvey() {
      return CurrentSurveyService;
    }

    function initialize() {
      CurrentSurveyService.initialize();
    }

    function setupAnswer(answerData) {
      CurrentItemService.fill(answerData);
    }

    function setup() {
      CurrentItemService.clearData();
      CurrentSurveyService.setup();
    }
  }
}());
