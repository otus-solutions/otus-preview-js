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
    'otusjs.player.data.viewer.SurveyViewFactory',
    'otusjs.player.core.player.PlayerService'
  ];

  function Controller($compile, $scope, SurveyViewerFactory, PlayerService) {
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

      $scope.filters = self.filters;
      let template = '<otus-viewer-filters ></otus-viewer-filters>';
      let elem = $compile(template)($scope);
      console.log(elem);
    }

    function exit() {
      PlayerService.stop();
    }

    var prevScrollpos = window.pageYOffset;

    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById('viewer-header').style.top = '0';
      } else {
        document.getElementById('viewer-header').style.top = '-50px';
      }
      prevScrollpos = currentScrollPos;
    };

  }
}());
