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
    self.hasNext = hasNext;
    self.hasPrevious = hasPrevious;
    self.getNextItems = getNextItems;
    self.getPreviousItem = getPreviousItem;

    function setup(survey) {
      var item = survey.itemContainer[0];
      var itemNavigation = survey.navigationList[0];

      CurrentSurveyService.setup(survey);
      CurrentQuestionService.setup(item, itemNavigation);
    }

    function hasNext() {
      if (CurrentQuestionService().getRoutes().length) {
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

    function getNextItems() {
      return CurrentQuestionService.getRoutes().map((route) => {
        return CurrentSurveyService.getItemByCustomID(route.destination);
      });
    }

    function getPreviousItem() {
      return CurrentSurveyService.getItemByCustomID(CurrentQuestionService.getPreviousItem());
    }
  }
}());
