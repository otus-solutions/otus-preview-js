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
    let _flowData = null;

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
      console.log('Answer applying will begin...');
    }

    function effect() {
      console.log('Answer applying in progress...');

      ActivityFacadeService.applyAnswer();
    }

    function afterEffect() {
      console.log('Answer applying is ended.');
    }

    function getEffectResult() {
      return _flowData;
    }
  }
})();
