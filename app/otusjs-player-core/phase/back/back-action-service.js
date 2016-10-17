(function() {
  'use strict';

  angular
    .module('otusjs.player.core.phase')
    .service('otusjs.player.core.phase.BackActionService', Service);

  Service.$inject = [
    'otusjs.player.core.phase.ActionPipeService',
    'otusjs.player.core.phase.PreBackActionService',
    'otusjs.player.core.phase.ExecutionBackActionService',
    'otusjs.player.core.phase.PostBackActionService'
  ];

  function Service(ActionPipeService, PreBackActionService, ExecutionBackActionService, PostBackActionService) {
    var self = this;

    /* Public methods */
    self.PreBackActionService = PreBackActionService;
    self.ExecutionBackActionService = ExecutionBackActionService;
    self.PostBackActionService = PostBackActionService;
    self.execute = execute;

    function execute() {
      ActionPipeService.flowData.flowDirection = 'back';
      var phaseData = PreBackActionService.execute(ActionPipeService.flowData);
      phaseData = ExecutionBackActionService.execute(phaseData);
      phaseData = PostBackActionService.execute(phaseData);
    }
  }
})();
