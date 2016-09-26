(function() {
  'use strict';

  angular
    .module('otusjs.player.core.player')
    .service('otusjs.player.core.player.RunValidationStepService', Service);

  Service.$inject = [
    'otusjs.player.core.activity.ActivityFacadeService',
    'otusjs.player.core.player.ActionOverflowService',
    'otusjs.player.core.player.ReadValidationErrorStepService',
    'ValidationService',
  ];

  function Service(ActivityFacadeService, ActionOverflowService, ReadValidationErrorStepService, ValidationService) {
    let self = this;
    let _flowData = null;
    let _validationResponse = null;

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
      console.log('Validation will begin...');
    }

    function effect() {
      console.log('Validation in progress...');

      let currentItem = ActivityFacadeService.getCurrentItem();
      ValidationService.validateElement(currentItem.customID, _keepValidationResponse);
    }

    function afterEffect() {
      _validationResponse.validatorsResponse.some((validator) => {
        validator.result = _parseBool(validator.result);
        if (!validator.result) {
          ActionOverflowService.pipe(ReadValidationErrorStepService, _validationResponse);
          ActionOverflowService.execute();
          return true;
        }
      });

      console.log('Validation is ended.');
    }

    function getEffectResult() {
      return _flowData;
    }

    function _keepValidationResponse(response) {
      _validationResponse = response[0];
    }

    function _parseBool(value) {
      return (value === 'true');
    }
  }
})();
