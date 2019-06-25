(function () {
  'use strict';

  angular
    .module('otusjs.player.config')
    .config(stateConfiguration);

  stateConfiguration.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function stateConfiguration($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('index', {
        url: '/index',
        templateUrl: 'app/otusjs-player-viewer/sheet-view-template.html',
        resolve: {
          resolvedSurveyTemplate: function prepareWorkEnvironment(FakeDataService, $q) {
            var deferred = $q.defer();
            FakeDataService.getSurveyTemplate().then(function (data) {
              deferred.resolve(data);
            });
            return deferred.promise;
          }
        },
        controller: 'SheetViewController as sheetViewCtrl'
      });

    $urlRouterProvider.otherwise('/index');
    $locationProvider.html5Mode(true);
  }

}());
