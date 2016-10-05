(function() {
  'use strict';

  angular
    .module('otusjs.player.core.player')
    .service('otusjs.player.core.player.PlayerConfigurationService', Service);

  Service.$inject = [
    'otusjs.player.core.phase.PlayActionService',
    'otusjs.player.core.phase.AheadActionService',
    'otusjs.player.core.phase.BackActionService'
  ];

  function Service(PlayActionService, AheadActionService, BackActionService) {
    var self = this;

    /* Public methods */
    self.onPrePlay = onPrePlay;
    self.onPlay = onPlay;
    self.onPostPlay = onPostPlay;
    self.onPreAhead = onPreAhead;
    self.onAhead = onAhead;
    self.onPostAhead = onPostAhead;
    self.onPreBack = onPreBack;
    self.onBack = onBack;
    self.onPostBack = onPostBack;

    function onPrePlay(step) {
      PlayActionService.PrePlayActionService.pipe(step);
    }

    function onPlay(step) {
      PlayActionService.ExecutionPlayActionService.pipe(step);
    }

    function onPostPlay(step) {
      PlayActionService.PostPlayActionService.pipe(step);
    }

    function onPreAhead(step) {
      AheadActionService.PreAheadActionService.pipe(step);
    }

    function onAhead(step) {
      AheadActionService.ExecutionAheadActionService.pipe(step);
    }

    function onPostAhead(step) {
      AheadActionService.PostAheadActionService.pipe(step);
    }

    function onPreBack(step) {
      BackActionService.PreBackActionService.pipe(step);
    }

    function onBack(step) {
      BackActionService.ExecutionBackActionService.pipe(step);
    }

    function onPostBack(step) {
      BackActionService.PostBackActionService.pipe(step);
    }
  }
})();
