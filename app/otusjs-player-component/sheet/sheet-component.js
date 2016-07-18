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

    OtusSheetController.$inject = [
        '$scope',
        '$element',
        '$compile',
        'otusjs.player.core.PlayerService',
        'DataService'
    ];

    function OtusSheetController($scope, $element, $compile, PlayerService, DataService) {
        var self = this;

        var SURVEY_ITEM = '<otus-survey-item item-data="itemData" />';

        /* Public methods */
        self.$onInit = onInit;
        self.$onDestroy = onDestroy;
        self.previousItem = previousItem;
        self.nextItem = nextItem;
        self.catchMouseWheel = catchMouseWheel;

        function onInit() {
            self.isLoading = true;
            PlayerService.play(self.surveyTemplate.itemContainer);
            nextItem();
        }

        function onDestroy() {
            _clearWorspace();
        }

        function previousItem() {
            if (PlayerService.hasPrevious()) {
                loadItem(PlayerService.getPrevious());
                updateToolbar();

                if (self.currentChild) {
                    destroyCurrentItem();
                }
            }
        }

        function nextItem() {
            if (PlayerService.hasNext()) {
                loadItem(PlayerService.getNext());
                updateToolbar();

                if (self.currentChild) {
                    transferData();
                    destroyCurrentItem();
                }
            }
        }

        function loadItem(item) {
            $scope.itemData = item;
            $element.find('section').prepend($compile(SURVEY_ITEM)($scope));
        }

        function updateToolbar() {
            self.isPreviousDisabled = !PlayerService.hasPrevious();
            self.isNextDisabled = !PlayerService.hasNext();
        }

        function transferData() {
            DataService.transferData(self.currentChild.filling);
        }

        function destroyCurrentItem() {
            self.currentChild.destroy();
        }

        function catchMouseWheel($event) {
            if (event.deltaY > 0) {
                nextItem();
            } else {
                previousItem();
            }
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
