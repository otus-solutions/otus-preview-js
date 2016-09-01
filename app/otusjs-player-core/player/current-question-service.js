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
        var answer ={};
        var question;
        self.validations = new Map();

        self.setQuestion = function(item) {
            answer = {};
            question = item;
            _startValidation();
        };
        self.setAnswer = function(ans) {
            answer = ans;
            console.log(ans);
            validateMe();
        };
        self.getFillingRules = function() {
            return question.fillingRules.options;
        };
        self.getAnswer = function() {
          return answer;
        };
        self.getQuestion = function() {
            return question;
        };

        function _startValidation() {
          ValidateService.setValidation(self.getQuestion(), answer);
        }

        function validateMe() {
          var lista =[];
          ValidateService.applyValidation(question, callMemaybe);
        }
        function callMemaybe(response) {
          response[0].validatorsResponse.map(function(ValidatorResponse){
            self.validations.set(ValidatorResponse.name, !ValidatorResponse.result);

          });


        }
    }
}());
