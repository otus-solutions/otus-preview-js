(function() {
  'use strict';

  angular
    .module('otusjs.player.core.step')
    .service('otusjs.player.core.step.ApplyAnswerStepService', Service);

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

      if (!_currentItem.shouldApplyAnswer()) {
        pipe.skipStep = true;
      } else {
        pipe.skipStep = false;
      }

      pipe.isFlowing = true;
    }

    function effect(pipe, flowData) {
      ActivityFacadeService.applyAnswer();
      flowData.answerToEvaluate.data = _ensureTestableValue(_currentItem.getFilling().answer);
      flowData.metadataToEvaluate.data = _ensureTestableValue(_currentItem.getFilling().metadata);
    }

    function afterEffect(pipe, flowData) { }

    function getEffectResult(pipe, flowData) {
      return flowData;
    }

    function _isTestableValue(value) {
      if (value !== null && value !== undefined ) {
        return true;
      } else {
        return false;
      }
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
