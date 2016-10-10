(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusSurveyHeader', {
      templateUrl: 'app/otusjs-player-component/survey-header/survey-header-template.html',
      controller: Controller,
      bindings: {
        surveyIdentity: '<'
      }
    });

  Controller.$inject = [
    'otusjs.player.data.activity.ActivityFacadeService'
  ];

  function Controller(ActivityFacadeService) {
    var self = this;

    /* Public methods */
    self.$onInit = onInit;

    function onInit() {
      let activity = ActivityFacadeService.getCurrentSurvey().getSurvey();
      self.title = activity.template.identity.name;
      self.surveyIdentity = activity.template.identity;
    }
  }
}());
