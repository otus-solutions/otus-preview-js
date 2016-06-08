/**
  A sheet precisa saber o que ira ser carregado nela, edição ou uma survey preview (nesse ponto aqui, ela já deve saber..)
  A responsibilidade aqui é iniciar e chamar quem irá ler e fabricar as questões
**/
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
