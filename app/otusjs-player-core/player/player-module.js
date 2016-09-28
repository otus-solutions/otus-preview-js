(function() {
  'use strict';

  angular
    .module('otusjs.player.core.player', [])
    .run([
      'otusjs.player.core.player.PlayerConfigurationService',
      'otusjs.player.core.player.ApplyAnswerStepService',
      'otusjs.player.core.player.InitializeSurveyActivityStepService',
      'otusjs.player.core.player.LoadItemStepService',
      'otusjs.player.core.player.ReadValidationErrorStepService',
      'otusjs.player.core.player.RunValidationStepService',
      'otusjs.player.core.player.SetupValidationStepService',
      run
    ]);

    function run(PlayerConfigurationService, ApplyAnswer, InitializeSurveyActivity, LoadItem, ReadValidationError, RunValidation, SetupValidation) {
      /**************************************************************
       * Play Phase
       *
       * Here we put the configurations that will affect the phase
       * where the player is starting the SurveyActiviy.
       * This phase is divided in three sub-phases and each one can be
       * configured separately.
       *
       **************************************************************/
      /* PrePlat Phase */
      // PlayerConfigurationService.onPrePlay();

      /* ExecutionPlay Phase */
      PlayerConfigurationService.onPlay(InitializeSurveyActivity);
      PlayerConfigurationService.onPlay(LoadItem);

      /* PostPlay Phase */
      PlayerConfigurationService.onPostPlay(SetupValidation);

      /**************************************************************
       * Ahead Phase
       *
       * Here we put the configurations that will affect the phase
       * where the player is moving to the next item of SurveyActiviy.
       * This phase is divided in three sub-phases and each one can be
       * configured separately.
       *
       **************************************************************/
      /* PreAhead Phase */
      PlayerConfigurationService.onPreAhead(RunValidation);
      PlayerConfigurationService.onPreAhead(ReadValidationError);

      /* ExecutionAhead Phase */
      PlayerConfigurationService.onAhead(ApplyAnswer);

      /* PostAhead Phase */
      PlayerConfigurationService.onPostAhead(LoadItem);
      PlayerConfigurationService.onPostAhead(SetupValidation);
    }

}());
