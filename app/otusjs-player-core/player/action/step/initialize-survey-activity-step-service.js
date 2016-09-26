(function() {
  'use strict';

  angular
    .module('otusjs.player.core.player')
    .service('otusjs.player.core.player.InitializeSurveyActivityStepService', Service);

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
      console.log('Survey initialization will begin...');
    }

    function effect() {
      console.log('Survey initialization in progress...');
      ActivityFacadeService.initialize();
    }

    function afterEffect() {
      console.log('Survey initialization is ended.');
    }

    function getEffectResult() {
      return _flowData;
    }
  }
})();
