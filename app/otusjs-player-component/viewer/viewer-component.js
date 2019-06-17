(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusViewer', {
      templateUrl: 'app/otusjs-player-component/viewer/viewer-template.html',
      controller: 'otusViewerCtrl as $ctrl'
    }).controller("otusViewerCtrl", Controller);

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
    $scope.filters = {};
    self.filters = $scope.filters;
    self.showFilters = false;

    /* Public methods */
    self.exit = exit;
    $scope.exit = exit;


    function onInit() {
      self.activityData = SurveyViewerFactory.create();
      self.ready = true;
      compile();
    }


    function compile() {
      let template = '<otus-viewer-filters filters=$ctrl.filters></otus-viewer-filters>';
      self.filterComponent = $compile(template)($scope.$new());
    }

    self.showListBottomSheet = function() {
      $mdBottomSheet.show({
        templateUrl: 'app/otusjs-player-component/viewer/filters/viewer-filters-template.html',
        locals:{
          filters: self.filters
        },
        parent: angular.element(document.body),
        controller: BottomSheetController
      }).then(function(clickedItem) {
        console.log(clickedItem);
      }).catch(function(error) {
        // User clicked outside or hit escape
        console.log(error);
      });
    };


    function exit() {
      PlayerService.stop();
    }
    
    
    function BottomSheetController($scope, filters) {

      $scope.filters = filters;
    }


  }
}());
