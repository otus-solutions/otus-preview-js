(function() {
  'use strict';

  angular
    .module('otusjs.player.core.step')
    .service('otusjs.player.core.step.ReadValidationErrorStepService', Service);

  Service.$inject = [
    'otusjs.player.data.activity.ActivityFacadeService'
  ];

  function Service(ActivityFacadeService) {
    var self = this;
    var _currentItemService;
    var _validationResult = {};

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
      flowData.validationResult = {};
      _currentItemService.getItems().forEach(function (surveyItem) {
        let templateID = surveyItem.templateID;

        if (surveyItem.isQuestion()) {
          flowData.validationResult[templateID] = {};
          flowData.validationResponse[templateID].validatorsResponse.forEach(function(validator) {
            if (validator.name === 'mandatory' || validator.data.reference) {
              flowData.validationResult[templateID][validator.name] = !validator.result && (angular.equals(flowData.metadataToEvaluate[templateID].data, {}));
            } else {
              flowData.validationResult[templateID][validator.name] = !validator.result;
            }
          });
          flowData.validationResult[templateID].hasError = _hasError(flowData, templateID);
        }
      });
    }

    function afterEffect(pipe, flowData) {}

    function getEffectResult(pipe, flowData) {
      return flowData;
    }

    function _hasError(flowData, templateID) {
      return Object.keys(flowData.validationResult[templateID]).some(function(validator) {
        return flowData.validationResult[templateID][validator];
      });
    }
  }
})();
