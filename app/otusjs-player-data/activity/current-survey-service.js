(function() {
  'use strict';

  angular
    .module('otusjs.player.data.activity')
    .service('otusjs.player.data.activity.CurrentSurveyService', Service);

  Service.$inject = [
    'otusjs.model.activity.ActivityFacadeService'
  ];

  function Service(ActivityFacadeService) {
    let self = this;

    /* Public Interface */
    self.setup = setup;
    self.getSurvey = getSurvey;
    self.getAnswerByItemID = getAnswerByItemID;
    self.getItems = getItems;
    self.getNavigations = getNavigations;
    self.getNavigationByOrigin = getNavigationByOrigin;
    self.getItemByCustomID = getItemByCustomID;
    self.initialize = initialize;

    function setup() {
      ActivityFacadeService.openActivitySurvey();
    }

    function getSurvey() {
      return ActivityFacadeService.surveyActivity;
    }

    function getAnswerByItemID(id) {
      return ActivityFacadeService.getFillingByQuestionID(id);
    }

    function getItems() {
      return ActivityFacadeService.surveyActivity.template.SurveyItemManager.getItemList();
    }

    function getItemByCustomID(customID) {
      let fetchedItem = null;

      getItems().some((item) => {
        if (item.customID === customID) {
          fetchedItem = item;
          return true;
        }
      });

      return fetchedItem;
    }

    function getNavigations() {
      return ActivityFacadeService.surveyActivity.template.NavigationManager.getNavigationList();
    }

    function getNavigationByOrigin(origin) {
      let fetchedNavigation = null;

      getNavigations().some((navigation) => {
        if (navigation.origin === origin) {
          fetchedNavigation = navigation;
          return true;
        }
      });

      return fetchedNavigation;
    }

    function initialize() {
      ActivityFacadeService.initializeActivitySurvey();
    }
  }
}());
