(function() {
    'use strict';

    angular
        .module('otusjs.player.input')
        .service('otusjs.player.input.InputDataService', Service);

    Service.$inject = ['$http', '$q'];

    function Service($http, $q) {
        var self = this;

        self.getSurveyTemplate = getSurveyTemplate;

        function getSurveyTemplate() {
            var defer = $q.defer();
            $http.get('app/otusjs-player-data/validation-text-tester.json').success(function(data) {
                defer.resolve(data);
            }).error(function(error) {
                console.log('Cannot GET a fake survey template.');
            });
            return defer.promise;
        }
    }

})();
