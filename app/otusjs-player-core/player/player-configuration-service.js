(function() {
  'use strict';

  angular
    .module('otusjs.player.core.player')
    .service('otusjs.player.core.player.PlayerConfigurationService', Service);

  Service.$inject = [
    'otusjs.player.core.phase.PlayerStartActionService',
    'otusjs.player.core.phase.PlayActionService',
    'otusjs.player.core.phase.AheadActionService',
    'otusjs.player.core.phase.BackActionService',
    'otusjs.player.core.phase.EjectActionService',
    'otusjs.player.core.phase.SaveActionService',
    'otusjs.player.core.phase.StopActionService'
  ];

  function Service(PlayerStartActionService, PlayActionService, AheadActionService, BackActionService, EjectActionService, SaveActionService, StopActionService) {
    var self = this;

    /* Public methods */
    self.onPrePlayerStart = onPrePlayerStart;
    self.onPlayerStart = onPlayerStart;
    self.onPostPlayerStart = onPostPlayerStart;
    self.onPrePlay = onPrePlay;
    self.onPlay = onPlay;
    self.onPostPlay = onPostPlay;
    self.onPreAhead = onPreAhead;
    self.onAhead = onAhead;
    self.onPostAhead = onPostAhead;
    self.onPreBack = onPreBack;
    self.onBack = onBack;
    self.onPostBack = onPostBack;
    self.onPreEject = onPreEject;
    self.onEject = onEject;
    self.onPostEject = onPostEject;
    self.onPreSave = onPreSave;
    self.onSave = onSave;
    self.onPostSave = onPostSave;
    self.onPreStop = onPreStop;
    self.onStop = onStop;
    self.onPostStop = onPostStop;

    function onPrePlayerStart(step) {
      PlayerStartActionService.PrePlayerStartActionService.pipe(step);
    }

    function onPlayerStart(step) {
      PlayerStartActionService.ExecutionPlayerStartActionService.pipe(step);
    }

    function onPostPlayerStart(step) {
      PlayerStartActionService.PostPlayerStartActionService.pipe(step);
    }

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

    function onPreEject(step) {
      EjectActionService.PreEjectActionService.pipe(step);
    }

    function onEject(step) {
      EjectActionService.ExecutionEjectActionService.pipe(step);
    }

    function onPostEject(step) {
      EjectActionService.PostEjectActionService.pipe(step);
    }

    function onPreSave(step) {
      SaveActionService.PreSaveActionService.pipe(step);
    }

    function onSave(step) {
      SaveActionService.ExecutionSaveActionService.pipe(step);
    }

    function onPostSave(step) {
      SaveActionService.PostSaveActionService.pipe(step);
    }

    function onPreStop(step) {
      StopActionService.PreStopActionService.pipe(step);
    }

    function onStop(step) {
      StopActionService.ExecutionStopActionService.pipe(step);
    }

    function onPostStop(step) {
      StopActionService.PostStopActionService.pipe(step);
    }
  }
})();
