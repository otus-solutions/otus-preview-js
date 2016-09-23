(function() {
  'use strict';

  angular
    .module('otusjs.player.core.activity')
    .service('otusjs.player.core.activity.CurrentSurveyService', Service);

  Service.$inject = [
    'otusjs.player.core.navigation.NavigationService'
  ];

  function Service() {
    let self = this;
    let _survey;

    /* Public Interface */
    self.setup = setup;
    self.getSurvey = getSurvey;
    self.getItems = getItems;
    self.getNavigations = getNavigations;
    self.getNavigationByOrigin = getNavigationByOrigin;
    self.getItemByCustomID = getItemByCustomID;

    function setup(survey) {
      _survey = survey;
    }

    function getSurvey() {
      return _survey;
    }

    function getItems() {
      return _survey.itemContainer;
    }

    function getItemByCustomID(customID) {
      let fetchedItem = null;

      _survey.itemContainer.some((item) => {
        if (item.customID === customID) {
          fetchedItem = item;
          return true;
        }
      });

      return fetchedItem;
    }

    function getNavigations() {
      return _survey.navigationList;
    }

    function getNavigationByOrigin(origin) {
      let fetchedNavigation = null;

      _survey.navigationList.some((navigation) => {
        if (navigation.origin === origin) {
          fetchedNavigation = navigation;
          return true;
        }
      });

      return fetchedNavigation;
    }

  }
}());
