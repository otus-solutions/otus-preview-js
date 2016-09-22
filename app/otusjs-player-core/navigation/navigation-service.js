(function() {
  'use strict';

  angular
    .module('otusjs.player.core.navigation')
    .service('otusjs.player.core.navigation.NavigationService', Service);

  // Service.$inject = [
  //   'otusjs.model.navigation.NavigationApiService'
  // ];

  function Service() {
    var self = this;
    // console.log(NavigationApiService);
    /* Public Interface */
    self.getSurvey = getSurvey;

    function getSurvey() {
      return _survey;
    }
  }
}());
