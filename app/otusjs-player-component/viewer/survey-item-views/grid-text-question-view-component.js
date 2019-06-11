(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('gridTextQuestionView', {
      templateUrl: 'app/otusjs-player-component/viewer/survey-item-views/grid-text-question-view-template.html',
      controller: Controller,
      bindings: {
        item: '='
      }
    });

//todo: use the same component for both grid questions?
  function Controller() {
    var self = this;
    self.$onInit = onInit;

    function onInit() {

    }
  }

}());
