(function() {
  'use strict';

  angular
    .module('otusjs.player.core.activity')
    .service('otusjs.player.core.activity.ActivityFacadeService', Service);

  Service.$inject = [
    'otusjs.player.core.activity.CurrentSurveyService',
    'otusjs.player.core.activity.CurrentQuestionService',
  ];

  function Service(CurrentSurveyService, CurrentQuestionService) {
    let self = this;

    /* Public Interface */
    self.setup = setup;
    self.initialize = initialize;
    self.hasNext = hasNext;
    self.hasPrevious = hasPrevious;
    self.getCurrentItem = getCurrentItem;
    self.getNextItems = getNextItems;
    self.getPreviousItem = getPreviousItem;
    self.loadNextItem = loadNextItem;

    function setup(survey) {
      var item = survey.itemContainer[0];
      var itemNavigation = survey.navigationList[0];

      CurrentSurveyService.setup(survey);
    }

    function initialize() {
      var item = CurrentSurveyService.getItems()[0];
      var itemNavigation = CurrentSurveyService.getNavigations()[0];
      CurrentQuestionService.setup(item, itemNavigation);
    }

    function hasNext() {
      if (CurrentQuestionService.getRoutes().length) {
        return true;
      } else {
        return false;
      }
    }

    function hasPrevious() {
      if (CurrentQuestionService.getPreviousItem()) {
        return true;
      } else {
        return false;
      }
    }

    function getCurrentItem() {
      return CurrentQuestionService.getQuestion();
    }

    function getNextItems() {
      return CurrentQuestionService.getRoutes().map((route) => {
        return CurrentSurveyService.getItemByCustomID(route.destination);
      });
    }

    function getPreviousItem() {
      return CurrentSurveyService.getItemByCustomID(CurrentQuestionService.getPreviousItem());
    }

    function loadNextItem() {
      let currentItem = CurrentQuestionService.getQuestion();
      let nextItem = NavigationService.getNext();
      CurrentQuestionService.setup(nextItem, nextItem.getNavigation(), currentItem.customID);
    }
  }
}());
