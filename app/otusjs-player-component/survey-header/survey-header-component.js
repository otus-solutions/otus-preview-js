(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusSurveyHeader', {
            templateUrl: 'app/otusjs-player-component/survey-header/survey-header-template.html',
            controller: OtusSurveyHeaderController,
            bindings: {
                surveyIdentity: '='
            }
        });

    function OtusSurveyHeaderController() {
        var self = this;
    }

}());
