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
    var _currentItemService;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) {
      _currentItemService = ActivityFacadeService.getCurrentItem();

      if (_currentItemService.shouldIgnoreResponseEvaluation()) {
        pipe.skipStep = true;
      } else {
        pipe.skipStep = false;
      }
    }

    function effect(pipe, flowData) {
      console.log('handle');
      console.log(flowData);
      ActivityFacadeService.attachItemValidationError(flowData.validationResult);
    }

    function afterEffect(pipe, flowData) {
      console.log(flowData);
      for (var itemID in flowData.validationResult){
        if (flowData.validationResult[itemID].hasError) {
          pipe.isFlowing = false;
        }
      }
      // if (flowData.validationResult.hasError) {
      //   pipe.isFlowing = false;
      // }
      // delete flowData.validationResult;
    }

    function getEffectResult(pipe, flowData) {
      return flowData;
    }
  }
})();
