(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('metadataGroup', {
      templateUrl: 'app/otusjs-player-component/metadata/metadata-group-template.html',
      controller: MetadataGroupController,
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    });

  MetadataGroupController.$inject = [
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function MetadataGroupController(CurrentItemService) {
    var self = this;

    self.$onInit = function() {
      self.metadata = CurrentItemService.getFilling().metadata.value;
      self.otusQuestion.metadata = self;
    };

    self.update = function() {
      self.onUpdate({
        valueType: 'metadata',
        value: self.metadata
      });
    };

    self.clear = function() {
      CurrentItemService.getFilling().metadata.clear();
      delete self.metadata;
    };
  }

})();
