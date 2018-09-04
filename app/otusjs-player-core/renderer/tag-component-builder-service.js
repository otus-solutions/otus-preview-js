(function() {
  'use strict';

  angular
    .module('otusjs.player.core.renderer')
    .service('otusjs.player.core.renderer.TagComponentBuilderService', TagComponentBuilderService);

  TagComponentBuilderService.$inject = [
    'otusjs.player.core.renderer.HtmlBuilderService'
  ];

  function TagComponentBuilderService(HtmlBuilderService) {
    var self = this;

    self.createTagElement = createTagElement;

    function createTagElement(elementType, onlyView) {
      return _replace(HtmlBuilderService.generateTagName(elementType), onlyView);
    }

    function _replace(tagName, onlyView = false) {
      if(onlyView){

        return '<otus-' + tagName + '-view item-data="$ctrl.itemData" />';
      }else {

        return '<otus-' + tagName + ' item-data="$ctrl.itemData" on-update="$ctrl.update(valueType, value)" />';
      }
    }
  }
})();
