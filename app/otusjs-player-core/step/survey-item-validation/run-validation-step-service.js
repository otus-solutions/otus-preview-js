(function() {
  'use strict';

  angular
    .module('otusjs.player.core.step')
    .service('otusjs.player.core.step.RunValidationStepService', Service);

  Service.$inject = [
    'otusjs.player.data.activity.ActivityFacadeService',
    'otusjs.player.data.validation.ItemFillingValidatorService'
  ];

  function Service(ActivityFacadeService, ItemFillingValidatorService) {
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
      flowData.validationResponse = {};
      ItemFillingValidatorService.applyValidation(_currentItemService, function(validationResponse) {
        let response = validationResponse[0];
        flowData.validationResponse[response.elementID] = response;
      });
    }

    function afterEffect(pipe, flowData) {}

    function getEffectResult(pipe, flowData) {
      return flowData;
    }
  }
})();
