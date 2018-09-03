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
    '$filter',
    'otusjs.player.core.player.PlayerService'
  ]

  function Controller($scope, ICON, $filter, PlayerService) {
    var self = this;

    self.$onInit = onInit;

    const METADADO = ['Não quer responder', 'Não sabe', 'Não se aplica', 'Não há dados'];


    $scope.icon = ICON[self.icon];
    self.question = self.question.replace(/<\w+>/g, ' ');
    self.question = self.question.replace(/<\/\w+>/g, ' ');
    // _formatAnswer();
    $scope.answer = self.answer.answer.value ? 'Resposta: '+_formatAnswer() : 'Metadado: '+  METADADO[self.answer.metadata.value - 1];

    $scope.comment = self.answer.comment ? 'Comentário: '+ self.answer.comment: '';

    $scope.label = self.question;
    function onInit() {
      console.log($scope.icon);
      console.log(ICON.CalendarQuestion)
      // _formatAnswer();
    }

    function formatDate(value, format = 'dd/MM/yyyy') {
      return $filter('date')(new Date(value), format);
    }

    function formatTime(value, format = 'HH:mm') {
      return $filter('date')(new Date(value), format);
    }

    function _formatAnswer() {
      let answer = null;
      if(self.answer.answer.value){
        switch ($scope.icon){
          case "date_range":
            console.log(666)
            answer = formatDate(self.answer.answer.value);
            break;
          case "access_time":
            answer = formatTime(self.answer.answer.value);
            break;
          default:
            answer = self.answer.answer.value;

        }
      }
      return answer;

    }
  }
})();