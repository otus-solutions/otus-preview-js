(function() {
    'use strict';

    angular
        .module('otus.preview')
        .component('surveyItem', {
            template: '<otus-question></otus-question',
            controller: SurveyItemController,
        });

    SurveyItemController.$inject = [];

    function SurveyItemController() {
        var self = this;

    }

})();
