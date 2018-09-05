(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusAutocompleteQuestionView', {
      templateUrl: 'app/otusjs-player-component/survey-item/question/autocomplete/autocomplete-question-template.html',
      controller: "otusAutocompleteViewCtrl as $ctrl",
      bindings: {
        itemData: '<'
      }
    })
    .controller("otusAutocompleteViewCtrl", Controller);

  Controller.$inject = [];

  function Controller() {
    var self = this;


    /* Question Methods */
    self.$onInit = function() {
      self.view = true;
      self.answer = self.itemData.data.answer.value;
    };

  }
}());
