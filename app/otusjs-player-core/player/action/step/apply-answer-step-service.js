(function() {
  'use strict';

  angular
    .module('otusjs.player.core.player')
    .service('otusjs.player.core.player.ApplyAnswerStepService', Service);

  Service.$inject = [
    'otusjs.player.core.activity.ActivityFacadeService'
  ];

  function Service(ActivityFacadeService) {
    let self = this;
    let _currentItem;

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
      flowData.answerToEvaluate.data = _currentItem.getFilling().answer.value || {};
    }

    function afterEffect(pipe, flowData) {
    }

    function getEffectResult(pipe, flowData) {
      return flowData;
    }
  }
})();
