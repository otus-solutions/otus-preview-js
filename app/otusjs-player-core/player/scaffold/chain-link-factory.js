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
    let _catchFlowData = null;
    let _preExecute = null;
    let _execute = null;
    let _postExecute = null;
    let _getFlowData = null;

    /* Public methods */
    self.getNext = getNext;
    self.getResult = getResult;
    self.execute = execute;
    self.catchFlowData = catchFlowData;
    self.setExecute = setExecute;
    self.setNext = setNext;
    self.setPostExecute = setPostExecute;
    self.setPreExecute = setPreExecute;
    self.setResult = setResult;

    function getResult() {
      return _result;
    }

    function getNext() {
      return _next;
    }

    function execute(pipe, flowData) {
      if (_catchFlowData) _catchFlowData(flowData);
      if (_preExecute) _preExecute();
      if (_execute) _execute();
      if (_postExecute) _postExecute();

      if (pipe.isFlowing) {
        if (_getFlowData) {
          if (_next) _next.execute(pipe, _getFlowData());
        } else {
          if (_next) _next.execute(pipe, null);
        }
      }
    }

    function catchFlowData(procedure) {
      _catchFlowData = procedure;
    }

    function setExecute(procedure) {
      _execute = procedure;
    }

    function setNext(next) {
      _next = next;
    }

    function setPostExecute(procedure) {
      _postExecute = procedure;
    }

    function setPreExecute(procedure) {
      _preExecute = procedure;
    }

    function setResult(procedure) {
      _getFlowData = procedure;
    }
  }
})();
