(function() {
  'use strict';

  angular
    .module('otusjs.player.core.player')
    .service('otusjs.player.core.player.AheadActionService', Service);

  Service.$inject = [
    'otusjs.player.core.player.ActionPipeService',
    'otusjs.player.core.player.PreAheadActionService',
    'otusjs.player.core.player.ExecutionAheadActionService',
    'otusjs.player.core.player.PostAheadActionService'
  ];

  function Service(ActionPipeService, PreAheadActionService, ExecutionAheadActionService, PostAheadActionService) {
    let self = this;

    /* Public methods */
    self.PreAheadActionService = PreAheadActionService;
    self.ExecutionAheadActionService = ExecutionAheadActionService;
    self.PostAheadActionService = PostAheadActionService;
    self.execute = execute;

    function execute() {
      let phaseData = PreAheadActionService.execute(ActionPipeService.flowData);
      phaseData = ExecutionAheadActionService.execute(phaseData);
      phaseData = PostAheadActionService.execute(phaseData);
    }
  }
})();
