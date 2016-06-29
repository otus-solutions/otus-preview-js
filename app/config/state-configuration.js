(function() {
    'use strict';

    angular
        .module('otus.preview')
        .config(stateConfiguration);

    stateConfiguration.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    function stateConfiguration($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider
            .state('index', {
                url: '/index',
                templateUrl: 'app/view/survey-template-preview.html',
                resolve: {
                    resolvedSurveyTemplate: function prepareWorkEnvironment(FakeDataService, $q) {
                        var deferred = $q.defer();
                        FakeDataService.getSurveyTemplate().then(function(data){
                            deferred.resolve(data);
                        });
                        return deferred.promise;
                    }
                },
                controller: 'MainController as mainController'
            });

        $urlRouterProvider.otherwise('');
        $locationProvider.html5Mode(true);
    }

}());
