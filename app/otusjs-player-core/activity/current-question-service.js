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
    var question;
    var validationError;
    var observer;

    /* Public Interface */
    self.getValidationError = getValidationError;
    self.ignoreValidation = ignoreValidation;
    self.validateQuestion = validateQuestion;
    self.answer = {
      'data': {}
    };

    self.setQuestion = function(item) {
      self.answer = {
        'data': {}
      };
      question = item;
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
      return question.fillingRules.options;
    };

    self.getQuestion = function() {
      return question;
    };

    function _startValidation() {
      ValidationService.setValidation(self.getQuestion(), self.answer);
    }

    function validateQuestion() {
      ValidationService.applyValidation(question, validationCallback);
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
  }
}());
