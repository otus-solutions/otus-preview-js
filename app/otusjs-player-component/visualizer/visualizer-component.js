(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusVisualizer', {
      templateUrl: 'app/otusjs-player-component/visualizer/visualizer-template.html',
      controller: Controller
    });

  Controller.$inject = [
    'otusjs.player.data.visualization.SurveyItemVisualizationFactory'
  ];

  function Controller(SurveyItemVisualizationFactory) {
    var SURVEY_ITEM = '<otus-survey-item item-data="itemData" />';
    var self = this;

    self.$onInit = onInit;
    self.ready = false;

    /* Public methods */


    function onInit() {
      self.activityData = SurveyItemVisualizationFactory.create();
      self.ready = true;
    }
  }
}());
