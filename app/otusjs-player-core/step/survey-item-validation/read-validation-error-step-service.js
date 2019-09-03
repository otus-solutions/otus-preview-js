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
    var _currentItem;
    var _validationResult = {};

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
      var mandatoryResults = [];
      var otherResults = [];
      flowData.validationResult = {};
      _currentItem.getItems().forEach(function (surveyItem) {
        if (surveyItem.isQuestion()) {
          flowData.validationResponse.validatorsResponse.map(function(validator) {
            if (validator.name === 'mandatory' || validator.data.reference) {
              flowData.validationResult[validator.name] = !validator.result && (angular.equals(flowData.metadataToEvaluate.data, {}));
            } else {
              flowData.validationResult[validator.name] = !validator.result;
            }
          });
        }
        flowData.validationResult.hasError = _hasError(flowData);
      });
    }

    function afterEffect(pipe, flowData) {}

    function getEffectResult(pipe, flowData) {
      return flowData;
    }

    function _hasError(flowData) {
      return Object.keys(flowData.validationResult).some(function(validator) {
        return flowData.validationResult[validator];
      });
    }
  }
})();
