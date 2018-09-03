(function () {
  angular.module('otusjs.player.component')
    .component('answerView',{
      templateUrl: 'app/otusjs-player-component/answer-view/answer-view-template.html',
      controller: Controller,
      bindings: {
        icon: '<',
        question: '@',
        itemData: '<',
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
    $scope.answer = self.itemData.data.answer.value ? 'Resposta: '+_formatAnswer() : 'Metadado: '+  METADADO[self.answer.metadata.value - 1];

    $scope.comment = self.itemData.data.comment ? 'Comentário: '+ self.itemData.data.comment: '';

    $scope.label = self.question;
    function onInit() {
      console.log($scope.icon);
      console.log(self.answer)
    }

    function formatDate(value, format = 'dd/MM/yyyy') {
      return $filter('date')(new Date(value), format);
    }

    function formatTime(value, format = 'HH:mm') {
      return $filter('date')(new Date(value), format);
    }

    function _formatAnswer() {
      let answer = null;
      if(self.itemData.data.answer.value){
        switch ($scope.icon){
          case "date_range":
            answer = formatDate(self.itemData.data.answer.value);
            break;
          case "access_time":
            answer = formatTime(self.itemData.data.answer.value);
            break;
          case "radio_button_checked":
            console.log(self.itemData.data.answer.value)
            self.itemData.options.find((option) => {
              if(option.value === parseInt(self.itemData.data.answer.value)){
                answer = self.itemData.options[option.value - 1].label.ptBR.plainText;
              }
            });
            break;
          case "filter_none":

          default:
            answer = self.itemData.data.answer.value;

        }
      }
      return answer;

    }
  }
})();