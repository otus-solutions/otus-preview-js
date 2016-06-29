(function() {
    'use strict';

    angular
        .module('otus.preview.component')
        .component('surveyItem', {
            template: '<otus-question item-data="$ctrl.itemData"></otus-question>',
            controller: SurveyItemController,
            bindings: {
                itemData : '<'
            }
        });

    function SurveyItemController() {
        var self = this;

        self.$onInit = function() {
        };
    }

})();
