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

    var SURVEY_ITEM = '<answer-view ng-repeat="item in questions" ng-show="questions.length" go-back="$ctrl.goBack()" class="visiblequestion" icon="item.objectType" item-data="item" question="{{item.label.ptBR.formattedText}}"></answer-view>' +
      '<otus-survey-item item-data="itemData" id="{{itemData.templateID}}" style="margin: 0;display:block;" class="animate-switch"/>';
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
        removeQuestion(itemData.templateID);
        $scope.itemData = itemData;
        _setQuestionId(itemData.templateID);
        $element.find('#pagePlayer').empty();
        $element.find('#pagePlayer').append($compile(SURVEY_ITEM)($scope));
        _onGoBottom(itemData.templateID);
      }



      if(PlayerService.isGoingBack()){
        if(PlayerService.getGoBackTo() !== itemData.templateID){
          self.goBack()
        } else {
          PlayerService.setGoBackTo(null)
        }
      }
    }


    $scope.removeQuestion = removeQuestion;

    function removeQuestion(id) {
      var index = _getIndexQuestionId(id);
      if(index > -1){
        var length = $scope.questions.length;
        $scope.questions.splice(index, length);
        self.ids.splice(index, length);

      } else {
        return false;
      }
      return true;

    }

    function _setQuestionId(id) {
      self.ids.push(id);
    }

    function _getIndexQuestionId(id) {
      return self.ids.indexOf(id);
    }

    function _onGoBottom(idQuestion) {
      $location.hash(idQuestion);
      $anchorScroll();
    }

    function _saveQuestion() {
      if($scope.itemData.templateID){
        var question = angular.copy($scope.itemData);
        // _trailConstructor(question)
        question.data = ActivityFacadeService.fetchItemAnswerByTemplateID(question.templateID);

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
