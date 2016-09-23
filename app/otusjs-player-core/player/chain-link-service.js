(function() {
  'use strict';

  angular
    .module('otusjs.player.core.player')
    .service('otusjs.player.core.player.ChainLinkService', Service);

  function Service() {
    let self = this;
    let _next = null;
    let _preRun = null;

    /* Public methods */
    self.getNext = getNext;
    self.setNext = setNext;
    self.setPreProcedure = setPreProcedure;
    self.run = run;

    function getNext() {
      return _next;
    }

    function setNext(next) {
      _next = next;
    }

    function run() {
      _preRun();
    }

    function setPreProcedure(procedure) {
      _preRun = procedure;
    }
  }
})();
