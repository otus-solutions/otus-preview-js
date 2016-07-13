(function() {
    'use strict';

    angular
        .module('otus.component.allPurpose')
        .component('otusSurveyHeader', {
            templateUrl: 'app/components/all-purpose/survey-header/survey-header-template.html',
            controller: OtusSurveyHeaderController,
            bindings: {
                surveyIdentity: '<'
            }
        });

    function OtusSurveyHeaderController() {
        var self = this;
    }

}());
