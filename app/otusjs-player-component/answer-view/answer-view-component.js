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
    'otusjs.player.core.player.PlayerService',
    'otusjs.player.core.renderer.TagComponentBuilderService'
  ]

  function Controller($scope, ICON, $filter, PlayerService, TagComponentBuilderService) {
    var self = this;

    self.$onInit = onInit;
    self.goingBack = goingBack;

    const METADADO = ['Não quer responder', 'Não sabe', 'Não se aplica', 'Não há dados'];

    function _constructor() {
      self.template = TagComponentBuilderService.createTagElement(self.itemData.objectType, true);
      $scope.itemData = angular.copy(self.itemData);
      $scope.icon = ICON[self.icon];
      if(self.itemData.data){
        $scope.answer = self.itemData.data.answer.value ? 'Resposta: '+_formatAnswer() : 'Metadado: '+  METADADO[self.itemData.data.metadata.value - 1];
        $scope.comment = self.itemData.data.comment ? 'Comentário: '+ self.itemData.data.comment: '';
      } else if(self.itemData.dataType === "String"){
        self.question = self.itemData.value.ptBR.formattedText;
      }
      $scope.labelFormatted = angular.copy(self.question);
      _clearQuestionLabel();
      $scope.label = self.question;
    }


    function _clearQuestionLabel() {
      self.question = self.question.replace(/<\w+>/g, ' ');
      self.question = self.question.replace(/<\/\w+>/g, ' ');
      self.question = self.question.replace(/[\n]/g, ' ');
    }


    function onInit() {
      _constructor();
      console.log(self.itemData)
    }

    function goingBack() {
      PlayerService.setGoBackTo(self.itemData.templateID);
      self.goBack();
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
            break;
          case "attach_file":
            answer = "";
            self.itemData.data.answer.value.forEach((value) => {
              console.log(value.name)
              answer = answer + angular.copy(value.name) + "; ";
              console.info(answer);
            });
            break;

          default:
            answer = self.itemData.data.answer.value;

        }
      }
      return answer;

    }
  }
})();