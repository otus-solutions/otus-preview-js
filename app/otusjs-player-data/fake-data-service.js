(function() {
    'use strict';

    angular
        .module('otusjs.player.data')
        .service('FakeDataService', FakeDataService);

    FakeDataService.$inject = ['$http', '$q'];

    function FakeDataService($http, $q) {
        var self = this;

        self.getSurveyTemplate = getSurveyTemplate;

        function getSurveyTemplate() {
            var defer = $q.defer();
            $http.get('app/otusjs-player-data/lowerCase-upperCase.json').success(function(data) {
                defer.resolve(data);
            }).error(function(error) {
                console.log('Cannot GET a fake survey template.');
            });
            return defer.promise;
        }
    }

})();
