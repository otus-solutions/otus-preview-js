(function() {
    'use strict';

    angular
        .module('otus.allPurpose.component')
        .component('otusSheet', {
            templateUrl: 'app/components/all-purpose/sheet/sheet-template.html',
            controller: OtusSheetController,
            bindings: {
                surveyTemplate: '<'
            }
        });

    function OtusSheetController() {
        var self = this;

        /* Public methods */
        self.$onInit = onInit;
        self.$onDestroy = onDestroy;

        function onInit() {
            self.isLoading = true;
            self.itemContainer = self.surveyTemplate.itemContainer;

            // if (EditionPreviewService.isLoadingMode()) {
            //     _loadPreviewMode();
            // } else {
            //     _loadEditorMode();
            // }
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
