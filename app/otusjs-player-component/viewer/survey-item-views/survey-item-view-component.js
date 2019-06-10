(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('surveyItemView', {
      templateUrl: 'app/otusjs-player-component/viewer/survey-item-views/survey-item-viewer-template.html',
      controller: Controller,
      bindings: {
        item: '=',
        filters: '='
      }
    });

  Controller.$inject = [
    'otusjs.player.core.renderer.HtmlBuilderService'
  ];

  function Controller(HtmlBuilderService) {
    var self = this;
    self.$onInit = onInit;

    function onInit() {
      let _templateName = HtmlBuilderService.generateTagName(self.item.templateName);
      self.template = '<' + _templateName + ' item="$ctrl.item" filters="$ctrl.filters"/>';
    }

  }
}());