(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusPlayerDisplay', {
      templateUrl: 'app/otusjs-player-component/player-display/player-display-template.html',
      controller: Controller
    });

  Controller.$inject = [
    '$scope',
    '$element',
    '$compile',
    'otusjs.player.core.player.PlayerService'
  ];

  function Controller($scope, $element, $compile, PlayerService) {
    var self = this;

    var SURVEY_ITEM = '<otus-survey-item item-data="itemData" />';

    /* Public methods */
    self.$onInit = onInit;

    function _destroyCurrentItem() {
      self.currentChild.destroy();
    }

    function onInit() {
      self.isLoading = true;
      PlayerService.play();
      _loadItem(PlayerService.getItem());
    }

    function _loadItem() {
      $scope.itemData = PlayerService.getItem();
      $element.find('section').prepend($compile(SURVEY_ITEM)($scope));
    }
  }
}());
