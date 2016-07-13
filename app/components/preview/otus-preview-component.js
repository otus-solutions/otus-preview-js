(function() {
    'use strict';

    angular
        .module('otus.component.preview')
        .component('otusPreview', {
            template: '<survey-item item-data="item" ng-repeat="item in ::$ctrl.itemContainer track by $index"></survey-item>',
            controller: OtusPreviewController,
            bindings: {
                surveyTemplate: '<'
            }
        });

    function OtusPreviewController() {
        var self = this;

        self.itemContainer = [];

        self.$onInit = function() {
            self.itemContainer = self.surveyTemplate.itemContainer;
        };
    }

})();
