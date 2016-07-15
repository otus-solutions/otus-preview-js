(function() {
    'use strict';

    angular
        .module('otusjs.player.service')
        .service('DataService', DataService);

    DataService.$inject = ['ActivityFacadeService', 'ActivityUserFactory'];

    function DataService(ActivityFacadeService, ActivityUserFactory) {
        var self = this;

        self.transferData = transferData;

        function transferData(data) {
            var user = ActivityUserFactory.create('User Name', 'user@email.com');
            ActivityFacadeService.initializeActivitySurvey('Categoria Teste', 'Grupo Teste', 'TOID', user);
            ActivityFacadeService.createQuestionFill(data.questionID, data.answer, data.metadata, data.comment);
        }
    }

})();
