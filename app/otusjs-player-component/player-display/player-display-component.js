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
    let self = this;

    let SURVEY_ITEM = '<otus-survey-item item-data="itemData" />';
    let SURVEY_COVER = '<otus-cover />';

    /* Public methods */
    self.loadItem = loadItem;
    self.showCover = showCover;
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
        let $section = $element.find('section');
        let $otusSurveyItem = $compile(SURVEY_ITEM)($scope);
        $section.prepend($otusSurveyItem);
      }
    }

    function showCover() {
      _destroyCurrentItem();
      $element.find('section').prepend($compile(SURVEY_COVER)($scope));
    }

    function onInit() {
      $scope.$parent.$ctrl.playerDisplay = self;
      $scope.itemData = {};
      $scope.itemData.customID = '';
    }

    function _shouldLoadItem(itemData) {
      return $scope.itemData.customID !== itemData.customID;
    }
  }
}());
