(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('gridIntegerQuestionView', {
      templateUrl: 'app/otusjs-player-component/viewer/survey-item-views/grid-integer-question-view-template.html',
      controller: Controller,
      bindings: {
        item: '='
      }
    });


  function Controller() {
    var self = this;
    self.$onInit = onInit;

    function onInit() {

    }
  }

}());