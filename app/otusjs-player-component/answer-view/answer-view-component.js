(function () {
  angular.module('otusjs.player.component')
    .component('answerView',{
      templateUrl: 'app/otusjs-player-component/answer-view/answer-view-template.html',
      controller: Controller,
      bindings: {
        icon: '<',
        question: '@',
        answer: '<',
        goBack: "&"
      }
    });

  Controller.$inject = [
    '$scope',
    'ICON',
    'otusjs.player.core.player.PlayerService'
  ]

  function Controller($scope, ICON, PlayerService) {
    var self = this;
    const METADADO = ['Não quer responder', 'Não sabe', 'Não se aplica', 'Não há dados']
    console.log(self.answer)
    self.question = self.question.replace(/<\w+>/g, ' ');
    self.question = self.question.replace(/<\/\w+>/g, ' ');
    $scope.answer = self.answer.answer.value ? 'Resposta: '+self.answer.answer.value : 'Metadado: '+  METADADO[self.answer.metadata.value - 1];
    $scope.comment = self.answer.comment ? 'Comentário: '+ self.answer.comment: '';
    $scope.icon = ICON[self.icon];
    $scope.label = self.question;

    $scope.edit = function () {
      PlayerService.setGoBackTo(self.answer.questionID);
      self.goBack();
    }
  }
})();