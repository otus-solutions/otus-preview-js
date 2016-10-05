(function() {
  'use strict';

  angular
    .module('otusjs.player.data.navigation')
    .factory('otusjs.player.data.navigation.NavigationStackFactory', Factory);

  function Factory() {
    let self = this;

    /* Public methods */
    self.create = create;

    function create() {
      return new NavigationStack();
    }

    return self;
  }

  function NavigationStack() {
    let self = this;
    let _stack = [];

    /* Public methods */
    self.getItem = getItem;
    self.getSize = getSize;
    self.stackUp = stackUp;
    self.unstack = unstack;

    function getItem() {
      return _stack[0];
    }

    function getSize() {
      return _stack.length;
    }

    function stackUp(item) {
      _stack.unshift(item);
    }

    function unstack() {
      return _stack.shift();
    }
  }
}());
