(function() {
  'use strict';

  angular
    .module('otusjs.player.core.player')
    .service('otusjs.player.core.player.PlayActionService', Service);

  Service.$inject = [
    'otusjs.player.core.player.ActionPipeService',
    'otusjs.player.core.player.PrePlayActionService',
    'otusjs.player.core.player.ExecutionPlayActionService',
    'otusjs.player.core.player.PostPlayActionService'
  ];

  function Service(ActionPipeService, PrePlayActionService, ExecutionPlayActionService, PostPlayActionService) {
    let self = this;

    /* Public methods */
    self.PrePlayActionService = PrePlayActionService;
    self.ExecutionPlayActionService = ExecutionPlayActionService;
    self.PostPlayActionService = PostPlayActionService;
    self.execute = execute;

    function execute() {
      let phaseData = PrePlayActionService.execute(ActionPipeService.flowData);
      phaseData = ExecutionPlayActionService.execute(phaseData);
      phaseData = PostPlayActionService.execute(phaseData);
    }
  }
})();
