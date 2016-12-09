(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusTextItem', {
      templateUrl: 'app/otusjs-player-component/survey-item/misc/text/text-item-template.html',
      controller: TextItemController,
      bindings: {
        itemData: '<'
      }
    });

  TextItemController.$inject = [
    '$sce'
  ];

  function TextItemController($sce) {
    var self = this;

    self.$onInit = function() {};
    self.trustedHtml = trustedHtml;

    function trustedHtml(html) {
      return $sce.trustAsHtml(html);
    }
  }

})();
