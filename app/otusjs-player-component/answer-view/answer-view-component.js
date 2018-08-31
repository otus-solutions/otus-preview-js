(function () {
  angular.module('otusjs.player.component')
    .component('answerView',{
      templateUrl: 'app/otusjs-player-component/answer-view/answer-view-template.html',
      controller: Controller,
      bindings: {
        icon: '<',
        question: '@',
        answer: '<'
      }
    });

  Controller.$inject = [
    '$scope'
  ]

  function Controller($scope) {
    var self = this;
    console.log(self)
    $scope.label = self.question;
  }
})();