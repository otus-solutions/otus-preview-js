(function() {
    'use strict';

    angular
        .module('otus.preview')
        .controller('SheetViewController', SheetViewController);

    SheetViewController.$inject = ['resolvedSurveyTemplate'];

    function SheetViewController(resolvedSurveyTemplate) {
        var self = this;

        self.surveyTemplate = resolvedSurveyTemplate;
    }

})();
