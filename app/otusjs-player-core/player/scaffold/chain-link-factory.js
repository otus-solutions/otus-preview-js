(function() {
  'use strict';

  angular
    .module('otusjs.player.core.player')
    .factory('otusjs.player.core.player.ChainLinkFactory', Factory);

  function Factory() {
    var self = this;

    /* Public methods */
    self.create = create;

    function create() {
      return new ChainLink();
    }

    return self;
  }

  function ChainLink() {
    let self = this;
    let _next = null;
    let _preExecute = null;
    let _execute = null;
    let _postExecute = null;

    /* Public methods */
    self.getNext = getNext;
    self.setNext = setNext;
    self.setPreExecute = setPreExecute;
    self.setExecute = setExecute;
    self.setPostExecute = setPostExecute;
    self.execute = execute;

    function getNext() {
      return _next;
    }

    function setNext(next) {
      _next = next;
    }

    function execute() {
      if (_preExecute) _preExecute();
      if (_execute) _execute();
      if (_postExecute) _postExecute();
      if (_next) _next.execute();
    }

    function setPreExecute(procedure) {
      _preExecute = procedure;
    }

    function setExecute(procedure) {
      _execute = procedure;
    }

    function setPostExecute(procedure) {
      _postExecute = procedure;
    }
  }
})();
