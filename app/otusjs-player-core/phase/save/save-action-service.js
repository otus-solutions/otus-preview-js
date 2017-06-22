(function() {
  'use strict';

  angular
    .module('otusjs.player.core.phase')
    .service('otusjs.player.core.phase.SaveActionService', Service);

  Service.$inject = [
    'otusjs.player.core.phase.ActionPipeService',
    'otusjs.player.core.phase.PreSaveActionService',
    'otusjs.player.core.phase.ExecutionSaveActionService',
    'otusjs.player.core.phase.PostSaveActionService'
  ];

  function Service(ActionPipeService, PreSaveActionService, ExecutionSaveActionService, PostSaveActionService) {
    var self = this;

    /* Public methods */
    self.PreSaveActionService = PreSaveActionService;
    self.ExecutionSaveActionService = ExecutionSaveActionService;
    self.PostSaveActionService = PostSaveActionService;
    self.execute = execute;

    function execute() {
      var phaseData = PreSaveActionService.execute(ActionPipeService.flowData);
      phaseData = ExecutionSaveActionService.execute(phaseData);
      phaseData = PostSaveActionService.execute(phaseData);
    }
  }
})();
