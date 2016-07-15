(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusSheet', {
            templateUrl: 'app/otusjs-player-component/sheet/sheet-template.html',
            controller: OtusSheetController,
            bindings: {
                surveyTemplate: '<'
            }
        });

    OtusSheetController.$inject = ['$scope', '$element', '$compile'];

    function OtusSheetController($scope, $element, $compile) {
        var self = this;

        var SURVEY_ITEM = '<otus-survey-item item-data="itemData" />';
        var currentItem = -1;
        var lastItem;

        /* Public methods */
        self.$onInit = onInit;
        self.$onDestroy = onDestroy;
        self.hasPreviousItem = hasPreviousItem;
        self.hasNextItem = hasNextItem;
        self.previousItem = previousItem;
        self.nextItem = nextItem;

        function onInit() {
            self.isLoading = true;
            self.itemContainer = self.surveyTemplate.itemContainer;
            lastItem = self.itemContainer.length;
            nextItem();
        }

        function hasPreviousItem() {
            return (currentItem > 0);
        }

        function hasNextItem() {
            return (currentItem < lastItem - 1);
        }

        function previousItem() {
            $scope.itemData = self.surveyTemplate.itemContainer[--currentItem];
            $element.append($compile(SURVEY_ITEM)($scope));
        }

        function nextItem() {
            $scope.itemData = self.surveyTemplate.itemContainer[++currentItem];
            $element.append($compile(SURVEY_ITEM)($scope));
        }

        function onDestroy() {
            _clearWorspace();
        }

        function _loadPreviewMode() {
            EditionPreviewService.setScope($scope);
            EditionPreviewService.loadSurveyTemplate();
        }

        function _loadEditorMode() {
            $window.sessionStorage.setItem('surveyTemplate_OID', WorkspaceService.getSurvey().oid);
        }

        function _clearWorspace() {
            WorkspaceService.closeWork();
            $window.sessionStorage.removeItem('surveyTemplate_OID');
        }
    }

}());
