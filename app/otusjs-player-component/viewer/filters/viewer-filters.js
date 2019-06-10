(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusViewerFilters', {
      templateUrl: 'app/otusjs-player-component/viewer/filters/viewer-filters-template.html',
      controller: Controller,
      bindings: {
        filters: '='
      }
    });


  function Controller() {
    var self = this;
    self.$onInit = onInit;

    function onInit() {
      _setInitialFilters();
    }

    function _setInitialFilters() {
      self.filters = {
        displayState: false,
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
