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
    self.loadItem = loadItem;
    self.$onInit = onInit;

    function _destroyCurrentItem() {
      if (self.currentChild) {
        self.currentChild.destroy();
      }
    }

    function loadItem() {
      if ($scope.itemData !== PlayerService.getItemData()) {        
        _destroyCurrentItem();
        $scope.itemData = PlayerService.getItemData();
        $element.find('section').prepend($compile(SURVEY_ITEM)($scope));
      }
    }

    function onInit() {
      $scope.$parent.$ctrl.playerDisplay = self;
    }
  }
}());
