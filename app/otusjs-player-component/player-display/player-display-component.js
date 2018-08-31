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

    var SURVEY_ITEM = '<otus-survey-item item-data="itemData" id="{{itemData.templateID}}" style="margin: 0;display:block;"/>';
    var SURVEY_COVER = '<otus-cover />';

    /* Public methods */
    self.loadItem = loadItem;
    self.showCover = showCover;
    self.remove = remove;
    self.$onInit = onInit;
    self.ids = [];

    function _destroyCurrentItem() {
      if (self.currentItem) {
        self.currentItem.destroy();
      }
    }

    function loadItem(itemData) {
      if (_shouldLoadItem(itemData)) {
        // _destroyCurrentItem();
        $scope.itemData = itemData;
        if(self.ids.length){
          // document.getElementById("#" + self.ids[self.ids.length - 1]).remove()
          $element.find("#" + self.ids[self.ids.length - 1]).detach();
        }
        self.ids.push(itemData.templateID)
        // $element.empty();
        $element.find("#pagePlayer").append($compile(SURVEY_ITEM)($scope));
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
      $scope.tracks = [{
            id: "",
            icon: "date_range",
            text: "Nodo numero 1",
            time: "",
            styleClass: "md-hue-2",
            click: function callback(){alert('Hello World')}

        }, {
            id: "",
            icon: "looks_one",
            text: "Segundo nodo da lista",
            time: "",
            styleClass: "md-warn"
        }, {
            id: "",
            icon: "exposure_zero",
            text: "Terceira opção",
            time: "",
            styleClass: "md-accent"
        }, {
            id: "",
            icon: "radio_button_checked",
            text: "Ultima.",
            time: "",
            styleClass: "md-primary"
        }];
    }

    function _shouldLoadItem(itemData) {
      return $scope.itemData && $scope.itemData.customID !== itemData.customID;
    }
  }
}());
