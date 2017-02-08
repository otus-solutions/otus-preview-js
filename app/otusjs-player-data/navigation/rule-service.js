(function() {
  'use strict';

  angular
    .module('otusjs.player.data.navigation')
    .service('otusjs.player.data.navigation.RuleService', Service);

  Service.$inject = [
    'otusjs.player.data.activity.ActivityFacadeService'
  ]

  function Service(ActivityFacadeService) {
    var self = this;

    /* Public Interface */
    self.isRuleApplicable = isRuleApplicable;

    function isRuleApplicable(rule) {
      var whenItem = ActivityFacadeService.fetchItemByID(rule.when);
      var itemAnswer = ActivityFacadeService.fetchItemAnswerByTemplateID(rule.when);

      if (itemAnswer) {
        if (rule.isMetadata) {
          return itemAnswer.answer.eval.run(rule, itemAnswer.metadata.value);
        } else {
          return itemAnswer.answer.eval.run(rule, itemAnswer.answer.value);
        }
      } else {
        return false;
      }
    }
  }
}());
