(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusViewer', {
      templateUrl: 'app/otusjs-player-component/visualizer/viewer-template.html',
      controller: Controller
    });

  Controller.$inject = [
    'otusjs.player.data.viewer.SurveyViewerFactory'
  ];

  function Controller(SurveyViewerFactory) {
    var SURVEY_ITEM = '<otus-survey-item item-data="itemData" />';
    var self = this;

    self.$onInit = onInit;
    self.ready = false;

    /* Public methods */


    function onInit() {
      self.activityData = SurveyViewerFactory.create();
      console.log(self);
      self.ready = true;
    }
  }
}());
