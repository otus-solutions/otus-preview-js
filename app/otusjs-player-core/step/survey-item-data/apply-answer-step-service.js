(function () {
  'use strict';

  angular
    .module('otusjs.player.core.step')
    .service('otusjs.player.core.step.ApplyAnswerStepService', Service);

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

      if (!_currentItemService.shouldApplyAnswer()) {
        pipe.skipStep = true;
      } else {
        pipe.skipStep = false;
      }

      pipe.isFlowing = true;
    }

    function effect(pipe, flowData) {
      let fillingContainer = _currentItemService.getFillingContainer();

      ActivityFacadeService.applyAnswer();

      Object.keys(fillingContainer).forEach(templateID => {
        flowData.answerToEvaluate[templateID].data = _ensureTestableValue(fillingContainer[templateID].answer);
        flowData.metadataToEvaluate[templateID].data = _ensureTestableValue(fillingContainer[templateID].metadata);
      });

      console.log(flowData);
    }

    function afterEffect(pipe, flowData) {
    }

    function getEffectResult(pipe, flowData) {
      return flowData;
    }

    function _isTestableValue(value) {
      return value !== null && value !== undefined;
    }

    function _ensureTestableValue(filling) {
      if (_isTestableValue(filling.value)) {
        return filling.value;
      } else {
        return {};
      }
    }
  }
})();
