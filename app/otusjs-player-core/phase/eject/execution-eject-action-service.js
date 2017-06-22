(function() {
  'use strict';

  angular
    .module('otusjs.player.core.phase')
    .service('otusjs.player.core.phase.ExecutionEjectActionService', Service);

  Service.$inject = [
    'otusjs.player.core.scaffold.ChainFactory',
    'otusjs.player.core.scaffold.ChainLinkFactory'
  ];

  function Service(ChainFactory, ChainLinkFactory) {
    var self = this;
    var _stepChain = ChainFactory.create();

    self.isFlowing = true;

    /* Public methods */
    self.pipe = pipe;
    self.execute = execute;
    self.stopFlow = stopFlow;

    function pipe(step) {
      var link = ChainLinkFactory.create();
      link.setPreExecute(step.beforeEffect);
      link.setExecute(step.effect);
      link.setPostExecute(step.afterEffect);
      link.setResult(step.getEffectResult);
      _stepChain.chain(link);
    }

    function execute(phaseData) {
      if (phaseData.pipe.isFlowing) {
        self.isFlowing = phaseData.pipe.isFlowing;
        self.flowData = phaseData.flowData;
        return _stepChain.execute(self, self.flowData);
      } else {
        return phaseData;
      }
    }

    function stopFlow() {
      self.isFlowing = false;
    }
  }
})();
