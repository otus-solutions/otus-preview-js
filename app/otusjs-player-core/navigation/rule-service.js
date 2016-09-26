(function() {
  'use strict';

  angular
    .module('otusjs.player.core.navigation')
    .service('otusjs.player.core.navigation.RuleService', Service);

  Service.$inject = [
    'otusjs.player.core.activity.ActivityFacadeService'
  ]

  function Service(ActivityFacadeService) {
    var self = this;

    /* Public Interface */
    self.isRuleApplicable = isRuleApplicable;

    function isRuleApplicable(rule) {
      let whenItem = ActivityFacadeService.fetchItemByID(rule.when);
    }
  }
}());
