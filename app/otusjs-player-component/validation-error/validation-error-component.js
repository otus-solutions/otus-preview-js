(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusValidationError', {
      templateUrl: 'app/otusjs-player-component/validation-error/validation-error-template.html',
      controller: otusValidationErrorController,
      bindings: {
        $error: '=error'
      },
      require: {
        otusSurveyItem: '^otusSurveyItem'
      }
    });

  otusValidationErrorController.$inject = [
    'otusjs.player.data.activity.CurrentItemService',
    '$filter',
    '$element'
  ];

  function otusValidationErrorController(CurrentItemService, $filter, $element) {
    var self = this;
    var templateID = null;

    self.$onInit = function() {
      self.otusSurveyItem.errorComponent = self;
      templateID = self.otusSurveyItem.errorComponent.otusSurveyItem.itemData.templateID;
      // console.log(self.otusSurveyItem.errorComponent);
    };

    self.referenceAsDate = function(type) {
      var reference = CurrentItemService.getFillingRules(templateID)[type].data.reference;
      var date;
      console.log(reference );
      if (type === 'rangeDate') {
        date = {
          'initial': $filter('date')(new Date(reference.initial.value), 'dd/MM/yyyy'),
          'end': $filter('date')(new Date(reference.end.value), 'dd/MM/yyyy')
        };
      } else {
        date = $filter('date')(new Date(reference.value), 'dd/MM/yyyy');
      }
      return date;
    };

    self.referenceAsTime = function(type) {
      var reference = CurrentItemService.getFillingRules(templateID)[type].data.reference.value;
      console.log(reference );
      return $filter('date')(new Date(reference), 'hh:mm a');
    };

    self.reference = function(type) {
      var reference = CurrentItemService.getFillingRules(templateID)[type].data.reference;
      console.log(reference );
      return reference;
    };

    self.focus = function() {
      $element.focus();
    };
  }
}());
