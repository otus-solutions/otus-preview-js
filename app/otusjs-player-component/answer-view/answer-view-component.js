(function () {
  angular.module('otusjs.player.component')
    .component('answerView', {
      templateUrl: 'app/otusjs-player-component/answer-view/answer-view-template.html',
      controller: "answerViewCtrl as $ctrl",
      bindings: {
        icon: '<',
        question: '@',
        itemData: '<',
        goBack: "&"
      }
    }).controller("answerViewCtrl", Controller);

  Controller.$inject = [
    '$scope',
    'ICON',
    '$filter',
    'otusjs.player.core.player.PlayerService',
    'otusjs.player.core.renderer.TagComponentBuilderService'
  ];

  function Controller($scope, ICON, $filter, PlayerService, TagComponentBuilderService) {
    var self = this;

    self.$onInit = onInit;
    self.goingBack = goingBack;
    self.viewQuestion = viewQuestion;
    self.isQuestion = isQuestion;
    self.isItem = isItem;


    function _constructor() {
      self.template = TagComponentBuilderService.createTagElement(self.itemData.objectType, true);
      $scope.itemData = angular.copy(self.itemData);
      $scope.icon = ICON[self.icon];
      if(self.itemData.data){
        _metadadaBuilder();
        $scope.answer = self.itemData.data.answer.value ? 'Resposta: '+_formatAnswer() : 'Metadado: '+  self.METADADA[self.itemData.data.metadata.value - 1];
        $scope.comment = self.itemData.data.comment ? 'Comentário: '+ self.itemData.data.comment: '';
        _clearQuestionLabel();
        $scope.label = self.question;
      } else if(self.itemData.objectType === "TextItem"){
        $scope.label = self.itemData.value.ptBR.formattedText;
      } else if(self.itemData.objectType === "ImageItem"){
        $scope.label = "[IMAGEM]";
      }
      $scope.labelFormatted = angular.copy(self.question);
      _clearQuestionLabel();
      $scope.label = self.question;
    }

    function _metadadaBuilder() {
      self.METADADA = [];
      self.itemData.metadata.options.forEach(function(option) {
        self.METADADA.push(option.label.ptBR.plainText);
      })
    }

    function _clearQuestionLabel() {
      self.question = self.question.replace(/<\w+>/g, ' ');
      self.question = self.question.replace(/<\/\w+>/g, ' ');
      self.question = self.question.replace(/[\n]/g, ' ');
    }


    function onInit() {
      $scope.itemData = angular.copy(self.itemData);
      _constructor();
    }

    function goingBack() {
      PlayerService.setGoBackTo(self.itemData.templateID);
      self.goBack();
    }

    function viewQuestion() {
      self.view = !self.view;
    }

    function formatDate(value) {
      var format = 'dd/MM/yyyy'
      return $filter('date')(new Date(value), format);
    }

    function formatTime(value) {
      var format = 'HH:mm';
      return $filter('date')(new Date(value), format);
    }

    function formatSingleSelection() {
      var _answer = '';
      self.itemData.options.find(function(option){
        if(option.value === parseInt(self.itemData.data.answer.value)){
          _answer =  self.itemData.options[option.value - 1].label.ptBR.plainText;
        }
      });
      return _answer;
    }

    function formatFileUpload() {
      var _answer = "";
      self.itemData.data.answer.value.forEach(function(value){
        _answer = _answer + angular.copy(value.name) + "; ";
      });
      return  _answer;
    }

    function isQuestion() {
      return (self.itemData.objectType === 'ImageItem') || (self.itemData.objectType === 'TextItem') ? false : true;
    }

    function isItem() {
      return (self.itemData.objectType === 'ImageItem') || (self.itemData.objectType === 'TextItem') ? true : false;
    }

    function _formatAnswer() {
      var answer = null;
      if(self.itemData.data.answer.value){
        switch ($scope.icon){
          case "date_range":
            answer = formatDate(self.itemData.data.answer.value);
            break;
          case "access_time":
            answer = formatTime(self.itemData.data.answer.value);
            break;
          case "radio_button_checked":
            answer = formatSingleSelection();
            break;
          case "check_box":
            answer = "Multiplas respostas, clique em visualizar questão.";
            break;
          case "filter_none":
            answer = "Multiplas respostas, clique em visualizar questão.";
            break;
          case "filter_1":
            answer = "Multiplas respostas, clique em visualizar questão.";
            break;
          case "attach_file":
            answer = formatFileUpload();
            break;

          default:
            answer = self.itemData.data.answer.value;

        }
      }
      return answer;

    }
  }
}());
