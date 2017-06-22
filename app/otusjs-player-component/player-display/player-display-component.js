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
    '$compile'
  ];

  function Controller($scope, $element, $compile) {
    var self = this;

    var SURVEY_ITEM = '<otus-survey-item item-data="itemData" flex style="overflow: auto; position: relative; margin-right: -15px;"/>';
    var SURVEY_COVER = '<otus-cover />';

    /* Public methods */
    self.loadItem = loadItem;
    self.showCover = showCover;
    self.remove = remove;
    self.$onInit = onInit;

    function _destroyCurrentItem() {
      if (self.currentItem) {
        self.currentItem.destroy();
      }
    }

    function loadItem(itemData) {
      if (_shouldLoadItem(itemData)) {
        _destroyCurrentItem();
        $scope.itemData = itemData;
        $element.empty();
        $element.append($compile(SURVEY_ITEM)($scope));
      }
    }

    function showCover() {
      _destroyCurrentItem();
      $element.empty();
      $element.append($compile(SURVEY_COVER)($scope));
    }

    function remove() {
      $element.remove();
    }

    function onInit() {
      $scope.$parent.$ctrl.playerDisplay = self;
      $scope.itemData = {};
      $scope.itemData.customID = '';
    }

    function _shouldLoadItem(itemData) {
      return $scope.itemData && $scope.itemData.customID !== itemData.customID;
    }
  }
}());
