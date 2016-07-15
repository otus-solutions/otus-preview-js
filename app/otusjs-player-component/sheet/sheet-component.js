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


    function OtusSheetController() {
        var self = this;

        /* Public methods */
        self.$onInit = onInit;
        self.$onDestroy = onDestroy;

        function onInit() {
            self.isLoading = true;
            self.itemContainer = self.surveyTemplate.itemContainer;
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
