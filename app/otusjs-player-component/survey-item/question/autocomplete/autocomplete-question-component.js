(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusAutocompleteQuestion', {
      templateUrl: 'app/otusjs-player-component/survey-item/question/autocomplete/autocomplete-question-template.html',
      controller: "otusAutocompleteQuestionCtrl as $ctrl",
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    })
    .controller("otusAutocompleteQuestionCtrl", Controller);

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService',
    'otusjs.utils.DatasourceService',
    'otusjs.utils.SearchQueryFactory'
  ];

  function Controller(CurrentItemService, DatasourceService, SearchQueryFactory) {
    var self = this;
    var _datasource = [];

    self.view = false;

    /* Question Methods */
    self.$onInit = function() {
      self.dataReady = false;
      self.answer = CurrentItemService.getFilling(self.itemData.templateID).answer.value;
      self.otusQuestion.answer = self;
      _setupDatasourceQuery();
    };

    self.update = function() {
      var _answerUpdate;
      if (!self.answer) {
         _answerUpdate = null;
     } else{
        _answerUpdate = self.answer.value;
     }
      self.onUpdate({
        questionID: self.itemData.templateID,
        valueType: 'answer',
        value: _answerUpdate
    });
    };

    self.clear = function() {
      CurrentItemService.getFilling(self.itemData.templateID).answer.clear();
      delete self.answer;
    };

    self.setOther = function() {
      self.answer = {value:"Outro"};
      self.update();
    };

    /* Datasource Methods */
    function _setupDatasourceQuery() {
      DatasourceService.fetchDatasources(self.itemData.templateID)
        .then(function(dataList) {
          _datasource = _datasource.concat(dataList);
          if (_datasource.length) {
            self.searchQuery = SearchQueryFactory.newStringSearch(_datasource).perform;
            self.dataReady = true;
          }
       }, function(err){
          self.dataError = true;
       });
      self.autoCompleteSettings = {
        selectedItem: null,
        searchText: "",
      };
    }
  }
}());
