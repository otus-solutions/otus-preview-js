(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusViewerFilters', {
      templateUrl: 'app/otusjs-player-component/viewer/filters/viewer-filters-template.html',
      controller:'otusViewFiltersController as $ctrl',
      bindings: {
        filters: '='
      }
    })
    .controller('otusViewFiltersController', Controller);

  function Controller() {
    var self = this;
    self.$onInit = onInit;

    function onInit() {
      _setInitialFilters();
    }

    function _setInitialFilters() {
      self.filters = {
        displayState: true,
        customID: true,
        state: {
          SKIPPED: false,
          NOT_VISITED: true,
          ANSWERED: true,
          IGNORED: false,
          VISITED: true
        },
        fillingBox: true
      };
    }
  }
}());
