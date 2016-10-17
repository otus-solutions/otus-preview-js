(function() {
  'use strict';

  angular
    .module('otusjs.player.core.step')
    .service('otusjs.player.core.step.ReadValidationErrorStepService', Service);

  function Service() {
    var self = this;
    var _validationResult = {};

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) { }

    function effect(pipe, flowData) {
      var mandatoryResults = [];
      var otherResults = [];
      flowData.validationResult = {};

      flowData.validationResponse.validatorsResponse.map((validator) => {
        if (validator.name === 'mandatory' || validator.data.reference) {
          flowData.validationResult[validator.name] = !validator.result && (angular.equals(flowData.metadataToEvaluate.data, {}));
        } else {
          flowData.validationResult[validator.name] = !validator.result;
        }
      });

      flowData.validationResult.hasError = _hasError(flowData);
    }

    function afterEffect(pipe, flowData) { }

    function getEffectResult(pipe, flowData) {
      return flowData;
    }

    function _hasError(flowData) {
      return Object.keys(flowData.validationResult).some((validator) => {
        return flowData.validationResult[validator];
      });
    }
  }
})();
