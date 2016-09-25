(function() {
  'use strict';

  angular
    .module('otusjs.player.core.player')
    .service('otusjs.player.core.player.SetupValidationStepService', Service);

  Service.$inject = [
    'otusjs.player.core.activity.ActivityFacadeService',
    'otusjs.player.core.player.PostAheadActionService',
    'ValidationService'
  ];

  function Service(ActivityFacadeService, PostAheadActionService, ValidationService) {
    let self = this;

    /* Public methods */
    self.beforeValidation = beforeValidation;
    self.validate = validate;
    self.afterValidation = afterValidation;

    function beforeValidation() {
      console.log('Setup validation will begin...');
    }

    function validate() {
      console.log('Setup validation in progress...');

      let itemID = ActivityFacadeService.getCurrentItem().customID;
      let fillingRules = ActivityFacadeService.getCurrentItem().fillingRules.options;
      let elementRegister = ElementRegisterFactory.create(itemID, { data: {} });

      Object.keys(fillingRules).map((validator) => {
        let reference = fillingRules[validator].data;
        elementRegister.addValidator(validator, reference);
      });

      ValidationService.registerElement(elementRegister);
    }

    function afterValidation(response) {
      console.log('Setup validation is ended.');
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
