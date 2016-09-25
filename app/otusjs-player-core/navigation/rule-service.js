(function() {
  'use strict';

  angular
    .module('otusjs.player.core.navigation')
    .service('otusjs.player.core.navigation.RuleService', Service);

  // Service.$inject = [
  //   'otusjs.model.navigation.NavigationApiService'
  // ];

  function Service() {
    var self = this;

    /* Public Interface */
    self.testRule = testRule;

    function testRule() {
      return _survey;
    }
  }
}());
