(function() {
  'use strict';

  angular
    .module('otusjs.player.core.player')
    .service('otusjs.player.core.player.AheadActionService', Service);

  Service.$inject = [
    'otusjs.player.core.player.PreAheadActionService',
    'otusjs.player.core.player.ExecutionAheadActionService',
    'otusjs.player.core.player.PostAheadActionService'
  ];

  function Service(PreAheadActionService, ExecutionAheadActionService, PostAheadActionService) {
    let self = this;

    /* Public methods */
    self.PreAheadActionService = PreAheadActionService;
    self.ExecutionAheadActionService = ExecutionAheadActionService;
    self.PostAheadActionService = PostAheadActionService;
    self.execute = execute;

    function execute() {
      PreAheadActionService.execute();
      ExecutionAheadActionService.execute();
      PostAheadActionService.execute();
    }
  }
})();
