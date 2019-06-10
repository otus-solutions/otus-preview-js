(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('checkboxQuestionView', {
      templateUrl: 'app/otusjs-player-component/viewer/survey-item-views/question-view-template.html',
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