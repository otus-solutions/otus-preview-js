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

        self.setQuestion = function(item) {
            answer = {};
            question = item;
            _startValidation();
        };
        self.setAnswer = function(ans) {
            answer = ans;
            console.log(ans);
            ValidateService.applyValidation(question);
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
    }
}());
