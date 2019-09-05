(function() {
  'use strict';

  angular
    .module('otusjs.player.core.step')
    .service('otusjs.player.core.step.LoadPreviousItemStepService', Service);

  Service.$inject = [
    'otusjs.player.data.navigation.NavigationService',
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function Service(NavigationService, CurrentItemService) {
    var self = this;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) {}

    function effect(pipe, flowData) {
      var loadData = NavigationService.loadPreviousItem();

      if (loadData) {
        CurrentItemService.setup(loadData);
        flowData.answerToEvaluate = {};
        // flowData.metadataToEvaluate = {};

        CurrentItemService.getItems().forEach(item=> {
          let templateID = item.templateID;
          flowData.answerToEvaluate[templateID] = {};
          flowData.answerToEvaluate[templateID].data = {};

          flowData.metadataToEvaluate[templateID] = {};
          flowData.metadataToEvaluate[templateID].data = {};
        });
      }
    }

    function afterEffect(pipe, flowData) {}

    function getEffectResult(pipe, flowData) {
      return flowData;
    }
  }
})();
