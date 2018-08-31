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
    '$location',
    '$anchorScroll',
    'otusjs.player.data.activity.ActivityFacadeService',
    'otusjs.player.core.player.PlayerService',
    'ICON'
  ];

  function Controller($scope, $element, $compile, $location, $anchorScroll, ActivityFacadeService, PlayerService, ICON) {
    var self = this;

    var SURVEY_ITEM = '<answer-view ng-repeat="item in questions" go-back="$ctrl.edit()" icon="item.objectType" answer="item.answer" question="{{item.label.ptBR.formattedText}}"></answer-view>' +
      '<otus-survey-item item-data="itemData" id="{{itemData.templateID}}" style="margin: 0;display:block;"/>';
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
        _onGoBottom(itemData.templateID);
      }

      if(PlayerService.isGoingBack()){
        if(PlayerService.getGoBackTo() !== itemData.templateID){
          self.goBack()
          _removeQuestion(itemData.templateID)
        } else {
          PlayerService.setGoBackTo(null)
        }
      }
    }

    function _removeQuestion(id) {
      let index = 0;
      $scope.questions.forEach((question) => {
        if (question.templateID == id){
          let removeIndexes = $scope.questions.length - index;
          for(var i = 0; i < removeIndexes; i++){
            $scope.questions.pop();
          }
          $scope.questions.pop();

        } else {
          index++;
        }
      });
    }

function _onGoBottom(idQuestion) {
      $location.hash(idQuestion);
      $anchorScroll();
    }

    function _saveQuestion() {
      if($scope.itemData.templateID){
        let question = angular.copy($scope.itemData);
        _trailConstructor(question)
        question.answer = ActivityFacadeService.fetchItemAnswerByTemplateID(question.templateID);
        self.edit = function () {
          PlayerService.setGoBackTo(question.templateID);
          _removeQuestion(question.templateID)
          self.goBack();
        };
        $scope.questions.push(question)
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
      $scope.tracks.push({
        id: item.customID,
        icon: ICON[item.objectType],
        text: item.customID,
        time: "",
        styleClass:"md-accent",
        click: () => {
          PlayerService.setGoBackTo(item.templateID);
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
