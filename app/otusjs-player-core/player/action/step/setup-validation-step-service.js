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
    let _flowData = null;

    /* Public methods */
    self.catchPreData = catchPreData;
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function catchPreData(flowData) {
      _flowData = flowData;
    }

    function beforeEffect() {
      console.log('Setup validation will begin...');
    }

    function effect() {
      console.log('Setup validation in progress...');

      let currentItem = ActivityFacadeService.getCurrentItem();
      let elementRegister = ElementRegisterFactory.create(currentItem.customID, { data: {} });

      Object.keys(currentItem.fillingRules.options).map((validator) => {
        let reference = currentItem.fillingRules.options[validator].data;
        elementRegister.addValidator(validator, reference);
      });

      ValidationService.registerElement(elementRegister);
    }

    function afterEffect(response) {
      console.log('Setup validation is ended.');
    }

    function getEffectResult() {
      return _flowData;
    }
  }
})();
