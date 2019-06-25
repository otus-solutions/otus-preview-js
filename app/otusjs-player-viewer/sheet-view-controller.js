(function() {
    'use strict';

    angular
        .module('otusjs.player.viewer')
        .controller('SheetViewController', SheetViewController);

    SheetViewController.$inject = ['resolvedSurveyTemplate'];

    function SheetViewController(resolvedSurveyTemplate) {
        var self = this;
        self.surveyTemplate = resolvedSurveyTemplate;
        
    }

})();
