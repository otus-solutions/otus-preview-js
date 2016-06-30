(function() {
    'use strict';

    angular
        .module('otus.preview.component')
        .component('singleSelectionQuestion', {
            templateUrl: 'app/components/survey-item/question/single-selection/single-selection-question-template.html',
            controller: SingleSelectionQuestionController,
            bindings: {
                itemData: '<'
            }
        });

    function SingleSelectionQuestionController() {
        var self = this;

        self.$onInit = function() {};

    }

})();
