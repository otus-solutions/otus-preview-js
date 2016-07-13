(function() {
    'use strict';

    angular
        .module('otus.preview')
        .service('DataService', DataService);

    DataService.$inject = ['ActivityFacadeService'];

    function DataService(ActivityFacadeService) {
        var self = this;

        self.transferData = transferData;

        function transferData(data) {
            ActivityFacadeService.fillQuestion(data);
        }
    }

})();
