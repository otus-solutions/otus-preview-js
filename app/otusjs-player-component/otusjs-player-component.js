(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusPreview', {
            template: '<survey-item item-data="item" ng-repeat="item in ::$ctrl.itemStack track by $index"></survey-item>',
            controller: OtusPreviewController,
            bindings: {
                surveyTemplate: '='
            }
        });

    function OtusPreviewController() {
        var self = this;

        self.itemContainer = [];
        self.itemStack = [];

        self.$onInit = function() {
            self.itemContainer = self.surveyTemplate.itemContainer;
            console.log(self.itemStack);
        };
    }

})();
