(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusPlayerDisplay', {
      templateUrl: 'app/otusjs-player-component/player-display/player-display-template.html',
      controller: Controller,
      bindings:{
        goBack: "&"
      }
    });

  Controller.$inject = [
    '$scope',
    '$element',
    '$compile',
    'otusjs.player.data.activity.ActivityFacadeService',
    'otusjs.player.core.player.PlayerService'
  ];

  function Controller($scope, $element, $compile, ActivityFacadeService, PlayerService) {
    var self = this;

    var SURVEY_ITEM = '<answer-view ng-repeat="item in questions" question="{{item.label.ptBR.formattedText}}"></answer-view><otus-survey-item item-data="itemData" id="{{itemData.templateID}}" style="margin: 0;display:block;"/>';
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
        _destroyCurrentItem();
        _saveQuestion();
        $scope.itemData = itemData;
        console.log(itemData);
        console.log(ActivityFacadeService);
        $element.find('#pagePlayer').empty();
        $element.find('#pagePlayer').append($compile(SURVEY_ITEM)($scope));
      }

      var questionToGoBack = PlayerService.getGoBackTo();
      if(questionToGoBack && questionToGoBack !== itemData.templateID){
        self.goBack()
      } else {
        PlayerService.setGoBackTo(null)
      }
    }

    function _saveQuestion() {
      if($scope.itemData.templateID){
        let question = angular.copy($scope.itemData);
        _trailConstructor(question);
        console.log(ActivityFacadeService.fetchItemAnswerByTemplateID(question.templateID));
        $scope.questions.push(angular.copy($scope.itemData))
      }
    }

    function showCover() {
      _destroyCurrentItem();
      $element.find('#pagePlayer').empty();
      $element.find('#pagePlayer').append($compile(SURVEY_COVER)($scope));
    }

    function remove() {
      $element.find('#pagePlayer').remove();
    }

    function _trailConstructor(item) {
      let itemCopy = angular.copy(item);
      $scope.tracks.push({
        id: itemCopy.templateID,
        icon: "spellcheck",
        text: itemCopy.templateID,
        time: "",
        styleClass:"md-accent",
        click: () => {
          PlayerService.setGoBackTo(itemCopy.templateID);
          self.goBack();
        }
      })
    }

    function onInit() {
      $scope.$parent.$ctrl.playerDisplay = self;
      $scope.itemData = {};
      $scope.itemData.customID = '';
      $scope.questions = [];
      $scope.tracks = [];
    }

    function _shouldLoadItem(itemData) {
      return $scope.itemData && $scope.itemData.customID !== itemData.customID;
    }
  }
}());
