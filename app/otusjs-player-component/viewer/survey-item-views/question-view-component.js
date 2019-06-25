(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('questionView', {
      templateUrl: 'app/otusjs-player-component/viewer/survey-item-views/question-view-template.html',
      controller: Controller,
      bindings: {
        item: '=',
        filters: '='
      }
    });



  function Controller() {
    var self = this;
    self.$onInit = onInit;


    function onInit() {
    }
  }

}());