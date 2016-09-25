(function() {
  'use strict';

  angular
    .module('otusjs.player.core.player')
    .service('otusjs.player.core.player.RunValidationStepService', Service);

  Service.$inject = [
    'otusjs.player.core.activity.ActivityFacadeService',
    'otusjs.player.core.player.PreAheadActionService',
    'ValidationService'
  ];

  function Service(ActivityFacadeService, PreAheadActionService, ValidationService) {
    let self = this;

    /* Public methods */
    self.beforeValidation = beforeValidation;
    self.validate = validate;
    self.afterValidation = afterValidation;

    function beforeValidation() {
      console.log('Validation will begin...');
    }

    function validate() {
      console.log('Validation in progress...');
      let itemID = ActivityFacadeService.getCurrentItem().customID;
      ValidationService.validateElement(itemID, afterValidation);
    }

    function afterValidation(response) {
      let validationAnswer = {};
      let validationResult = null;

      response[0].validatorsResponse.map((ValidatorResponse) => {
        self.validationAnswer[ValidatorResponse.name] = !ValidatorResponse.result;
      });

      console.log('Validation is ended.');
    }

    //------------------------------------------
    // Use the player step framework
    //------------------------------------------
    let step = {};
    step.pre = beforeValidation;
    step.execution = validate;
    step.post = afterValidation;
    PreAheadActionService.pipe(step);
  }
})();
