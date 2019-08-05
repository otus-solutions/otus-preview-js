(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusSurveyBackCover', {
      templateUrl: 'app/otusjs-player-component/survey-back-cover/survey-back-cover-template.html',
      controller: Controller,
      bindings: {
        onFinalize: '&',
        onStop: '&'
      }
    });

    Controller.$inject = [
      '$scope',
      'otusjs.player.data.activity.ActivityFacadeService'
    ];


  function Controller($scope, ActivityFacadeService) {
    var self = this;

    /* Public methods */
    self.finalize = finalize;
    self.stop = stop;

    /* Public methods */
    self.$onInit = onInit;

    function finalize() {
      self.onFinalize();
    }

    function stop() {
      self.onStop();
    }

    function onInit() {
      $scope.$parent.$ctrl.playerBackCover = self;
      var activity = ActivityFacadeService.getCurrentSurvey().getSurvey();
      self.title = activity.getName();
    }
  }
}());
