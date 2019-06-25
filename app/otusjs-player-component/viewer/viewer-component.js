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
    'otusjs.player.data.viewer.SurveyViewFactory'
  ];

  function Controller(
    $compile, $scope, $mdBottomSheet,
    SurveyViewerFactory) {
    var self = this;

    self.$onInit = onInit;
    self.ready = false;
    $scope.filters = {};
    self.filters = $scope.filters;
    self.showFilters = showFilters;
    self.print = print;

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

    function print() {
      window.print();
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
