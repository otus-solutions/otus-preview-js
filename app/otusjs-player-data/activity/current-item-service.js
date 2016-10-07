(function() {
  'use strict';

  angular
    .module('otusjs.player.data.activity')
    .service('otusjs.player.data.activity.CurrentItemService', Service);

  Service.$inject = [
    'otusjs.model.activity.ActivityFacadeService'
  ];

  function Service(ActivityFacadeService) {
    let self = this;
    let _item = null;
    let _filling = null;
    let _navigation = null;
    let _validationError = null;
    let _observer = null;

    /* Public Interface */
    self.applyFilling = applyFilling;
    self.attachValidationError = attachValidationError;
    self.clearData = clearData;
    self.fill = fill;
    self.getFilling = getFilling;
    self.getFillingRules = getFillingRules;
    self.getItem = getItem;
    self.getNavigation = getNavigation;
    self.getValidationError = getValidationError;
    self.hasItem = hasItem;
    self.shouldIgnoreResponseEvaluation = shouldIgnoreResponseEvaluation;
    self.shouldApplyAnswer = shouldApplyAnswer;
    self.observerRegistry = observerRegistry;
    self.setup = setup;

    function applyFilling() {
      if (_filling) {
        ActivityFacadeService.fillQuestion(_filling);
      }
    }

    function attachValidationError(validationError) {
      _validationError = validationError;
      _observer.updateValidation(validationError);
    }

    function clearData() {
      _item = null;
      _filling = null;
      _navigation = null;
      _validationError = null;
      _observer = null;
    }

    function fill(filling) {
      if (_item.isQuestion()) {
        _filling = filling;
      }
    };

    function getFilling() {
      return _filling;
    };

    function getFillingRules() {
      return _item.fillingRules.options;
    };

    function getItem() {
      return _item;
    };

    function getNavigation() {
      return _navigation;
    };

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

    function shouldApplyAnswer() {
      return _item && _item.isQuestion();
    }

    function shouldIgnoreResponseEvaluation() {
      return !_item || !_item.isQuestion();
    }

    function observerRegistry(observer) {
      _observer = observer;
      _observer.pushData(_filling);
    };

    function setup(data) {
      _item = data.item;
      _navigation = data.navigation;

      if (_item.isQuestion()) {
        _filling = ActivityFacadeService.getFillingByQuestionID(_item.customID);

        if (!_filling) {
          _filling = ActivityFacadeService.createQuestionFill(_item);
          _filling.answerType = _item.objectType;
        }
      } else {
        _filling = null;
      }
    }
  }
}());
