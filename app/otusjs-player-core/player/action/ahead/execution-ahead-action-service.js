(function() {
  'use strict';

  angular
    .module('otusjs.player.core.player')
    .service('otusjs.player.core.player.ExecutionAheadActionService', Service);

  Service.$inject = [
    'otusjs.player.core.player.ChainFactory'
  ];

  function Service(ChainFactory) {
    let self = this;
    let _stepChain = ChainFactory.create();

    /* Public methods */
    self.pipe = pipe;
    self.execute = execute;

    function pipe(step) {
      let link = ChainLinkFactory.create();
      link.setPreExecute(step.pre);
      link.setExecute(step.execution);
      link.setPostExecute(step.post);
      _stepChain.chain(link);
    }

    function execute() {
      _stepChain.execute();
    }
  }
})();
