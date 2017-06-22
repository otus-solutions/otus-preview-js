(function() {
  'use strict';

  angular
    .module('otusjs.player.core.step')
    .service('otusjs.player.core.step.HandleValidationErrorStepService', Service);

  Service.$inject = [
    'otusjs.player.data.activity.ActivityFacadeService'
  ];

  function Service(ActivityFacadeService) {
    var self = this;
    var _currentItem;

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
      ActivityFacadeService.attachItemValidationError(flowData.validationResult);
    }

    function afterEffect(pipe, flowData) {
      if (flowData.validationResult.hasError) {
        pipe.isFlowing = false;
      }
      // delete flowData.validationResult;
    }

    function getEffectResult(pipe, flowData) {
      return flowData;
    }
  }
})();
