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
    var _surveyItemGroup = [];
    var _fillingContainer = {};
    var _navigation = null;
    var _validationError = {};
    var _observerArray = [];

    /* Public Interface */
    self.applyFilling = applyFilling;
    self.attachValidationError = attachValidationError;
    self.clearData = clearData;
    self.fill = fill;
    self.getFilling = getFilling;
    self.getFillingContainer = getFillingContainer;
    self.getFillingRules = getFillingRules;
    self.getItems = getItems;
    self.getItemsByTemplateID = getItemsByTemplateID;
    self.getNavigation = getNavigation;
    self.getValidationError = getValidationError;
    self.hasItems = hasItems;
    self.shouldIgnoreResponseEvaluation = shouldIgnoreResponseEvaluation;
    self.shouldApplyAnswer = shouldApplyAnswer;
    self.observerRegistry = observerRegistry;
    self.setup = setup;

    function applyFilling() {
      Object.values(_fillingContainer).forEach(filling => {
        if (filling) {
          ActivityFacadeService.fillQuestion(filling);
        }
      });
    }

    function attachValidationError(validationError) {
      _validationError = validationError;
      _observerArray.forEach(observer => {
        if(validationError[observer.itemData.templateID]){
           observer.updateValidation(validationError[observer.itemData.templateID]);
        }
      })
    }

    function clearData() {
      _surveyItemGroup = [];
      _fillingContainer = {};
      _navigation = null;
      _validationError = {};
      _observerArray = [];
    }

    function fill(filling) {
      _fillingContainer[filling.questionID] = filling;
    }

    function getFilling(questionID) {
      return _fillingContainer[questionID];
    }

    function getFillingContainer() {
      return _fillingContainer;
    }

    function getFillingRules(templateID) {
      var options = null;
      _surveyItemGroup.forEach(item => {
        if (item.templateID === templateID) {
          options = item.fillingRules.options;
        }
      });

      return options;
    }

    function getItems() {
      return _surveyItemGroup;
    }

    function getItemsByTemplateID(templateID) {
      return _surveyItemGroup.find(item => {
        return item.templateID === templateID
      });
    }

    function getNavigation() {
      return _navigation;
    }

    function getValidationError() {
      return _validationError;
    }

    function hasItems() {
      return !!(_surveyItemGroup && _surveyItemGroup.length);
    }

    function shouldApplyAnswer() {
      return _surveyItemGroup.some(function (surveyItem) {
        return surveyItem && surveyItem.isQuestion();
      });
    }

    function shouldIgnoreResponseEvaluation() {
      return _surveyItemGroup.every(function (surveyItem) {
        return !surveyItem || !surveyItem.isQuestion();
      });
    }

    function observerRegistry(observer) {
      observer.pushData(_fillingContainer[observer.itemData.templateID]);
      _observerArray.push(observer);
    }

    function setup(data) {
      clearData();
      _surveyItemGroup = data.items;
      _navigation = data.navigation;

      _surveyItemGroup.forEach(function (surveyItem) {
        if (surveyItem.isQuestion()) {
          let filling;
          if (surveyItem.isQuestion()) {
            filling = ActivityFacadeService.getFillingByQuestionID(surveyItem.templateID);
            if (!filling) {
              filling = ActivityFacadeService.createQuestionFill(surveyItem);
              filling.answerType = surveyItem.objectType;
            }
          } else {
            filling = null;
          }
          _fillingContainer[surveyItem.templateID] = filling;
        }
      });
    }
  }
}());
