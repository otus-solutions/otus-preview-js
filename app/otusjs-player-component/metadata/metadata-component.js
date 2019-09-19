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
    'otusjs.player.data.activity.CurrentItemService',
    '$element'
  ];

  function MetadataGroupController(CurrentItemService, $element) {
    var self = this;

    self.$onInit = onInit;
    self.update = update;
    self.clear = clear;
    self.blurOnClick = blurOnClick;

    function onInit() {
        self.metadata = CurrentItemService.getFilling(self.itemData.templateID).metadata.value;
        self.otusQuestion.metadata = self;
    }

    function update() {
      self.onUpdate({
        valueType: 'metadata',
        value: self.metadata
      });
    }

    function clear() {
        CurrentItemService.getFilling(self.itemData.templateID).metadata.clear();
        delete self.metadata;
    }

    function blurOnClick() {
      $element.find('#metadataGroupRadioGroup').removeClass('md-focused');
    }
  }
})();
