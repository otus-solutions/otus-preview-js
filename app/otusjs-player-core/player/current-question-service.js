(function() {
    'use strict';

    angular
        .module('otusjs.player.core')
        .service('otusjs.player.core.CurrentQuestion', Service);

    Service.$inject = [
        'otusjs.player.core.ValidateService'
    ];

    function Service(ValidateService) {
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
            question = item;
            Object.keys(question.fillingRules.options).forEach(function(rule) {
                console.log(rule + ' - ' + question.fillingRules.options[rule].data.reference);
            });
            _startValidation();
            validationError = false;
            self.validationAnswer = {};
        };

        self.observerRegistry = function(obs) {
            observer = obs;
        };

        self.setAnswer = function(ans) {
            self.answer.data = ans;            
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
            ValidateService.setValidation(self.getQuestion(), self.answer);
        }

        function validateQuestion() {
            ValidateService.applyValidation(question, validationCallback);
        }

        function validationCallback(response) {
            self.validationAnswer = {};
            validationError = false;
            console.log('--------');
            console.log('response');
            console.log(response[0].validatorsResponse);
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
            console.log(validationError);
            console.log('--------');

            return validationError;
        }

        function ignoreValidation() {
            return true;
        }
    }
}());
