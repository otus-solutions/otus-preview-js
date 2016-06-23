(function() {
    'use strict';

    angular
        .module('otus.preview')
        .component('otusQuestion', {
            template: '<calendar-question></calendar-question>',
            controller: OtusQuestionController,
        });

    OtusQuestionController.$inject = [];

    function OtusQuestionController() {
        var self = this;

        self.$onInit = function() {

        };
    }

})();
