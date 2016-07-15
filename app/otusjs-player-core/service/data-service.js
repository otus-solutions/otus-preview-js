(function() {
    'use strict';

    angular
        .module('otusjs.player.service')
        .service('DataService', DataService);

    DataService.$inject = ['ActivityFacadeService'];

    function DataService(ActivityFacadeService) {
        var self = this;

        self.transferData = transferData;

        function transferData(data) {
            ActivityFacadeService.fillQuestion(data.questionID, data.answer, data.metadata, data.comment);
        }
    }

})();
