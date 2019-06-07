(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusViewerFilters', {
      templateUrl: 'app/otusjs-player-component/viewer/viewer-filters-template.html',
      controller: Controller,
      bindings: {
        filters: '='
      }
    });

  Controller.$injcet = ['aservice'];

  function Controller(service) {
    var self = this;
    self.$onInit = onInit;

    function onInit() {
      _setInitialFilters();
    }

    self.data = service.data;

    var a = {
      answer: '',
      comment: '',
      customID: 'ATSTOQ1',
      dataType: 'LocalDate',
      forceAnswer: false,
      hasAnswer: true,
      hasComment: false,
      hasMetadata: false,
      index: 0,
      isAnswered: true,
      isIgnored: false,
      isQuestion: true,
      isSkipped: false,
      label: "",
      metadata: undefined,
      navigationState: 'ANSWERED',
      navigationStatusIcon: undefined,
      objectType: 'CalendarQuestion',
      templateID: 'ATSTOQ1',
      templateName: 'questionView'
    };

    function _setInitialFilters() {
      self.filters = {
        state: false,
        customID: true,
        skippedQuestions: true,
        notVisitedQuestions: true,
        fillingBox: true
      };
    }
  }
}());


(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .filter('stateFilter', Filter);

  function Filter() {
    return function (itemState, ) {
      
    }
  }
}());