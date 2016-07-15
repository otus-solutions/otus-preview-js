(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusSheet', {
            templateUrl: 'app/otusjs-player-component/sheet/sheet-template.html',
            controller: OtusSheetController,
            bindings: {
                surveyTemplate: '='
            }
        });

    OtusSheetController.$inject = ['ViewService'];

    function OtusSheetController(ViewService) {
        var self = this;
        var nextItemIndex = 1;

        /* Public methods */
        self.$onInit = onInit;
        self.$onDestroy = onDestroy;

        function onInit() {
            self.isLoading = true;
            self.itemContainer = self.surveyTemplate.itemContainer;
            self.currentItem = self.itemContainer[0];
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

        self.sayHello = function(eevent) {
            if (event.deltaY > 0) {
                ++nextItemIndex;
            } else {
                --nextItemIndex;
                if (nextItemIndex < 0) {
                    nextItemIndex = 0;
                }
            }
            if (nextItemIndex < self.itemContainer.length) {
                self.currentItem = self.itemContainer[nextItemIndex];
                ViewService.update(self.currentItem);
            }
        };

    }

}());
