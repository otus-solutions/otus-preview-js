(function() {
    'use strict';

    angular
        .module('otus.core.preview')
        .service('CoreSheetContentPreviewService', CoreSheetContentPreviewService);

    CoreSheetContentPreviewService.$inject = [
        'CoreTemplateLoaderService'
    ];

    function CoreSheetContentPreviewService(CoreTemplateLoaderService) {
        var self = this;

        /* Public interface */
        self.startSheet = startSheet;

        function startSheet(scopeReference, elementReference, template) {
            CoreTemplateLoaderService.loadInitForJsonFile(scopeReference, elementReference, template);
        }
    }
}());
