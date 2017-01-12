(function() {
  'use strict';

  angular
    .module('otusjs.player.core.step')
    .factory('otusjs.player.core.step.ClientStepFactory', Factory);

  Factory.$inject = [];

  function Factory() {
    var self = this;

    /* Public methods */
    self.create = create;

    function create() {
      return new ClientStep();
    }

    return self;
  }

  function ClientStep() {
    var self = this;
    var _before = null;
    var _execution = null;
    var _after = null;

    /* Public methods */
    self.setupBeforeExecution = setupBeforeExecution;
    self.setupExecution = setupExecution;
    self.setupAfterExecution = setupAfterExecution;

    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function setupBeforeExecution(procedure) {
      _before = procedure;
    }

    function setupExecution(procedure) {
      _execution = procedure;
    }

    function setupAfterExecution(procedure) {
      _after = procedure;
    }

    function beforeEffect(pipe, flowData) {
      _before(pipe, flowData);
    }

    function effect(pipe, flowData) {
      _before(pipe, flowData);
    }

    function afterEffect(pipe, flowData) {
      _before(pipe, flowData);
    }

    function getEffectResult(pipe, flowData) {
      return flowData;
    }
  }
})();
