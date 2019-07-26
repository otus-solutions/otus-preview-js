(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusStaticVariable', {
      templateUrl: 'app/otusjs-player-component/static-variable/static-variable-template.html',
      controller: 'otusStaticVariableCtrl as $ctrl'
    }).controller('otusStaticVariableCtrl', Controller);

  Controller.$inject = [
    'otusjs.player.data.activity.ActivityFacadeService'
  ];

  function Controller(ActivityFacadeService) {
    var self = this;

    self.shouldLockOpen = true;
    self.iconLockOpen = 'arrow_left';
    self.tooltipLockOpen = 'Fechar';

    self.$onInit = onInit;
    self.isLockOpen = isLockOpen;

    function onInit() {
      self.variable = ActivityFacadeService.getWholeTemplateStaticVariableList();
    }

    function isLockOpen(){
      self.shouldLockOpen = !self.shouldLockOpen;
      self.iconLockOpen = self.shouldLockOpen ? 'arrow_left' : 'arrow_right';
      self.tooltipLockOpen = self.shouldLockOpen ? 'Fechar' : 'Abrir';
    }
  }
}());