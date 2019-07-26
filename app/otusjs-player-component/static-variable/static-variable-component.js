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

    self.shouldLockOpenClose = true;
    self.iconLockOpenClose = 'arrow_left';
    self.tooltipLockOpenClose = 'Fechar';

    self.$onInit = onInit;
    self.isLockOpenClose = isLockOpenClose;

    function onInit() {
      self.variable = ActivityFacadeService.getWholeTemplateStaticVariableList();
    }

    function isLockOpenClose(){
      self.shouldLockOpenClose = !self.shouldLockOpenClose;
      self.iconLockOpenClose = self.shouldLockOpenClose ? 'arrow_left' : 'arrow_right';
      self.tooltipLockOpenClose = self.shouldLockOpenClose ? 'Fechar' : 'Abrir';
    }
  }
}());