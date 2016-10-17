(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusSurveyBackCover', {
      templateUrl: 'app/otusjs-player-component/survey-back-cover/survey-back-cover-template.html',
      controller: Controller
    });

    Controller.$inject = [
      '$scope',
      'otusjs.player.data.activity.ActivityFacadeService'
    ];


  function Controller($scope, ActivityFacadeService) {
    var self = this;

    /* Public methods */
    self.$onInit = onInit;

    function onInit() {
      $scope.$parent.$ctrl.playerBackCover = self;
      var activity = ActivityFacadeService.getCurrentSurvey().getSurvey();
      self.title = activity.template.identity.name;
    }
  }
}());
