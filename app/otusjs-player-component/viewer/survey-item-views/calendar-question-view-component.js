(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('calendarQuestionView', {
      templateUrl: 'app/otusjs-player-component/viewer/survey-item-views/calendar-question-view-template.html',
      controller: Controller,
      bindings: {
        filters: '=',
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