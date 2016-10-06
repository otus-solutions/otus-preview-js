(function() {
  'use strict';

  angular
    .module('otusjs.player.core.step')
    .service('otusjs.player.core.step.ReadValidationErrorStepService', Service);

  function Service() {
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

      flowData.validationResponse.validatorsResponse.map((validator) => {
        _validationResult[validator.name] = !validator.result;
        validator.result = validator.result;
        if (!validator.result) {
          _validationResult.hasError = true
        }
      });

      // delete flowData.validationResponse;
      flowData.validationResult = _validationResult;
    }

    function afterEffect(pipe, flowData) {
    }

    function getEffectResult(pipe, flowData) {
      return flowData;
    }
  }
})();
