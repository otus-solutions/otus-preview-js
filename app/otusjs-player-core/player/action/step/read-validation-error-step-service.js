(function() {
  'use strict';

  angular
    .module('otusjs.player.core.player')
    .service('otusjs.player.core.player.ReadValidationErrorStepService', Service);

  Service.$inject = [
    'otusjs.player.core.activity.ActivityFacadeService'
  ];

  function Service(ActivityFacadeService) {
    let self = this;
    let _validationResult = {};

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) {
    }

    function effect(pipe, flowData) {
      _validationResult = {};
      _validationResult.hasError = false;

      console.log(flowData);

      // flowData.validationResponse.validatorsResponse.some((validator) => {
      //   validator.result = _parseBool(validator.result);
      //   if (!validator.result) {
      //     return true;
      //   }
      // });


      // flowData.validationResponse.validators.map((validator) => {
      //   _validationResult[validator.name] = !validator.result;
      //   if (!validator.result) {
      //     _validationResult.hasError = true;
      //   }
      // });

      flowData.validationResult = _validationResult;
    }

    function afterEffect(pipe, flowData) {
      ActivityFacadeService.attachItemValidationError(_validationResult);
    }

    function getEffectResult(pipe, flowData) {
      return flowData;
    }
  }
})();
