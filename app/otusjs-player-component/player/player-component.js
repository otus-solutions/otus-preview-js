(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusPlayer', {
      templateUrl: 'app/otusjs-player-component/player/player-template.html',
      controller: Controller,
      bindings: {
        surveyActivity: '<'
      }
    });

  Controller.$inject = [
    'otusjs.player.core.player.PlayerService'
  ];

  function Controller(PlayerService) {
    let SURVEY_ITEM = '<otus-survey-item item-data="itemData" />';
    let self = this;
    self.identity = {};

    /* Public methods */
    self.catchMouseWheel = catchMouseWheel;
    self.$onInit = onInit;

    function catchMouseWheel($event) {
      if (event.deltaY > 0) {
        // goAhead();
      } else {
        // goBack();
      }
    }

    function onInit() {
      self.identity = self.surveyActivity.template.identity;
      PlayerService.setup();
    }
  }
}());
