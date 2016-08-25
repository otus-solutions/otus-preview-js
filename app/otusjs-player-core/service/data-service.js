(function() {
    'use strict';

    angular
        .module('otusjs.player.service')
        .service('DataService', DataService);

    DataService.$inject = ['ActivityFacadeService', 'ActivityUserFactory', 'ElementRegisterFactory'];

    function DataService(ActivityFacadeService, ActivityUserFactory, ElementRegisterFactory) {
        var self = this;

        self.transferData = transferData;

        function transferData(data) {
            var user = ActivityUserFactory.create('User Name', 'user@email.com');

            ActivityFacadeService.createActivity('category', 'group', 'FOR123', user);
            ActivityFacadeService.createQuestionFill(data.questionID, data.answer, data.metadata, data.comment);

        }
    }

})();
