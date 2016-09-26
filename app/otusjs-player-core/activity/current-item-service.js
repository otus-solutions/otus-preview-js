(function() {
  'use strict';

  angular
    .module('otusjs.player.core.activity')
    .service('otusjs.player.core.activity.CurrentItemService', Service);

  Service.$inject = [
    'ActivityFacadeService',
    'otusjs.player.core.validation.ValidationService'
  ];

  function Service(ActivityFacadeService, ValidationService) {
    let self = this;
    let _item = null;
    let _filling;
    let _navigation;
    let _previousItem;
    let _validationError;
    let _observer;

    /* Public Interface */
    self.applyFilling = applyFilling;
    self.attachItemValidationError = attachItemValidationError;
    self.fill = fill;
    self.getFilling = getFilling;
    self.getFillingRules = getFillingRules;
    self.getPreviousItem = getPreviousItem;
    self.getItem = getItem;
    self.getItemNavigation = getItemNavigation;
    self.getRoutes = getRoutes;
    self.getValidationError = getValidationError;
    self.hasItem = hasItem;
    self.ignoreValidation = ignoreValidation;
    self.observerRegistry = observerRegistry;
    self.setup = setup;

    function applyFilling() {
      if (_filling) {
        ActivityFacadeService.fillQuestion(_filling);        
      }
    }

    function attachItemValidationError(validationError) {
      _validationError = validationError;
      // _observer.updateValidation(validationMap);
    }

    function fill(filling) {
      _filling = ActivityFacadeService.createQuestionFill(_item.customID, filling.answer, filling.metadata, filling.comment);
    };

    function getFilling() {
      return _filling;
    };

    function getFillingRules() {
      return _item.fillingRules.options;
    };

    function getPreviousItem() {
      return _previousItem;
    }

    function getItem() {
      return _item;
    };

    function getItemNavigation() {
      return _navigation;
    };

    function getRoutes() {
      if (_navigation) {
        return _navigation.routes;
      } else {
        return [];
      }
    }

    function getValidationError() {
      return _validationError;
    }

    function hasItem() {
      if (_item) {
        return true;
      } else {
        return false;
      }
    }

    function ignoreValidation() {
      return false;
    }

    function observerRegistry(observer) {
      _observer = observer;
    };

    function setup(item, navigation, previousItem) {
      _item = item;
      _navigation = navigation;
      _previousItem = previousItem || null;
    }
  }
}());
