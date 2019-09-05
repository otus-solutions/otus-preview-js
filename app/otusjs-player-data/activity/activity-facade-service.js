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
    var self = this;

    /* Public Interface */
    self.applyAnswer = applyAnswer;
    self.attachItemValidationError = attachItemValidationError;
    self.fetchItemAnswerByCustomID = fetchItemAnswerByCustomID;
    self.fetchItemAnswerByTemplateID = fetchItemAnswerByTemplateID;
    self.fetchItemByID = fetchItemByID;
    self.fetchItemGroupByID = fetchItemGroupByID;
    self.fetchNavigationByOrigin = fetchNavigationByOrigin;
    self.getCurrentItem = getCurrentItem;
    self.getCurrentSurvey = getCurrentSurvey;
    self.getWholeTemplateStaticVariableList = getWholeTemplateStaticVariableList;
    self.initialize = initialize;
    self.finalize = finalize;
    self.save = save;
    self.setupAnswer = setupAnswer;
    self.setup = setup;
    self.clearSkippedAnswers = clearSkippedAnswers;

    function applyAnswer() {
      CurrentItemService.applyFilling();
    }

    function attachItemValidationError(validationError) {
      CurrentItemService.attachValidationError(validationError);
    }

    function fetchItemAnswerByCustomID(id) {
      return CurrentSurveyService.getAnswerByItemID(id);
    }

    function fetchItemAnswerByTemplateID(id) {
      return CurrentSurveyService.getAnswerByItemID(id);
    }

    function fetchItemByID(id) {
      return CurrentSurveyService.getItemByTemplateID(id);
    }

    function fetchItemGroupByID(id) {
      return CurrentSurveyService.getGroupItemsByMemberID(id);
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

    function getWholeTemplateStaticVariableList() {
      return CurrentSurveyService.getWholeTemplateStaticVariableList();
    }

    function initialize() {
      CurrentSurveyService.initialize();
    }

    function finalize() {
      CurrentSurveyService.finalize();
    }

    function save() {
      CurrentSurveyService.save();
    }

    function setupAnswer(answerData) {
      CurrentItemService.fill(answerData);
    }

    function setup() {
      CurrentItemService.clearData();
      CurrentSurveyService.setup();
    }

    function clearSkippedAnswers() {
      CurrentSurveyService.clearSkippedAnswers();
    }
  }
}());
