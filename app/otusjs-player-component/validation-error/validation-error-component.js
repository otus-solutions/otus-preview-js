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

    self.$onInit = onInit;
    self.referenceAsDate = referenceAsDate;
    self.referenceAsTime = referenceAsTime;
    self.reference = reference;
    self.focus = focus;

    function onInit() {
      self.otusSurveyItem.errorComponent = self;
      templateID = self.otusSurveyItem.errorComponent.otusSurveyItem.itemData.templateID;
    }

    function referenceAsDate(type) {
      var reference = CurrentItemService.getFillingRules(templateID)[type].data.reference;
      var date;

      if (type === 'rangeDate') {
        date = {
          'initial': $filter('date')(new Date(reference.initial.value), 'dd/MM/yyyy'),
          'end': $filter('date')(new Date(reference.end.value), 'dd/MM/yyyy')
        };
      } else {
        date = $filter('date')(new Date(reference.value), 'dd/MM/yyyy');
      }
      return date;
    }

    function referenceAsTime(type) {
      var reference = CurrentItemService.getFillingRules(templateID)[type].data.reference.value;
      return $filter('date')(new Date(reference), 'hh:mm a');
    }

    function reference (type) {
      var reference = CurrentItemService.getFillingRules(templateID)[type].data.reference;
      return reference;
    }

    function focus() {
      $element.focus();
    }
  }
}());
