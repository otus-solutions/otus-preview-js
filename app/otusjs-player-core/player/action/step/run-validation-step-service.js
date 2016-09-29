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
    let _currentItem;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) {
      _currentItem = ActivityFacadeService.getCurrentItem();

      if (_currentItem.shouldIgnoreResponseEvaluation()) {
        pipe.skipStep = true;
      } else {
        pipe.skipStep = false;
      }
    }

    function effect(pipe, flowData) {
      console.log(_currentItem.shouldIgnoreResponseEvaluation());
      let currentItem = _currentItem.getItem();
      ValidationService.validateElement(currentItem.customID, (validationResponse) => {
        flowData.validationResponse = validationResponse[0];
      });
    }

    function afterEffect(pipe, flowData) {

    }

    function getEffectResult(pipe, flowData) {
      return flowData;
    }

    function _parseBool(value) {
      return (value === 'true');
    }
  }
})();
