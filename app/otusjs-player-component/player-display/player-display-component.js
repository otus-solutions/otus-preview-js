(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusPlayerDisplay', {
      templateUrl: 'app/otusjs-player-component/player-display/player-display-template.html',
      controller: Controller,
      bindings: {
        goBack: '&'
      }
    });

  Controller.$inject = [
    '$scope',
    '$document',
    '$element',
    '$compile',
    '$location',
    '$anchorScroll',
    'otusjs.player.data.activity.ActivityFacadeService',
    'otusjs.player.core.player.PlayerService'
  ];

  function Controller($scope, $document, $element, $compile, $location, $anchorScroll, ActivityFacadeService, PlayerService) {
    var self = this;

    var SURVEY_ITEM = '<otus-survey-item item-data="itemData" id="{{itemData.templateID}}" style="margin: 0;display:block;" class="animate-switch"/>';
    // var SURVEY_ITEM_GROUP = '<otus-survey-item-group item-data="itemData" style="margin: 0;display:block;" class="animate-switch"/>';
    var SURVEY_COVER = '<otus-cover />';

    /* Public methods */
    self.loadItem = loadItem;
    self.showCover = showCover;
    self.remove = remove;
    self.$onInit = onInit;
    self.ids = [];
    self.currentItems = [];

    $scope.removeQuestion = removeQuestion;

    function _destroyCurrentItems() {
      if (self.currentItem) {
        self.currentItems.forEach(item => {
          item.destroy();
        });
      }

      self.currentItems = [];
    }

    function loadItem(itemsData) {
      if (_shouldLoadItem(itemsData[itemsData.length - 1])) {
        _destroyCurrentItems();
        _saveQuestion();
        removeQuestion(itemsData[itemsData.length - 1].templateID);

        $element.find('#pagePlayer').empty();
        for (let i = 0; i < itemsData.length; i++) {
          (function () {
            $scope = $scope.$new();
            $scope.itemData = itemsData[i];
            _setQuestionId(itemsData[i].templateID);
            let element = $compile(SURVEY_ITEM)($scope);
            $element.find('#pagePlayer').append(element);

          }());
        }
        _focusOnItem(itemsData[itemsData.length - 1].templateID);
      }

      if (PlayerService.isGoingBack()) {
        if (PlayerService.getGoBackTo() !== itemsData[0].templateID) {
          self.goBack();
        } else {
          PlayerService.setGoBackTo(null);
        }
      }
    }

    function removeQuestion(id) {
      //todo checar se essa função é usada só nesse componente
      //remove questão do histórico. Renomear
      var index = _getIndexQuestionId(id);
      if (index > -1) {
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

    function _focusOnItem(idQuestion) {
      $location.hash(idQuestion);
      $anchorScroll();
    }

    function _saveQuestion() {
      if ($scope.itemData.length) {
        $scope.itemData.forEach(itemData => {
          var question = angular.copy(itemData);
          question.data = ActivityFacadeService.fetchItemAnswerByTemplateID(question.templateID);
          question.data = question.data ? question.data : _setAnswerBlank();
          $scope.questions.push(question);
        });
      }
    }

    function _setAnswerBlank() {
      return {
        metadata: {
          value: null
        },
        answer: {
          value: null
        }
      };
    }

    function showCover() {
      _destroyCurrentItems();
      $element.find('#pagePlayer').empty();
      $element.find('#pagePlayer').append($compile(SURVEY_COVER)($scope));
    }

    function remove() {
      $element.find('#pagePlayer').remove();
    }

    function onInit() {
      $scope.$parent.$ctrl.playerDisplay = self;
      $scope.itemData = [];
      $scope.questions = [];
    }

    function _shouldLoadItem(itemData) {
      return $scope.itemData && $scope.itemData.templateID !== itemData.templateID;
    }
  }
}());
