(function() {
  'use strict';

  angular
    .module('otusjs.player.core.player')
    .service('otusjs.player.core.player.ActionOverflowService', Service);

  Service.$inject = [
    'otusjs.player.core.player.ChainFactory',
    'otusjs.player.core.player.ChainLinkFactory'
  ];

  function Service(ChainFactory, ChainLinkFactory) {
    let self = this;
    let _stepChain = ChainFactory.create();

    /* Public methods */
    self.pipe = pipe;
    self.execute = execute;

    function pipe(step, data) {
      let link = ChainLinkFactory.create();
      link.data = data;
      link.setPreExecute(step.beforeEffect);
      link.setExecute(step.effect);
      link.setPostExecute(step.afterEffect);
      link.setResult(step.getEffectResult);
      _stepChain.chain(link);
    }

    function execute() {
      _stepChain.execute(self);
    }
  }
})();
