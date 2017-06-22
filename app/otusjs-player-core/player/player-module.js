(function() {
  'use strict';

  angular
    .module('otusjs.player.core.player', [])
    .run([
      'otusjs.player.core.player.PlayerConfigurationService',
      'otusjs.player.core.step.ApplyAnswerStepService',
      'otusjs.player.core.step.ClearSkippedAnswersStepService',
      'otusjs.player.core.step.InitializeSurveyActivityStepService',
      'otusjs.player.core.step.FinalizeSurveyActivityStepService',
      'otusjs.player.core.step.SaveSurveyActivityStepService',
      'otusjs.player.core.step.LoadPreviousItemStepService',
      'otusjs.player.core.step.LoadNextItemStepService',
      'otusjs.player.core.step.UpdateItemTrackingStepService',
      'otusjs.player.core.step.LoadSurveyActivityStepService',
      'otusjs.player.core.step.LoadSurveyActivityCoverStepService',
      'otusjs.player.core.step.ReadValidationErrorStepService',
      'otusjs.player.core.step.RunValidationStepService',
      'otusjs.player.core.step.SetupValidationStepService',
      'otusjs.player.core.step.HandleValidationErrorStepService',
      run
    ]);

    function run(
      PlayerConfigurationService,
      ApplyAnswer,
      ClearSkippedAnswersStepService,
      InitializeSurveyActivity,
      FinalizeSurveyActivity,
      SaveSurveyActivity,
      LoadPreviousItem,
      LoadNextItem,
      UpdateItemTracking,
      LoadSurveyActivity,
      LoadSurveyActivityCover,
      ReadValidationError,
      RunValidation,
      SetupValidation,
      HandleValidationError) {

      /**************************************************************
       * Player Start Phase
       *
       * Here we put the configurations that will affect the phase
       * where the player is itself starting.
       * This phase is divided in three sub-phases and each one can be
       * configured separately.
       *
       **************************************************************/
      /* PreStart Phase */
      // PlayerConfigurationService.onPrePlayerStart();

      /* ExecutionStart Phase */
      PlayerConfigurationService.onPlayerStart(LoadSurveyActivity);

      /* PostStart Phase */
      // PlayerConfigurationService.onPostPlayerStart(LoadSurveyActivityCover);

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

      /* PostPlay Phase */
      PlayerConfigurationService.onPostPlay(LoadNextItem);
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
      PlayerConfigurationService.onPreAhead(ApplyAnswer);
      PlayerConfigurationService.onPreAhead(RunValidation);
      PlayerConfigurationService.onPreAhead(ReadValidationError);
      PlayerConfigurationService.onPreAhead(HandleValidationError);
      PlayerConfigurationService.onPreAhead(UpdateItemTracking);

      /* ExecutionAhead Phase */
      PlayerConfigurationService.onAhead(LoadNextItem);

      /* PostAhead Phase */
      PlayerConfigurationService.onPostAhead(SetupValidation);

      /**************************************************************
       * Back Phase
       *
       * Here we put the configurations that will affect the phase
       * where the player is moving to the previous item of
       * SurveyActiviy.
       * This phase is divided in three sub-phases and each one can be
       * configured separately.
       *
       **************************************************************/
      /* PreBack Phase */
      // PlayerConfigurationService.onPreBack();

      /* ExecutionBack Phase */
      PlayerConfigurationService.onBack(LoadPreviousItem);

      /* PostBack Phase */
      PlayerConfigurationService.onPostBack(SetupValidation);

      /**************************************************************
       * Save Phase
       *
       * Here we put the configurations that will affect the phase
       * where the player is saving the current state of SurveyActiviy.
       * This phase is divided in three sub-phases and each one can be
       * configured separately.
       *
       **************************************************************/
      /* PreSave Phase */
      PlayerConfigurationService.onPreSave(ApplyAnswer);
      // PlayerConfigurationService.onPreSave(UpdateItemTracking);

      /* ExecutionSave Phase */
      PlayerConfigurationService.onSave(SaveSurveyActivity);

      /* PostSave Phase */

      /**************************************************************
       * Stop Phase
       *
       * Here we put the configurations that will affect the phase
       * where the player is stoping the current SurveyActiviy.
       * This phase is divided in three sub-phases and each one can be
       * configured separately.
       *
       **************************************************************/
      /* PreBack Phase */

      /* ExecutionStop Phase */

      /* PostStop Phase */

      /**************************************************************
       * Eject Phase
       *
       * Here we put the configurations that will affect the phase
       * where the player is ejecting (finalizing) the current
       * SurveyActiviy.
       * This phase is divided in three sub-phases and each one can be
       * configured separately.
       *
       **************************************************************/
      /* PreBack Phase */

      /* ExecutionStop Phase */
      PlayerConfigurationService.onEject(ClearSkippedAnswersStepService);
      PlayerConfigurationService.onEject(FinalizeSurveyActivity);

      /* PostStop Phase */
    }
}());
