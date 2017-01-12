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

    self.$onInit = function() {
      self.otusSurveyItem.errorComponent = self;
    };

    self.referenceAsDate = function(type) {
      var reference = CurrentItemService.getFillingRules()[type].data.reference;
      var date;
      if (type === 'rangeDate') {
        date = {
          'initial': $filter('date')(new Date(reference.initial), 'dd/MM/yyyy'),
          'end': $filter('date')(new Date(reference.end), 'dd/MM/yyyy')
        };
      } else {
        date = $filter('date')(new Date(reference), 'dd/MM/yyyy');
      }
      return date;
    };

    self.referenceAsTime = function(type) {
      var reference = CurrentItemService.getFillingRules()[type].data.reference;
      return $filter('date')(new Date(reference), 'hh:mm:ss');
    };

    self.reference = function(type) {
      var reference = CurrentItemService.getFillingRules()[type].data.reference;
      return reference;
    };

    self.focus = function() {
      $element.focus();
    };
  }
}());
