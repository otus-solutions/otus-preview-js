(function() {
  'use strict';

  angular
    .module('otusjs.player.core.player')
    .service('otusjs.player.core.player.LoadItemStepService', Service);

  Service.$inject = [
    'otusjs.player.core.activity.ActivityFacadeService',
    'otusjs.player.core.player.ExecutionAheadActionService'
  ];

  function Service(ActivityFacadeService, ExecutionAheadActionService) {
    let self = this;

    /* Public methods */
    self.beforeLoading = beforeLoading;
    self.load = load;
    self.afterLoading = afterLoading;

    function beforeLoading() {
      console.log('Item loading will begin...');
    }

    function load() {
      ActivityFacadeService.navigateToNextItem();
    }

    function afterLoading() {
      console.log('Item loading is ended.');
    }

    //------------------------------------------
    // Use the player step framework
    //------------------------------------------
    let step = {};
    step.pre = beforeLoading;
    step.execution = load;
    step.post = afterLoading;
    ExecutionAheadActionService.pipe(step);
  }
})();
