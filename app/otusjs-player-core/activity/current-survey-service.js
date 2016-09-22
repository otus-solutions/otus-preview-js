(function() {
  'use strict';

  angular
    .module('otusjs.player.core.activity')
    .service('otusjs.player.core.activity.CurrentSurveyService', Service);

  Service.$inject = [
    'otusjs.player.core.navigation.NavigationService'
  ];

  function Service() {
    var self = this;
    var _survey;

    /* Public Interface */
    self.getSurvey = getSurvey;
    self.setSurvey = setSurvey;
    self.getQuestions = getQuestions;
    self.getNavigations = getNavigations;
    self.getNavigationFrom = getNavigationFrom;
    self.getNextItemsFrom = getNextItemsFrom;
    self.getNextItem = getNextItem;

    function getSurvey() {
      return _survey;
    }

    function setSurvey(survey) {
      _survey = survey;
    }

    function getQuestions() {
      return _survey.SurveyItemManager.getItemList();
    }

    function getNavigations() {
      return _survey.NavigationManager.getNavigationList();
    }

    function getNavigationFrom(origin) {
      return _survey.NavigationManager.selectNavigationByOrigin(origin);
    }

    function getNextItemsFrom(origin) {
      var items = [];

      var rootNavigation = _selectNavigationByOrigin(origin);
      items = rootNavigation.routes.map(function(route) {
        return _getItemByTemplateID(route.destination);
      });

      return items;
    }

    function getNextItem(currentQuestion) {

    }

    function _selectNavigationByOrigin(origin) {
      var filter = _survey.navigationList.filter(function(navigation) {
        return navigation.origin === origin;
      });

      return filter[0];
    }

    function _getItemByTemplateID(templateID) {
      var fetchedItem = {};

      _survey.itemContainer.some(function(item) {
        if (item.templateID.toLowerCase() === templateID.toLowerCase()) {
          fetchedItem = item;
          return true;
        }
      });

      return fetchedItem;
    }
  }
}());
