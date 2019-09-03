(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusCalendarQuestion', {
      templateUrl: 'app/otusjs-player-component/survey-item/question/calendar/calendar-question-template.html',
      controller: "otusCalendarQuestionCtrl as $ctrl",
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    })
    .config(function($mdDateLocaleProvider) {
      /**
       * @param date {Date}
       * @returns {string} string representation of the provided date
       */
      $mdDateLocaleProvider.formatDate = function(date) {
        return date ? moment(date).format('L') : '';
      };

      /**
       * @param dateString {string} string that can be converted to a Date
       * @returns {Date} JavaScript Date object created from the provided dateString
       */
      $mdDateLocaleProvider.parseDate = function(dateString) {
        var m = moment(dateString, 'L', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
      };

      $mdDateLocaleProvider.isDateComplete = function(dateString) {
        dateString = dateString.trim();
        // Look for two chunks of content (either numbers or text) separated by delimiters.
        var re = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
        return re.test(dateString);
      };
    })
    .controller("otusCalendarQuestionCtrl", Controller);

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService',
    'otusjs.utils.ImmutableDate',
  ];

  function Controller(CurrentItemService, ImmutableDate) {
    var self = this;

    self.view = false;

    self.$onInit = function() {
      self.answer = CurrentItemService.getFilling(self.itemData.templateID).answer.value || new ImmutableDate(null);
      self.otusQuestion.answer = self;
    };

    self.update = function() {
      self.onUpdate({
        questionID: self.itemData.templateID,
        valueType: 'answer',
        value: (self.answer.date instanceof Date) ? self.answer : null
      });
    };

    self.clear = function() {
      CurrentItemService.getFilling(self.itemData.templateID).answer.clear();
      delete self.answer;
      self.$onInit();
    };
  }
}());
