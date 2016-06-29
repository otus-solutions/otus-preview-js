(function() {
    'use strict';

    angular
        .module('otus.preview')
        .controller('MainController', MainController);

    MainController.$inject = ['resolvedSurveyTemplate'];

    function MainController(resolvedSurveyTemplate) {
        var self = this;

        self.surveyTemplate = resolvedSurveyTemplate;
    }

})();
