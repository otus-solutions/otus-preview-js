(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusViewer', {
      templateUrl: 'app/otusjs-player-component/viewer/viewer-template.html',
      controller: Controller
    });

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
    self.filters = {};
    self.showFilters = false;

    /* Public methods */
    self.exit = exit;


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
        template: self.filterComponent[0].innerHTML,
        controller: 'otusViewFiltersController'
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


  }
}());
