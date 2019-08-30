(function () {
  'use strict';

  angular
    .module('otusjs.player.data.activity')
    .service('otusjs.player.data.activity.CurrentItemService', Service);

  Service.$inject = [
    'otusjs.model.activity.ActivityFacadeService'
  ];

  function Service(ActivityFacadeService) {
    var self = this;
    var _surveyGroupItem = null;
    var _filling = {};
    var _navigation = null;
    var _validationError = null;
    var _observer = null;

    /* Public Interface */
    self.applyFilling = applyFilling;
    self.attachValidationError = attachValidationError;
    self.clearData = clearData;
    self.fill = fill;
    self.getFilling = getFilling;
    self.getFillingRules = getFillingRules;
    self.getItem = getItem;
    self.getSurveyItemGroup = getSurveyItemGroup;
    self.getFillingRulesGroup = getFillingRulesGroup;
    self.getNavigation = getNavigation;
    self.getValidationError = getValidationError;
    self.hasItem = hasItem;
    self.hasItemGroup = hasItemGroup;
    self.shouldIgnoreResponseEvaluation = shouldIgnoreResponseEvaluation;
    self.shouldApplyAnswer = shouldApplyAnswer;
    self.observerRegistry = observerRegistry;
    self.setup = setup;

    function applyFilling() {
      if (_filling) {
        ActivityFacadeService.fillQuestion(_filling);
      }
    }

    function attachValidationError(validationError) {
      _validationError = validationError;
      _observer.updateValidation(validationError);
    }

    function clearData() {
      _surveyGroupItem = null;
      _filling = {};
      _navigation = null;
      _validationError = null;
      _observer = null;
    }

    function fill(filling) {
      if (_surveyGroupItem.isQuestion()) {
        _filling[filling.questionID] = filling;
      }
    }

    function getFilling(questionID) {
      return _filling[questionID];
    }

    function getFillingRules() {
      return _surveyGroupItem.fillingRules.options;
    }

    function getItem() {
      return _surveyGroupItem;
    }

    function getSurveyItemGroup() {
      return _surveyGroupItem;
    }

    function getFillingRulesGroup() {
      return _surveyGroupItem.fillingRules.options;
    }

    function getNavigation() {
      return _navigation;
    }

    function getValidationError() {
      return _validationError;
    }

    function hasItem() {
      if (_surveyGroupItem) {
        return true;
      } else {
        return false;
      }
    }

    function hasItemGroup() {
      if (_surveyGroupItem) {
        return true;
      } else {
        return false;
      }
    }

    function shouldApplyAnswer() {
      return _surveyGroupItem && _surveyGroupItem.isQuestion();
    }

    function shouldIgnoreResponseEvaluation() {
      return !_surveyGroupItem || !_surveyGroupItem.isQuestion();
    }

    function observerRegistry(observer) {
      _observer = observer;
      _observer.pushData(_filling);
    }

    function setup(data) {
      console.log('=================')
      console.log(data)
      clearData();
      _surveyGroupItem = data.items;
      _navigation = data.navigation;

      console.log(_surveyGroupItem);
      _surveyGroupItem.forEach(function (surveyItem) {
        let filling;
        if (surveyItem.isQuestion()) {
          filling = ActivityFacadeService.getFillingByQuestionID(surveyItem.templateID);

          if (filling) {
            filling = ActivityFacadeService.createQuestionFill(surveyItem);
            filling.answerType = surveyItem.objectType;
          }
        } else {
          filling = null;
        }

        _filling[surveyItem.templateID] = filling;
      });
    }
  }
}());
