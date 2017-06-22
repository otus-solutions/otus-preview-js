(function() {
  'use strict';

  angular
    .module('otusjs.player.core.scaffold')
    .factory('otusjs.player.core.scaffold.ChainLinkFactory', Factory);

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
    var self = this;
    var _next = null;
    var _catchFlowData = null;
    var _preExecute = null;
    var _execute = null;
    var _postExecute = null;
    var _getFlowData = null;

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
      if (_preExecute) _preExecute(pipe, flowData);

      if (_execute && !pipe.skipStep) {
        _execute(pipe, flowData);
      }

      if (_postExecute && !pipe.skipStep) {
        _postExecute(pipe, flowData);
      }

      if (pipe.isFlowing) {
        pipe.skipStep = false;
        if (_getFlowData) {
          if (_next) _next.execute(pipe, _getFlowData(pipe, flowData));
        } else {
          if (_next) _next.execute(pipe, flowData);
        }
      }

      return { pipe: pipe, flowData: flowData };
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
