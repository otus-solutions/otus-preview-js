(function() {
  'use strict';

  angular
    .module('otusjs.player.core.activity')
    .service('otusjs.player.core.activity.ActivityFacadeService', Service);

  Service.$inject = [
    'otusjs.player.core.activity.CurrentSurveyService',
    'otusjs.player.core.activity.CurrentItemService'
  ];

  function Service(CurrentSurveyService, CurrentItemService) {
    let self = this;
    let _item = null;
    let _itemNavigation = null;

    /* Public Interface */
    self.applyAnswer = applyAnswer;
    self.attachItemValidationError = attachItemValidationError;
    self.setupAnswer = setupAnswer;
    self.setup = setup;
    self.initialize = initialize;
    self.hasNext = hasNext;
    self.hasPrevious = hasPrevious;
    self.fetchItemByID = fetchItemByID;
    self.getCurrentItem = getCurrentItem;
    self.getNextItems = getNextItems;
    self.getPreviousItem = getPreviousItem;
    self.loadNextItem = loadNextItem;

    function applyAnswer() {
      CurrentItemService.applyFilling();
    }

    function attachItemValidationError(validationError) {
      CurrentItemService.attachValidationError();
    }

    function setupAnswer(answerData) {
      CurrentItemService.fill(answerData);
    }

    function setup() {
      CurrentSurveyService.setup();
    }

    function initialize() {
      CurrentSurveyService.initialize();
      _item = CurrentSurveyService.getItems()[0];
      _itemNavigation = CurrentSurveyService.getNavigations()[0];
    }

    function hasNext() {
      if (CurrentItemService.getRoutes().length) {
        return true;
      } else {
        return false;
      }
    }

    function hasPrevious() {
      if (CurrentItemService.getPreviousItem()) {
        return true;
      } else {
        return false;
      }
    }

    function fetchItemByID(id) {
      return CurrentSurveyService.getItemByCustomID(id);
    }

    function getCurrentItem() {
      return CurrentItemService.getItem();
    }

    function getNextItems() {
      return CurrentItemService.getRoutes().map((route) => {
        return CurrentSurveyService.getItemByCustomID(route.destination);
      });
    }

    function getPreviousItem() {
      return CurrentSurveyService.getItemByCustomID(CurrentItemService.getPreviousItem());
    }

    function loadNextItem() {
      if (!CurrentItemService.hasItem()) {
        CurrentItemService.setup(_item, _itemNavigation);
      } else {
        let currentItem = CurrentItemService.getItem();
        // let nextItem = NavigationService.getNext();
        // CurrentItemService.setup(nextItem, nextItem.getNavigation(), currentItem.customID);
      }
    }
  }
}());
