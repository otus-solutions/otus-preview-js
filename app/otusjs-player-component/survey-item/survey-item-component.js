(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusSurveyItem', {
      templateUrl: 'app/otusjs-player-component/survey-item/survey-item-template.html',
      controller: OtusSurveyItemController,
      bindings: {
        itemData: '<'
      }
    });

  OtusSurveyItemController.$inject = [
    '$scope',
    '$element',
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function OtusSurveyItemController($scope, $element, CurrentItemService) {
    var self = this;

    /* Public methods */
    self.$onInit = onInit;
    self.isQuestion = isQuestion;
    self.isItem = isItem;
    self.update = update;
    self.clear = clear;
    self.pushData = pushData;
    self.destroy = destroy;
    self.updateValidation = updateValidation;

    function onInit() {
      self.filling = {};
      self.filling.questionID = self.itemData.templateID;


      //todo: checar se uma função exposta no self pode ser acessada via scope ($scope.$parent.$ctrl.addToCurrentItems() )
      $scope.$parent.$ctrl.currentItems.push(self);
      CurrentItemService.observerRegistry(self);

      self.$error = {};
      self.questionComponent = {};
      self.errorComponent = {};
    }

    function updateValidation(validationMap) {
      self.$error = validationMap;

      console.log(self.$error);

      if (self.$error.hasError) {
        self.questionComponent.setError(self.$error);
      }
    }

    function isQuestion() {
      return (self.itemData.objectType === 'ImageItem') || (self.itemData.objectType === 'TextItem') ? false : true;
    }

    function isItem() {
      return (self.itemData.objectType === 'ImageItem') || (self.itemData.objectType === 'TextItem') ? true : false;
    }

    function update(prop, value) {
      if (prop) {
        if (prop === 'comment' || prop === 'forceAnswer') {
          self.filling[prop] = value;
        } else {
          clear(prop, value);
          self.filling[prop].value = value;
        }
      } else {
        throw new Error('Cannot determine property type to update', 72, 'survey-item-component.js');
      }
      CurrentItemService.fill(self.filling);
    }

    function clear(prop) {
      if (prop) {
        if (prop === 'metadata') {
          self.questionComponent.clearAnswer();
        } else if (prop === 'answer') {
          self.questionComponent.clearMetadataAnswer();
        }
      } else {
        throw new Error('Cannot determine property type to clear', 85, 'survey-item-component.js');
      }
    }

    function pushData(filling) {
      self.filling = filling;
    }

    function destroy() {
      $element.remove();
      $scope.$destroy();
    }
  }
})();
