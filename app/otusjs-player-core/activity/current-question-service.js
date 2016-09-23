(function() {
  'use strict';

  angular
    .module('otusjs.player.core.activity')
    .service('otusjs.player.core.activity.CurrentQuestionService', Service);

  Service.$inject = [
    'otusjs.player.core.validation.ValidationService'
  ];

  function Service(ValidationService) {
    var self = this;
    var _item;
    var _navigation;
    var _previousItem;
    var validationError;
    var observer;
    self.answer = {
      'data': {}
    };

    /* Public Interface */
    self.setup = setup;
    self.getValidationError = getValidationError;
    self.ignoreValidation = ignoreValidation;
    self.validateQuestion = validateQuestion;
    self.getRoutes = getRoutes;
    self.getPreviousItem = getPreviousItem;

    function setup(item, navigation, previousItem) {
      _item = item;
      _navigation = navigation;
      _previousItem = previousItem || null;

      self.answer = {
        'data': {}
      };
      _item = item;
      _startValidation();
      validationError = false;
      self.validationAnswer = {};
    }

    self.setQuestion = function(item) {
      self.answer = {
        'data': {}
      };
      _item = item;
      _startValidation();
      validationError = false;
      self.validationAnswer = {};
    };

    self.observerRegistry = function(obs) {
      observer = obs;
    };

    self.setAnswer = function(ans) {
      self.filling = ans;
      self.answer.data = self.filling.answer;
    };

    self.getAnswer = function() {
      return self.answer.data;
    };

    self.getFillingRules = function() {
      return _item.fillingRules.options;
    };

    self.getQuestion = function() {
      return _item;
    };

    function _startValidation() {
      ValidationService.setValidation(self.getQuestion(), self.answer);
    }

    function validateQuestion() {
      ValidationService.applyValidation(_item, validationCallback);
    }

    function validationCallback(response) {
      self.validationAnswer = {};
      validationError = false;
      var validationResult;
      response[0].validatorsResponse.map(function(ValidatorResponse) {
        validationResult = !ValidatorResponse.result;
        self.validationAnswer[ValidatorResponse.name] = validationResult;
        if (!ValidatorResponse.result) {
          validationError = true;
        }
      });
      notifyObserver(self.validationAnswer);
    }

    function notifyObserver(validationMap) {
      observer.updateValidation(validationMap);
    }

    function getValidationError() {
      return validationError;
    }

    function ignoreValidation() {
      return false;
    }

    function getRoutes() {
      if (_navigation) {
        return _navigation.routes;
      } else {
        return [];
      }
    }

    function getPreviousItem() {
      return _previousItem;
    }
  }
}());
