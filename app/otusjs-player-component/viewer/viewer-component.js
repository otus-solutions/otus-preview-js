(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusViewer', {
      templateUrl: 'app/otusjs-player-component/viewer/viewer-template.html',
      controller: Controller
    });

  Controller.$inject = [
    'otusjs.player.data.viewer.SurveyViewFactory',
    'otusjs.player.core.player.PlayerService'
  ];

  function Controller(SurveyViewerFactory, PlayerService) {
    var SURVEY_ITEM = '<otus-survey-item item-data="itemData" />';
    var self = this;

    self.$onInit = onInit;
    self.ready = false;

    /* Public methods */
    self.exit = exit;

    function onInit() {
      self.activityData = SurveyViewerFactory.create();
      console.log(self);
      self.ready = true;
    }

    function exit() {
      PlayerService.stop();
    }

    self.filters = {};
  }
}());

(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusViewerFilters', {
      templateUrl: 'app/otusjs-player-component/viewer/viewer-filters-template.html',
      controller: Controller,
      bindings: {
        filters: '='
      }
    });

  function Controller() {
    var self = this;
    self.$onInit = onInit;

    function onInit() {
      console.log(self.filters);
    }
  }
}());
