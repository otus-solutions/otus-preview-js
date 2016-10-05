(function() {
  'use strict';

  angular
    .module('otusjs.player.data.navigation')
    .factory('otusjs.player.data.navigation.NavigationStackItemFactory', Factory);

  function Factory() {
    let self = this;

    /* Public methods */
    self.create = create;

    function create(options) {
      return new NavigationStackItem(options);
    }

    return self;
  }

  function NavigationStackItem(options) {
    let self = this;

    let _id = options.id;
    let _label = options.label || '';
    let _type = options.type;
    let _answer = options.answer;
    let _metadata = options.metadata;

    /* Public methods */
    self.getID = getID;
    self.getLabel = getLabel;
    self.getType = getType;
    self.getAnswer = getAnswer;
    self.getMetadata = getMetadata;

    function getID() {
      return _id;
    }

    function getLabel() {
      return _label;
    }

    function getType() {
      return _type;
    }

    function getAnswer() {
      return _answer;
    }

    function getMetadata() {
      return _metadata;
    }
  }
}());
