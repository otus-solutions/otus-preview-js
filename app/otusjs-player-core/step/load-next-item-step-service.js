(function() {
  'use strict';

  angular
    .module('otusjs.player.core.step')
    .service('otusjs.player.core.step.LoadNextItemStepService', Service);

  Service.$inject = [
    'otusjs.player.data.navigation.NavigationService'
  ];

  function Service(NavigationService) {
    let self = this;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) {

    }

    function effect(pipe, flowData) {
      NavigationService.loadNextItem();
      flowData.answerToEvaluate = {};
      flowData.answerToEvaluate.data = {};
    }

    function afterEffect(pipe, flowData) {}

    function getEffectResult(pipe, flowData) {
      return flowData;
    }
  }
})();
