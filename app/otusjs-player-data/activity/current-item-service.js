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
    self.getItems = getItems;
    self.getNavigation = getNavigation;
    self.getValidationError = getValidationError;
    self.hasItems = hasItems;
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
      console.log(filling);
      _surveyGroupItem.forEach(function (surveyItem) {
        if (surveyItem.isQuestion()) {
          console.log(surveyItem);
          _filling[filling.questionID] = filling;
        }
      });
    }

    function getFilling(questionID) {
      return _filling[questionID];
    }

    function getFillingRules(templateID) {
      var options = null;
      _surveyGroupItem.forEach(function (surveyItem) {
        if(surveyItem.templateID === templateID){
          options = surveyItem.fillingRules.options;
        }
      });

      return options;
    }

    function getItems() {
      console.log(_surveyGroupItem);
      return _surveyGroupItem;
    }

    function getNavigation() {
      return _navigation;
    }

    function getValidationError() {
      return _validationError;
    }

    function hasItems() {
      if (_surveyGroupItem) {
          return true;
        } else {
          return false;
        }
    }

    function shouldApplyAnswer() {
      _surveyGroupItem.forEach(function (surveyItem) {
        return surveyItem || surveyItem.isQuestion();
      });
    }

    function shouldIgnoreResponseEvaluation() {
      _surveyGroupItem.forEach(function (surveyItem) {
        return !surveyItem || !surveyItem.isQuestion();
      });
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
        console.log(surveyItem);
        if (surveyItem.isQuestion()) {
          filling = ActivityFacadeService.getFillingByQuestionID(surveyItem.templateID);
          // filling = {
          //   answer: {value: "dfgdfgfdg", objectType: "AnswerFill", type: "TextQuestion"},
          //   comment: "",
          //   forceAnswer: false,
          //   metadata: {objectType: "MetadataFill", value: null},
          //   objectType: "QuestionFill",
          //   questionID: "ACTA1"
          // };
          console.log(filling);
          if (!filling) {
            filling = ActivityFacadeService.createQuestionFill(surveyItem);
            filling.answerType = surveyItem.objectType;
            console.log(filling);
          }
        } else {
          filling = null;
        }

        _filling[surveyItem.templateID] = filling;
        console.log(_filling);
      });
    }
  }
}());
