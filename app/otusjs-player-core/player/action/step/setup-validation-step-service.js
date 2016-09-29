(function() {
  'use strict';

  angular
    .module('otusjs.player.core.player')
    .service('otusjs.player.core.player.SetupValidationStepService', Service);

  Service.$inject = [
    'otusjs.player.core.activity.ActivityFacadeService',
    'ValidationService',
    'ElementRegisterFactory'
  ];

  function Service(ActivityFacadeService, ValidationService, ElementRegisterFactory) {
    let self = this;
    let _currentItem;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) {
      _currentItem = ActivityFacadeService.getCurrentItem();

      if (_currentItem.shouldIgnoreResponseEvaluation()) {
        pipe.skipStep = true;
      } else {
        pipe.skipStep = false;
      }
    }

    function effect(pipe, flowData) {
      let elementRegister = ElementRegisterFactory.create(_currentItem.getItem().customID, flowData.answerToEvaluate);

      Object.keys(_currentItem.getItem().fillingRules.options).map((validator) => {
        let reference = _currentItem.getItem().fillingRules.options[validator].data;
        elementRegister.addValidator(validator, reference);
      });

      ValidationService.registerElement(elementRegister);
    }

    function afterEffect(pipe, flowData) {
    }

    function getEffectResult(pipe, flowData) {
      return flowData;
    }
  }
})();
