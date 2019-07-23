(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusStaticVariable', {
      templateUrl: 'app/otusjs-player-component/static-variable/static-variable-template.html',
      controller: Controller
    });

  Controller.$inject = [
    'otusjs.player.data.static.variable.StaticVariableService',
    '$scope',
    '$timeout',
    '$mdSidenav'
  ];

  function Controller(StaticVariableService, $scope, $timeout, $mdSidenav) {
    var self = this;

    self.$onInit = onInit;
    // self.shouldLockOpen = "$mdMedia('gt-xs')";
    self.isLockOpen = isLockOpen;
    self.close = close;
    self.shouldLockOpen = true;

    function onInit() {
      self.variable = StaticVariableService.getVariable();
    }

    function close () {
      // $mdSidenav('left').close();
      // self.shouldLockOpen  = null;
    }

    function isLockOpen(){
      // return $mdSidenav('left').toggle();
      self.shouldLockOpen= !self.shouldLockOpen;
      // self.shouldLockOpen = "$mdMedia('gt-xs')";
    }
  }
}());