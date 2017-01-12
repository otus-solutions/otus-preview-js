(function() {
  'use strict';

  angular
    .module('otusjs.player.core.phase')
    .service('otusjs.player.core.phase.StopActionService', Service);

  Service.$inject = [
    'otusjs.player.core.phase.ActionPipeService',
    'otusjs.player.core.phase.PreStopActionService',
    'otusjs.player.core.phase.ExecutionStopActionService',
    'otusjs.player.core.phase.PostStopActionService'
  ];

  function Service(ActionPipeService, PreStopActionService, ExecutionStopActionService, PostStopActionService) {
    var self = this;

    /* Public methods */
    self.PreStopActionService = PreStopActionService;
    self.ExecutionStopActionService = ExecutionStopActionService;
    self.PostStopActionService = PostStopActionService;
    self.execute = execute;

    function execute() {
      var phaseData = PreStopActionService.execute(ActionPipeService.flowData);
      phaseData = ExecutionStopActionService.execute(phaseData);
      phaseData = PostStopActionService.execute(phaseData);
    }
  }
})();
