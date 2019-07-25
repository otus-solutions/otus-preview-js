(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusStaticVariable', {
      templateUrl: 'app/otusjs-player-component/static-variable/static-variable-template.html',
      controller: Controller
    });

  Controller.$inject = [
    'otusjs.player.data.static.variable.StaticVariableService'
  ];

  function Controller(StaticVariableService) {
    var self = this;

    self.shouldLockOpen = true;
    self.iconLockOpen = 'arrow_left';
    self.tooltipLockOpen = 'Fechar';

    self.$onInit = onInit;
    self.isLockOpen = isLockOpen;

    function onInit() {
      self.variable = StaticVariableService.getVariable();
    }

    function isLockOpen(){
      self.shouldLockOpen = !self.shouldLockOpen;
      self.iconLockOpen = self.shouldLockOpen ? 'arrow_left' : 'arrow_right';
      self.tooltipLockOpen = self.shouldLockOpen ? 'Fechar' : 'Abri';
    }
  }
}());