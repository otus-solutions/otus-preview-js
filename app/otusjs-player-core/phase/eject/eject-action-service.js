(function() {
  'use strict';

  angular
    .module('otusjs.player.core.phase')
    .service('otusjs.player.core.phase.EjectActionService', Service);

  Service.$inject = [
    'otusjs.player.core.phase.ActionPipeService',
    'otusjs.player.core.phase.PreEjectActionService',
    'otusjs.player.core.phase.ExecutionEjectActionService',
    'otusjs.player.core.phase.PostEjectActionService'
  ];

  function Service(ActionPipeService, PreEjectActionService, ExecutionEjectActionService, PostEjectActionService) {
    var self = this;

    /* Public methods */
    self.PreEjectActionService = PreEjectActionService;
    self.ExecutionEjectActionService = ExecutionEjectActionService;
    self.PostEjectActionService = PostEjectActionService;
    self.execute = execute;

    function execute() {
      var phaseData = PreEjectActionService.execute(ActionPipeService.flowData);
      phaseData = ExecutionEjectActionService.execute(phaseData);
      phaseData = PostEjectActionService.execute(phaseData);
    }
  }
})();
