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
      self.activity = ActivityFacadeService.getCurrentSurvey().getSurvey();
      self.surveyIdentity = self.activity.surveyForm.surveyTemplate.identity;
      self.participantData = self.activity.participantData;

      if (self.activity.interviews.length) {
        self.interviewer = self.activity.interviews[self.activity.interviews.length - 1].interviewer;
        self.interviewer.fullname = self.interviewer.getFullname();
      }
    }
  }
}());
