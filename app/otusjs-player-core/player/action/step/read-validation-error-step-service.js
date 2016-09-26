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
    let _flowData = null;
    let _validationResult = {};

    /* Public methods */
    self.catchPreData = catchPreData;
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function catchPreData(flowData) {
      _flowData = flowData;
    }

    function beforeEffect() {
      console.log('Validation error reading will begin...');
    }

    function effect() {
      console.log('Validation error reading in progress...');

      _validationResult = {};
      _validationResult.hasError = false;

      _flowData.validationResponse.validators.map((validator) => {
        _validationResult[validator.name] = !validator.result;
        if (!validator.result) {
          _validationResult.hasError = true;
        }
      });

      _flowData.validationResult = _validationResult;
    }

    function afterEffect() {
      ActivityFacadeService.attachItemValidationError(_validationResult);
      console.log('Validation error reading is ended.');
    }

    function getEffectResult() {
      return _flowData;
    }
  }
})();
