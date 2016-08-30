(function() {
    'use strict';

    angular
        .module('otusjs.player.core')
        .service('otusjs.player.core.CurrentQuestion', Service);

    Service.$inject = [];

    function Service() {
        var self = this;
        var answer;
        var question;

        self.setQuestion = function(item) {
            answer = {};
            question = item;
        };
        self.setAnswer = function(ans) {
          console.log(ans);
            answer = ans;
        };
        self.getAnswer = function() {
            return answer;
        };
        self.getFillingRules = function() {
            return self.fillingRules;
        };
        self.getQuestion = function() {
            return question;
        };

        function _setFillingRules() {
            self.fillingRules = question.fillingRules.options;
        }
    }
}());
