(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusAutocompleteQuestion', {
      templateUrl: 'app/otusjs-player-component/survey-item/question/autocomplete/autocomplete-question-template.html',
      controller: Controller,
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    });

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService',
    'otusjs.utils.DatasourceService',
    'otusjs.utils.SearchQueryFactory'
  ];

  function Controller(CurrentItemService, DatasourceService, SearchQueryFactory) {
    var self = this;
    var _datasource = [];

    /* Question Methods */
    self.$onInit = function() {
      self.dataReady = false;
      self.answer = CurrentItemService.getFilling().answer.value;
      self.otusQuestion.answer = self;
      _setupDatasourceQuery();
    };

    self.update = function() {
      self.onUpdate({
        valueType: 'answer',
        value: self.answer.value
      });
    };

    self.clear = function() {
      CurrentItemService.getFilling().answer.clear();
      delete self.answer;
    };

    self.setOther = function() {
      self.answer = {value:"Outro"};
      self.update();
    };

    /* Datasource Methods */
    function _setupDatasourceQuery() {
      DatasourceService.fetchDatasources(self.itemData.dataSources)
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
