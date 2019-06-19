(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusViewer', {
      templateUrl: 'app/otusjs-player-component/viewer/viewer-template.html',
      controller: 'otusViewerCtrl as $ctrl'
    }).controller('otusViewerCtrl', Controller);

  Controller.$inject = [
    '$compile',
    '$scope',
    '$mdBottomSheet',
    'otusjs.player.data.viewer.SurveyViewFactory',
    'otusjs.player.core.player.PlayerService'
  ];

  function Controller(
    $compile, $scope, $mdBottomSheet,
    SurveyViewerFactory, PlayerService) {
    var self = this;

    self.$onInit = onInit;
    self.ready = false;
    self.showFilters = showFilters;

    $scope.filters = {};
    self.filters = $scope.filters;

    /* Public methods */
    self.exit = exit;
    $scope.exit = exit;


    function onInit() {
      self.activityData = SurveyViewerFactory.create();
      self.ready = true;
      compileFilters();
    }


    function compileFilters() {
      let template = '<otus-viewer-filters filters=$ctrl.filters></otus-viewer-filters>';
      self.filterComponent = $compile(template)($scope.$new());
    }

    function showFilters() {
      $mdBottomSheet.show({
        templateUrl: 'app/otusjs-player-component/viewer/filters/viewer-filters-template.html',
        locals: {
          filters: self.filters
        },
        parent: angular.element(document.body),
        controller: BottomSheetController
      }).then(function (clickedItem) {
      }).catch(function (error) {
      });
    }


    function exit() {
      window.history.back();
    }


    function BottomSheetController($scope, filters) {
      $scope.filters = filters;
    }


  }
}());
