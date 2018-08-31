(function() {
  'use strict';

  angular
    .module('otusjs.player', [
      'otusjs.player.component',
      'otusjs.player.core',
      'otusjs.player.data'
    ]);

}());

(function() {
    'use strict';

    angular
        .module('otusjs.player.component', ['trail']);

}());

(function () {
  angular.module('otusjs.player.component')
    .constant('ICON', {
      'CalendarQuestion': 'date_range',
      'IntegerQuestion': 'looks_one',
      'DecimalQuestion': 'exposure_zero',
      'SingleSelectionQuestion': 'radio_button_checked',
      'CheckboxQuestion': 'check_box',
      'AutocompleteQuestion': 'youtube_searched_for',
      'FileUploadQuestion': 'attach_file',
      'GridTextQuestion': 'filter_none',
      'GridIntegerQuestion': 'filter_1',
      'PhoneQuestion': 'phone',
      'EmailQuestion': 'email',
      'TimeQuestion': 'access_time',
      'TextQuestion': 'text_format',
      'TextItem': 'message',
      'ImageItem': 'image'
    });
}());
(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusComment', {
      template:'<md-content layout-padding><div layout="row"><md-input-container md-no-float class="md-block" flex><textarea ng-model="$ctrl.comment" ng-change="$ctrl.update()" placeholder="Digite o texto aqui"></textarea></md-input-container></div></md-content>',
      controller: OtusCommentController,
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    });

  OtusCommentController.$inject = [
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function OtusCommentController(CurrentItemService) {
    var self = this;

    self.$onInit = function() {
      self.comment = CurrentItemService.getFilling().comment;
      self.otusQuestion.comment = self;
    };

    self.update = function() {
      self.onUpdate({
        valueType: 'comment',
        value: self.comment
      });
    };

    self.clear = function() {
      CurrentItemService.getFilling().comment;
      delete self.comment;
    };
  }

})();

(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusLabel', {
            controller: LabelController,
            bindings: {
                itemLabel: '<'
            }
        });

    LabelController.$inject = ['$element'];

    function LabelController($element) {
        var self = this;

        self.$onInit = function() {
            _fillLabel();
        };

        function _fillLabel() {
            $element[0].innerHTML = _getLabel();
        }

        function _getLabel() {
            if (self.itemLabel instanceof Object) {
                return _undefinedWrapper(self.itemLabel.ptBR.formattedText);
            } else {
                return _undefinedWrapper(self.itemLabel);
            }
        }

        function _undefinedWrapper(value){
            return value ? value : '';
        }
    }

})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('metadataGroup', {
      template:'<md-content layout-padding style="margin-left: 10px"><md-radio-group id="metadataGroupRadioGroup" ng-model="$ctrl.metadata" ng-change="$ctrl.update()" layout-padding flex><md-content value="{{option.value}}" ng-repeat="option in $ctrl.itemData.metadata.options" layout="row" style="margin: 10px"><md-radio-button aria-label="{{option.label}}" ng-click="$ctrl.blurOnClick()" value="{{option.value}}" style="outline: none;border: 0;" flex><otus-label item-label="option.label.ptBR.formattedText"></otus-label></md-radio-button></md-content></md-radio-group></md-content>',
      controller: MetadataGroupController,
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    });

  MetadataGroupController.$inject = [
    'otusjs.player.data.activity.CurrentItemService',
    '$element'
  ];

  function MetadataGroupController(CurrentItemService, $element) {
    var self = this;

    self.$onInit = function() {
      self.metadata = CurrentItemService.getFilling().metadata.value;
      self.otusQuestion.metadata = self;
    };

    self.update = function() {
      self.onUpdate({
        valueType: 'metadata',
        value: self.metadata
      });
    };

    self.clear = function() {
      CurrentItemService.getFilling().metadata.clear();
      delete self.metadata;
    };

    self.blurOnClick = function() {
      $element.find('#metadataGroupRadioGroup').removeClass('md-focused');
    }
  }

})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusPlayer', {
      template:'<otus-survey-cover on-play="$ctrl.play()" phase-blocker="$ctrl.phaseBlocker" ng-show="$ctrl.showCover" layout-align="center center" layout="column" flex class="player-cover"></otus-survey-cover><md-content layout="column" flex ng-show="$ctrl.showActivity"><otus-survey-header layout="row"></otus-survey-header><otus-player-commander layout="row" flex="10" on-go-back="$ctrl.goBack()" on-pause="$ctrl.pause()" on-stop="$ctrl.stop()" on-go-ahead="$ctrl.goAhead()" on-eject="$ctrl.eject()"></otus-player-commander><otus-player-display go-back="$ctrl.goBack()" layout="column" flex style="overflow: hidden !important; position: relative !important"></otus-player-display></md-content><otus-survey-back-cover on-finalize="$ctrl.eject()" ng-show="$ctrl.showBackCover" layout-align="center center" layout="column" flex class="player-back-cover"></otus-survey-back-cover>',
      controller: Controller
    });

  Controller.$inject = [
    'otusjs.player.core.player.PlayerService'
  ];

  function Controller(PlayerService) {
    var SURVEY_ITEM = '<otus-survey-item item-data="itemData" />';
    var self = this;

    /* Public methods */
    self.catchMouseWheel = catchMouseWheel;
    self.eject = eject;
    self.goAhead = goAhead;
    self.goBack = goBack;
    self.pause = pause;
    self.play = play;
    self.stop = stop;
    self.showBack = showBack;
    self.showCover = showCover;
    self.$onInit = onInit;

    function catchMouseWheel($event) {
      if (event.deltaY > 0) {
        goAhead();
      } else {
        goBack();
      }
    }

    function eject() {
      PlayerService.eject();
    }

    function goAhead() {
      PlayerService.goAhead();
      _loadItem();
    }

    function goBack() {
      PlayerService.goBack();
      _loadItem();
    }

    function pause() {
      PlayerService.save();
    }

    function play() {
      self.showBackCover = false;
      self.showCover = false;
      self.showActivity = true;
      PlayerService.play();
      _loadItem();
    }

    function stop() {
      PlayerService.stop();
    }

    function showCover() {
      self.playerCover.show();
    }

    function showBack() {
      self.playerCover.remove();
      self.playerDisplay.remove();
      self.showBackCover = true;
      self.showActivity = false;
    }

    function onInit() {
      _setupPhaseBlocker();  //TODO this should be called elsewhere if we want to block other phases than pre-start (which method is executed at every phase change?)
      self.showBackCover = false;
      self.showCover = true;
      self.showActivity = false;

      /*
       * These objects are initialized by child components of Player
       * See player-commander-component.js (onInit method)
       * See player-display-component.js (onInit method)
       */
      self.playerCommander = {};
      self.playerDisplay = {};
      self.playerCover = {};
      self.playerBackCover = {};
      PlayerService.bindComponent(self);
    }

    function _setupPhaseBlocker() {
      self.phaseBlocker = PlayerService.getPhaseBlocker();
    }

    function _loadItem() {
      if (PlayerService.getItemData()) {
        self.playerDisplay.loadItem(PlayerService.getItemData());
      }
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusPlayerCommander', {
      template:'<md-content layout-padding layout="column" flex style="padding-top: 0 !important; padding-bottom: 0 !important"><md-toolbar style="border-radius: 3px" class="md-whiteframe-1dp"><div class="md-toolbar-tools" layout-align="space-around center"><md-button id="previousQuestion" class="md-icon-button" aria-label="Voltar" ng-click="$ctrl.goBack()" ng-disabled="$ctrl.isGoBackDisabled"><md-icon md-font-set="material-icons">skip_previous</md-icon><md-tooltip md-direction="bottom">Voltar</md-tooltip></md-button><md-button id="saveActivity" class="md-icon-button" aria-label="Salvar" ng-click="$ctrl.pause()"><md-icon md-font-set="material-icons">save</md-icon><md-tooltip md-direction="bottom">Salvar</md-tooltip></md-button><md-button id="cancelActivity" class="md-icon-button" aria-label="Cancelar" ng-click="$ctrl.stop()"><md-icon md-font-set="material-icons">close</md-icon><md-tooltip md-direction="bottom">Cancelar</md-tooltip></md-button><md-button id="nextQuestion" class="md-icon-button" aria-label="Avançar" ng-click="$ctrl.goAhead()" ng-disabled="$ctrl.isGoAheadDisabled"><md-icon md-font-set="material-icons">skip_next</md-icon><md-tooltip md-direction="bottom">Avançar</md-tooltip></md-button></div></md-toolbar></md-content>',
      controller: Controller,
      bindings: {
        onGoAhead: '&',
        onGoBack: '&',
        onPause: '&',
        onStop: '&'
      }
    });

  Controller.$inject = [
    '$q',
    '$mdDialog',
    '$scope',
    '$document',
    '$element'
  ];

  function Controller($q, $mdDialog, $scope, $document, $element) {
    var SAVE_TITLE = 'Salvar Atividade';
    var SAVE_CONTENT = 'Você tem certeza que deseja salvar a atividade?';
    var CANCEL_TITLE = 'Cancelar Atividade';
    var CANCEL_CONTENT = 'Todos os dados, não salvos, serão perdidos. Você tem certeza que deseja cancelar?';

    var self = this;
    var pressedControl = false;

    /* Public methods */
    self.goBack = goBack;
    self.goAhead = goAhead;
    self.pause = pause;
    self.stop = stop;
    self.remove = remove;
    self.$onInit = onInit;
    self.$postLink = postLink;

    function onInit() {
      $scope.$parent.$ctrl.playerCommander = self;
    }

    function postLink() {
      shortcutAction();
    }

    function goAhead() {
      self.onGoAhead();
    }

    function goBack() {
      self.onGoBack();
    }

    function pause() {
      confirmDialog(SAVE_TITLE, SAVE_CONTENT).then(
        function () {
          self.onPause();
        });
    }

    function stop() {
      confirmDialog(CANCEL_TITLE, CANCEL_CONTENT).then(
        function () {
          self.onStop();
        });
    }

    function remove() {
      $element.remove();
    }

    function shortcutAction() {
      $(document).unbind('keydown').bind('keydown', function (event) {
        switch (event.key) {
          case 'Control':
            {
              pressedControl = true;
              break;
            }
          case 'ArrowLeft':
            {
              if (pressedControl) {
                event.preventDefault();
                $element.find('#previousQuestion').focus();
                self.goBack();
                $scope.$apply();
              }
              break;
            }
          case 'ArrowRight':
            {
              if (pressedControl) {
                event.preventDefault();
                $element.find('#nextQuestion').focus();
                self.goAhead();
                $scope.$apply();
              }
              break;
            }
          case 'End':
            {
              if (pressedControl) {
                $element.find('#cancelActivity').focus();
                self.stop();
              }
              break;
            }
          case 'Home':
            {
              if (pressedControl) {
                $element.find('#saveActivity').focus();
                self.pause();
              }
              break;
            }
          default:
            return;
        }
      });

      $(document).bind("keyup", function (event) {
        if (event.which === 17) {
          pressedControl = false;
          return false;
        }
      });
    }

    function confirmDialog(title, content) {
      var deferred = $q.defer();
      $mdDialog.show($mdDialog.confirm()
        .title(title)
        .textContent(content)
        .ariaLabel('Confirmar ação de atalho:' + title)
        .ok('Ok')
        .cancel('Cancelar')
      ).then(function () {
        deferred.resolve();
      }, function () {
        deferred.reject();
      });
      return deferred.promise;
    }

  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusPlayerDisplay', {
      template:'<div layout="row" flex><md-content flex="10" layout="column"><otus-trail nodes="tracks"></otus-trail></md-content><md-content flex layout="column" id="pagePlayer"></md-content><md-content flex="10" layout="column"><otus-trail nodes="tracks"></otus-trail></md-content></div>',
      controller: Controller,
      bindings:{
        goBack: "&"
      }
    });

  Controller.$inject = [
    '$scope',
    '$element',
    '$compile',
    '$location',
    '$anchorScroll',
    'otusjs.player.data.activity.ActivityFacadeService',
    'otusjs.player.core.player.PlayerService',
    'ICON'
  ];

  function Controller($scope, $element, $compile, $location, $anchorScroll, ActivityFacadeService, PlayerService, ICON) {
    var self = this;

    var SURVEY_ITEM = '<answer-view ng-repeat="item in questions" go-back="$ctrl.edit()" icon="item.objectType" answer="item.answer" question="{{item.label.ptBR.formattedText}}"></answer-view>' +
      '<otus-survey-item item-data="itemData" id="{{itemData.templateID}}" style="margin: 0;display:block;"/>';
    var SURVEY_COVER = '<otus-cover />';

    /* Public methods */
    self.loadItem = loadItem;
    self.showCover = showCover;
    self.remove = remove;
    self.$onInit = onInit;
    self.ids = [];

    function _destroyCurrentItem() {
      if (self.currentItem) {
        self.currentItem.destroy();
      }
    }

    function loadItem(itemData) {
      if (_shouldLoadItem(itemData)) {
        _destroyCurrentItem();
        _saveQuestion();
        $scope.itemData = itemData;
        console.log(itemData);
        console.log(ActivityFacadeService);
        $element.find('#pagePlayer').empty();
        $element.find('#pagePlayer').append($compile(SURVEY_ITEM)($scope));
        _onGoBottom(itemData.templateID);
      }

      if(PlayerService.isGoingBack()){
        if(PlayerService.getGoBackTo() !== itemData.templateID){
          self.goBack()
          _removeQuestion(itemData.templateID)
        } else {
          PlayerService.setGoBackTo(null)
        }
      }
    }

    function _removeQuestion(id) {
      let index = 0;
      $scope.questions.forEach((question) => {
        if (question.templateID == id){
          let removeIndexes = $scope.questions.length - index;
          for(var i = 0; i < removeIndexes; i++){
            $scope.questions.pop();
          }
          $scope.questions.pop();

        } else {
          index++;
        }
      });
    }

function _onGoBottom(idQuestion) {
      $location.hash(idQuestion);
      $anchorScroll();
    }

    function _saveQuestion() {
      if($scope.itemData.templateID){
        let question = angular.copy($scope.itemData);
        _trailConstructor(question)
        question.answer = ActivityFacadeService.fetchItemAnswerByTemplateID(question.templateID);
        self.edit = function () {
          PlayerService.setGoBackTo(question.templateID);
          _removeQuestion(question.templateID)
          self.goBack();
        };
        $scope.questions.push(question)
      }
    }

    function showCover() {
      _destroyCurrentItem();
      $element.find('#pagePlayer').empty();
      $element.find('#pagePlayer').append($compile(SURVEY_COVER)($scope));
    }

    function remove() {
      $element.find('#pagePlayer').remove();
    }

    function _trailConstructor(item) {
      $scope.tracks.push({
        id: item.customID,
        icon: ICON[item.objectType],
        text: item.customID,
        time: "",
        styleClass:"md-accent",
        click: () => {
          PlayerService.setGoBackTo(item.templateID);
          self.goBack();
        }
      })
    }

    function onInit() {
      $scope.$parent.$ctrl.playerDisplay = self;
      $scope.itemData = {};
      $scope.itemData.customID = '';
      $scope.questions = [];
      $scope.tracks = [];
    }

    function _shouldLoadItem(itemData) {
      return $scope.itemData && $scope.itemData.customID !== itemData.customID;
    }
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusSurveyBackCover', {
      template:'<md-content class="cover-content" layout-align="center center" layout="row" flex><div layout-align="center center" layout="column" flex><section><h2 class="md-display-1">{{ $ctrl.title }}</h2></section><md-button class="md-raised md-primary" aria-label="Finalizar" ng-click="$ctrl.finalize()"><md-icon md-font-set="material-icons">assignment_turned_in</md-icon>Finalizar</md-button></div></md-content>',
      controller: Controller,
      bindings: {
        onFinalize: '&'
      }
    });

    Controller.$inject = [
      '$scope',
      'otusjs.player.data.activity.ActivityFacadeService'
    ];


  function Controller($scope, ActivityFacadeService) {
    var self = this;

    /* Public methods */
    self.finalize = finalize;

    /* Public methods */
    self.$onInit = onInit;

    function finalize() {
      self.onFinalize();
    }

    function onInit() {
      $scope.$parent.$ctrl.playerBackCover = self;
      var activity = ActivityFacadeService.getCurrentSurvey().getSurvey();
      self.title = activity.getName();
    }
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusSurveyCover', {
      template:'<md-content class="cover-content" layout-align="center center" layout="row" flex><div layout-align="center center" layout="column" flex><section><h2 class="md-display-1">{{ $ctrl.title }}</h2></section><md-button class="md-raised md-primary" aria-label="Iniciar" ng-click="$ctrl.play()" ng-disabled="$ctrl.block"><md-icon md-font-set="material-icons">assignment</md-icon>Iniciar</md-button><md-progress-circular md-primary md-mode="indeterminate" ng-show="$ctrl.block"></md-progress-circular></div></md-content>',
      controller: Controller,
      bindings: {
        onPlay: '&',
        phaseBlocker: '&'
      }
    });

  Controller.$inject = [
    '$scope',
    '$element',
    'otusjs.player.data.activity.ActivityFacadeService'
  ];

  function Controller($scope, $element, ActivityFacadeService) {
    var self = this;

    /* Public methods */
    self.$onInit = onInit;
    self.play = play;
    self.show = show;
    self.remove = remove;

    function onInit() {
      $scope.$parent.$ctrl.playerCover = self;
      var activity = ActivityFacadeService.getCurrentSurvey().getSurvey();
      self.title = activity.getName();
      _unblock();
    }

    function _unblock(){
      if (self.phaseBlocker()) {
         self.block = true;
         self.phaseBlocker()
            .then(function(thing) {
               self.block=false;
            });
      }
    }

    function play() {
      self.onPlay();
    }

    function show() {
      var activity = ActivityFacadeService.getCurrentSurvey().getSurvey();
      self.title = activity.getName();
    }

    function remove() {
      $element.remove();
    }
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusSurveyHeader', {
      template:'<md-content layout="column" flex><md-card><md-content layout="row"><md-chips layout="column" layout-padding layout-align="center center" style="padding: 0 !important; padding-left: 10px !important"><md-chip style="margin: 0 !important">{{ $ctrl.surveyIdentity.acronym }}</md-chip></md-chips><md-content layout="column" flex layout-padding style="padding: 0 !important" layout-align="center start"><div><span class="md-display-1">{{ $ctrl.surveyIdentity.name }}</span></div></md-content></md-content><md-content layout="row" style="padding-left: 10px !important; padding-right: 10px !important"><div layout="column" layout-padding layout-align="center start"><label class="md-caption" style="padding: 0 !important">Participante</label> <span class="md-title" style="padding: 0 !important">{{ $ctrl.participantData.name }}</span></div><div class="md-list-item-text" layout="column" layout-padding layout-align="center start"><label class="md-caption" style="padding: 0 !important">Número de Recrutamento</label> <span class="md-title" style="padding: 0 !important">{{ $ctrl.participantData.recruitmentNumber }}</span></div></md-content></md-card></md-content>',
      controller: Controller,
      bindings: {
        surveyIdentity: '<'
      }
    });

  Controller.$inject = [
    'otusjs.player.data.activity.ActivityFacadeService'
  ];

  function Controller(ActivityFacadeService) {
    var self = this;

    /* Public methods */
    self.$onInit = onInit;

    function onInit() {
      self.activity = ActivityFacadeService.getCurrentSurvey().getSurvey();
      self.surveyIdentity = self.activity.getIdentity();
      self.participantData = self.activity.participantData;

      if (self.activity.interviews.length) {
        self.interviewer = self.activity.interviews[self.activity.interviews.length - 1].interviewer;
        self.interviewer.fullname = self.interviewer.getFullname();
      }
    }
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusSurveyItem', {
      template:'<md-card flex><md-card-title layout="row" ng-if="!$ctrl.isItem()"><md-card-title-text layout="column" flex><div layout="row"><otus-label class="md-headline" item-label="$ctrl.itemData.label.ptBR.formattedText" flex layout-padding></otus-label></div></md-card-title-text></md-card-title><otus-validation-error error="$ctrl.$error" layout="row"></otus-validation-error><md-card-content layout="row" layout-align="space-between" flex><otus-question ng-if="$ctrl.isQuestion()" on-update="$ctrl.update(valueType, value)" item-data="$ctrl.itemData" layout="column" flex></otus-question><otus-misc-item ng-if="$ctrl.isItem()" item-data="$ctrl.itemData" layout="column" flex></otus-misc-item></md-card-content></md-card>',
      controller: OtusSurveyItemController,
      bindings: {
        itemData: '<'
      }
    });

  OtusSurveyItemController.$inject = [
    '$scope',
    '$element',
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function OtusSurveyItemController($scope, $element, CurrentItemService) {
    var self = this;

    /* Public methods */
    self.isQuestion = isQuestion;
    self.isItem = isItem;
    self.restoreAll = restoreAll;
    self.update = update;
    self.clear = clear;
    self.pushData = pushData;
    self.destroy = destroy;
    self.updateValidation = updateValidation;

    self.$onInit = function() {
      self.filling = {};
      self.filling.questionID = self.itemData.templateID;

      $scope.$parent.$ctrl.currentItem = self;
      CurrentItemService.observerRegistry(self);

      self.$error = {};
      self.questionComponent = {};
      self.errorComponent = {};
    };

    function updateValidation(validationMap) {
      self.$error = validationMap;

      if (self.$error.hasError) {
        self.questionComponent.setError(self.$error);
      }
    }

    function isQuestion() {
      return (self.itemData.objectType === 'ImageItem') || (self.itemData.objectType === 'TextItem') ? false : true;
    }

    function isItem() {
      return (self.itemData.objectType === 'ImageItem') || (self.itemData.objectType === 'TextItem') ? true : false;
    }

    function restoreAll() {}

    function update(prop, value) {
      if (prop) {
        if (prop === 'comment' || prop === 'forceAnswer') {
          self.filling[prop] = value;
        } else {
          clear(prop, value);
          self.filling[prop].value = value;
        }
      } else {
        throw new Error('Cannot determine property type to update', 72, 'survey-item-component.js');
      }
      CurrentItemService.fill(self.filling);
    }

    function clear(prop) {
      if (prop) {
        if (prop === 'metadata') {
          self.questionComponent.clearAnswer();
        } else if (prop === 'answer') {
          self.questionComponent.clearMetadataAnswer();
        }
      } else {
        throw new Error('Cannot determine property type to clear', 85, 'survey-item-component.js');
      }
    }

    function pushData(filling) {
      self.filling = filling;
    }

    function destroy() {
      $element.remove();
      $scope.$destroy();
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusQuestion', {
      template:'<md-content layout="column"><div layout="row"><md-tabs md-dynamic-height layout="column" flex="95"><md-tab label="Resposta"><md-content class="md-padding" bind-html-compile="$ctrl.template"></md-content></md-tab><md-tab label="Metadado"><md-content class="md-padding"><metadata-group on-update="$ctrl.update(valueType, value)" item-data="$ctrl.itemData"></metadata-group></md-content></md-tab><md-tab label="Comentário"><md-content class="md-padding"><otus-comment on-update="$ctrl.update(valueType, value)" item-data="$ctrl.itemData"></otus-comment></md-content></md-tab></md-tabs><div layout="column"><otus-question-menu on-clear="$ctrl.clear(value)" on-accept="$ctrl.forceAnswer(value)"></otus-question-menu></div></div></md-content>',
      controller: OtusQuestionController,
      bindings: {
        itemData: '<',
        onUpdate: '&',
        onClear: '&'
      },
      require: {
        otusSurveyItem: '^otusSurveyItem'
      }
    });

  OtusQuestionController.$inject = [
    'otusjs.player.core.renderer.TagComponentBuilderService',
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function OtusQuestionController(TagComponentBuilderService, CurrentItemService) {
    var self = this;

    self.$onInit = function() {
      self.template = TagComponentBuilderService.createTagElement(self.itemData.objectType);
      self.otusSurveyItem.questionComponent = self;
      self.filling = CurrentItemService.getFilling() || {};
      self.answer = CurrentItemService.getFilling().answer || {};
      self.metadata = CurrentItemService.getFilling().metadata || {};
      self.comment = CurrentItemService.getFilling().comment || {};
      self.menuComponent = {};
      self.menuComponent.error = false;

      self.setError();
    };

    self.update = function(prop, value) {
      self.onUpdate({
        valueType: prop,
        value: value
      });
    };

    self.forceAnswer = function(value) {
      self.onUpdate({
        valueType: 'forceAnswer',
        value: value
      });
    };

    self.clear = function(value) {
      if (value) {
        if (value === 'answer') {
          self.clearAnswer();
        } else if (value === 'metadata') {
          self.clearMetadataAnswer();
        } else if (value === 'comment') {
          self.clearCommentAnswer();
        }
      }
    };

    self.clearAnswer = function() {
      self.answer.clear();
    };

    self.clearMetadataAnswer = function() {
      self.metadata.clear();
    };

    self.clearCommentAnswer = function() {
      self.comment.clear();
    };

    self.setError = function(error) {
      if (self.filling.forceAnswer) {
        self.menuComponent.error = true;
      } else if (self.itemData.isQuestion() && error) {
        if (Object.keys(self.itemData.fillingRules.options).every(_canBeIgnored(error))) {
          self.menuComponent.error = true;
        } else {
          self.menuComponent.error = false;
        }
      } else {
        self.menuComponent.error = false;
      }
    };

    self.isAccept = function() {
      return self.itemData.fillingRules.options.accept === undefined ? false : true;
    };

    function _canBeIgnored(error) {
      return function(validator) {
        return self.itemData.fillingRules.options[validator].data.canBeIgnored || !error[validator];
      };
    }
  }

})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusCalendarQuestion', {
      template:'<md-content layout-padding><div layout="row" style="margin-top: 15px"><md-datepicker ng-model="$ctrl.answer.date" ng-blur="$ctrl.update()" md-placeholder="Insira a data"></md-datepicker></div></md-content>',
      controller: Controller,
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    });

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService',
    'otusjs.utils.ImmutableDate'
  ];

  function Controller(CurrentItemService, ImmutableDate) {
    var self = this;

    self.$onInit = function() {
      self.answer = CurrentItemService.getFilling().answer.value || new ImmutableDate(null);
      self.otusQuestion.answer = self;
    };

    self.update = function() {
      self.onUpdate({
        valueType: 'answer',
        value: (self.answer.date instanceof Date) ? self.answer : null
      });
    };

    self.clear = function() {
      CurrentItemService.getFilling().answer.clear();
      delete self.answer;
    };
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusIntegerQuestion', {
      template:'<md-content layout-padding><div layout="row"><md-input-container md-no-float class="md-block" flex-gt-sm="45"><input type="number" step="1" ng-model="$ctrl.answer" ng-change="$ctrl.update()" ui-integer placeholder="Insira um valor inteiro"></md-input-container><md-input-container class="md-block" flex-gt-sm="45"><otus-label item-label="$ctrl.itemData.unit"></otus-label></md-input-container></div></md-content>',
      controller: Controller,
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    });

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function Controller(CurrentItemService) {
    var self = this;

    self.$onInit = function() {
      self.answer = CurrentItemService.getFilling().answer.value;
      self.otusQuestion.answer = self;
    };

    self.update = function() {
      self.onUpdate({
        valueType: 'answer',
        value: self.answer
      });
    };

    self.clear = function() {
      CurrentItemService.getFilling().answer.clear();
      delete self.answer;
    }
  }
}());

(function() {
    'use strict';

    angular.module('otusjs.player.component').directive("uiInteger", function() {
        return {
            link: function($scope, element, attrs, ngModelCtrl) {
                var lastValidValue;

                element.on('keydown', shouldPrintChar);

                function shouldPrintChar(event) {
                    var element = angular.element(event.currentTarget);
                    var keycode = event.which;
                    if (keycode === 9) {
                       element.next().focus();
                    }
                    return (isNumberKey(keycode) || isValidKey(keycode));
                }

                element.on('keyup', formatedInteger);

                function formatedInteger(event) {
                    var element = angular.element(event.currentTarget);
                    var keycode = event.which;
                    var currentValue = element.val();

                    if (currentValue.length === 0) {
                        lastValidValue = '';
                    } else if (isNumberKey(keycode) || isValidKey(keycode)) {
                        lastValidValue = element.val();
                    } else if (!isValidKey(keycode)) {
                        element.val(lastValidValue);
                    }
                }

                function isNumberKey(keycode) {
                    return ((keycode >= 48 && keycode <= 57) || (keycode >= 96 && keycode <= 105)) ? true : false;
                }

                function isValidKey(keycode) {
                    var minusKey = (keycode === 109);
                    var shiftKey = (keycode === 16);
                    var backspaceKey = (keycode === 8);
                    var homeKey = (keycode === 36);
                    var endKey = (keycode === 35);
                    var tabKey = (keycode === 9);
                    var deleteKey = (keycode === 46);
                    var controlKey = (keycode === 17);
                    // var cKey = (keycode === 67);
                    // var vKey = (keycode === 86);
                    var leftKey = (keycode === 37);
                    var rightKey = (keycode === 39);

                    return (minusKey || shiftKey || backspaceKey || homeKey || endKey || deleteKey || controlKey || leftKey || rightKey || tabKey);
                }
            }
        };
    });

}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusDecimalQuestion', {
      template:'<md-content layout-padding><div layout="row"><md-input-container md-no-float class="md-block" flex-gt-sm="45"><input type="number" step="any" ng-model="$ctrl.answer" ng-change="$ctrl.update()" ui-decimal placeholder="Insira um valor decimal"></md-input-container><md-input-container class="md-block" flex-gt-sm="45"><otus-label item-label="$ctrl.itemData.unit"></otus-label></md-input-container></div></md-content>',
      controller: Controller,
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require : {
        otusQuestion: '^otusQuestion'
      }
    });

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function Controller(CurrentItemService) {
    var self = this;

    self.$onInit = function() {
      self.answer = CurrentItemService.getFilling().answer.value;
      self.otusQuestion.answer = self;
    };

    self.update = function() {
      self.onUpdate({
        valueType: 'answer',
        value: self.answer
      });
    };

    self.clear = function() {
      CurrentItemService.getFilling().answer.clear();
      delete self.answer;
    }
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusSingleSelectionQuestion', {
      template:'<md-content layout-padding style="margin-left: 10px"><md-radio-group id="singleSelectionQuestionRadioGroup" ng-model="$ctrl.answer" ng-change="$ctrl.update()" layout-padding flex><md-radio-button value="{{option.value}}" ng-click="$ctrl.blurOnClick()" ng-repeat="option in $ctrl.itemData.options" layout="row" style="margin: 10px;outline: none;border: 0;"><otus-label item-label="option.label.ptBR.formattedText"></otus-label></md-radio-button></md-radio-group></md-content>',
      controller: Controller,
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require : {
        otusQuestion: '^otusQuestion'
      }
    });

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService',
    '$element'
  ];

  function Controller(CurrentItemService,$element) {
    var self = this;

    self.$onInit = function() {
      self.answer = CurrentItemService.getFilling().answer.value;
      self.otusQuestion.answer = self;
    };

    self.update = function() {
      self.onUpdate({
        valueType: 'answer',
        value: self.answer
      });
    };

    self.clear = function() {
      CurrentItemService.getFilling().answer.clear();
      delete self.answer;
    }

    //OPJ-21 Remove classe md-focused que é adicionada pelo componete radiogroup do angular-material para que
    //não ative os atalhos do teclado nativos do componente
    self.blurOnClick = function() {
      $element.find('#singleSelectionQuestionRadioGroup').removeClass('md-focused');
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusCheckboxQuestion', {
      template:'<md-content layout-padding style="margin-top: 12px"><md-content ng-repeat="option in $ctrl.itemData.options track by $index" flex><md-checkbox ng-model="$ctrl.answerArray[$index].state" ng-change="$ctrl.update($index)" layout="row" style="margin: 7px"><otus-label item-label="option.label.ptBR.formattedText"></otus-label></md-checkbox></md-content></md-content>',
      controller: 'otusjs.player.component.CheckboxQuestionController as $ctrl',
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    });


}());

(function(){
  'use strict';

  angular
    .module('otusjs.player.component')
    .controller('otusjs.player.component.CheckboxQuestionController', Controller);


  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService'
  ];


  function Controller(CurrentItemService) {
    var self = this;

    self.$onInit = function () {
      self.answerArray = CurrentItemService.getFilling().answer.value;
      self.otusQuestion.answer = self;
      _buildAnswerArray();
    };

    self.update = function () {
      if (!_checkIfAnyTrue()) {
        self.onUpdate({
          valueType: 'answer',
          value: null
        });
      } else {
        self.onUpdate({
          valueType: 'answer',
          value: self.answerArray
        });
      }
    };

    self.clear = function () {
      CurrentItemService.getFilling().answer.clear();
      delete self.answerArray;
      _buildAnswerArray();
    };

    function _buildAnswerArray() {
      if (!self.answerArray) {
        self.answerArray = [];
        self.itemData.options.forEach(function (option) {
          self.answerArray.push(_buildAnswerObject(option));
        });
      }
    }


    function _buildAnswerObject(option) {
      return {
        option: option.customOptionID,
        state: option.value
      };
    }


    function _checkIfAnyTrue() {
      return self.answerArray.some(function (answer) {
        return answer.state;
      });
    }
  }


}());
(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusTextQuestion', {
      template:'<md-content id="text-question" layout-padding><div layout="row"><md-input-container md-no-float class="md-block" flex><textarea id="textQuestion" ng-class="{lowercase: $ctrl.hasLowerCase, uppercase: $ctrl.hasUpperCase}" ng-model="$ctrl.answer" ng-change="$ctrl.update()" placeholder="Digite o texto aqui"></textarea></md-input-container></div></md-content>',
      controller: Controller,
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    });

  Controller.$inject = [
    '$element',
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function Controller($element, CurrentItemService) {
    var self = this;

    self.$onInit = function () {
      self.answer = CurrentItemService.getFilling().answer.value;
      self.hasAlphanumeric = CurrentItemService.getFillingRules().alphanumeric;
      self.hasSpecials = CurrentItemService.getFillingRules().specials;
      self.hasUpperCase = CurrentItemService.getFillingRules().upperCase;
      self.hasLowerCase = CurrentItemService.getFillingRules().lowerCase;
      self.otusQuestion.answer = self;
    };

    self.update = function () {
      _runValidationSteps();

      self.onUpdate({
        valueType: 'answer',
        value: self.answer
      });
    };

    self.clear = function () {
      CurrentItemService.getFilling().answer.clear();
      delete self.answer;
    };

    function _filter() {
      var element = angular.element($element[0].querySelector('textarea#textQuestion'));
      self.answer = self.answer.replace(/[^A-Za-z0-9\u00C0-\u00FF,.'"\s]/g, '');
      element.value = self.answer;
    }

    function _isEmpty() {
      return self.answer.length == 0;
    }

    function _runValidationSteps() {
      if (self.hasLowerCase) {
        self.answer.toLowerCase();
      }

      if (self.hasUpperCase) {
        self.answer.toUpperCase();
      }

      if ((self.hasAlphanumeric && self.hasAlphanumeric.data.reference) ||
        (self.hasSpecials && self.hasSpecials.data.reference)) {
        _filter();
      }

      if (_isEmpty()) {
        delete self.answer;
      }

    }

  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusEmailQuestion', {
      template:'<md-content layout-padding><div layout="row"><md-input-container md-no-float class="md-block" flex-gt-sm="45"><md-icon class="material-icons">email</md-icon><input name="email" type="email" ng-model="$ctrl.answer" ng-change="$ctrl.update()" placeholder="email@email.com" aria-label="{{$ctrl.ariaLabel()}}"></md-input-container></div></md-content>',
      controller: Controller,
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require : {
        otusQuestion: '^otusQuestion'
      }
    });

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function Controller(CurrentItemService) {
    var self = this;

    self.$onInit = function() {
      self.answer = CurrentItemService.getFilling().answer.value;
      self.otusQuestion.answer = self;
    };

    self.update = function() {
      self.onUpdate({
        valueType: 'answer',
        value: self.answer
      });
    };

    self.ariaLabel = function() {
      return self.itemData.label.ptBR.plainText;
    };

    self.clear = function() {
      CurrentItemService.getFilling().answer.clear();
      delete self.answer;
    }
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusTimeQuestion', {
      template:'<md-content layout-padding><div layout="row"><md-button ng-click="$ctrl.currentTime()" class="md-fab md-raised md-mini" aria-label="Hora Atual" ng-disabled="$ctrl.itemData.options.data.disabledButton.value"><md-icon>access_time</md-icon><md-tooltip md-direction="down">Hora Atual</md-tooltip></md-button><md-input-container class="md-block" flex-gt-sm="45"><input id="inputtime" type="time" ng-model="$ctrl.answer.date" ng-blur="$ctrl.update($event)" aria-label="Tempo"></md-input-container></div></md-content>',
      controller: Controller,
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    });

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService',
    'otusjs.utils.ImmutableDate',
    '$element'
  ];

  function Controller(CurrentItemService, ImmutableDate, $element) {
    var self = this;

    self.$onInit = function() {
      self.answer = CurrentItemService.getFilling().answer.value || new ImmutableDate(null);
      self.otusQuestion.answer = self;
    };

    self.update = function(e) {
      var _answer = {};

      if (e.target.validity.valid) {
        _answer = self.answer;
        if (self.answer === null) {
          _answer = {};
        } else {
          if (self.answer.hasOwnProperty('date')) {
            if (self.answer.date === null || self.answer.date === undefined) {
              _answer = {};
            }
          }
        }
      } else {
        _answer = "invalid format";
      }



      self.onUpdate({
        valueType: 'answer',
        value: _answer
      });
    };


    self.clear = function() {
      CurrentItemService.getFilling().answer.clear();
      delete self.answer;
    };

    self.currentTime = function(e) {
      var imuDate = new ImmutableDate()

      imuDate.setSeconds(0);
      imuDate.setMilliseconds(0);

      self.answer = imuDate;

      $element.find('#inputtime').blur();
    };
  }

}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusPhoneQuestion', {
      template:'<md-content layout-padding><div><md-input-container md-no-float class="md-block" flex-gt-sm="45"><md-icon class="material-icons">phone</md-icon><input type="text" ng-model="$ctrl.answer" ng-change="$ctrl.update()" placeholder="(XX) XXXXX-XXXX" ui-br-phone-number></md-input-container></div></md-content>',
      controller: Controller,
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require : {
        otusQuestion: '^otusQuestion'
      }
    });

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function Controller(CurrentItemService) {
    var self = this;

    self.$onInit = function() {
      self.answer = CurrentItemService.getFilling().answer.value;
      self.otusQuestion.answer = self;
    };

    self.update = function() {
      self.onUpdate({
        valueType: 'answer',
        value: self.answer
      });
    };

    self.clear = function() {
      CurrentItemService.getFilling().answer.clear();
      delete self.answer;
    }
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusFileUploadQuestion', {
      template:'<md-content layout-padding><div layout="row"><md-button class="md-primary md-raised" upload-tool="$ctrl.uploadConfig"><md-icon md-font-set="material-icons">attach_file</md-icon>Adicionar Arquivos</md-button><md-button class="md-primary md-raised" ng-show="$ctrl.pendingList.length != 0" ng-click="$ctrl.uploadMultiple()" ng-disabled="$ctrl.pendingCounter > 0"><md-icon md-font-set="material-icons">attach_file</md-icon>Enviar Todos</md-button></div><div md-whiteframe="3" layout="column" md-padding><md-list layout="column" class="md-dense" flex><md-subheader class="md-no-sticky">Arquivos a Enviar</md-subheader><md-list-item ng-hide="$ctrl.pendingList.length != 0"><p>Nenhum arquivo selecionado</p><md-divider></md-divider></md-list-item><md-content ng-show="$ctrl.pendingList.length != 0" style="max-height: 300px;"><md-list-item ng-repeat="file in $ctrl.pendingList track by $index"><span class="md-subhead md-truncate">{{ file.name }}</span><div class="uploading-panel" ng-if="file.status == \'uploading\'"><md-progress-circular class="md-secondary" md-mode="indeterminate" md-diameter="20px" ng-if="file.status == \'uploading\'"></md-progress-circular></div><div class="action-panel" flex="20"><md-button class="md-icon-button md-secondary" aria-label="Enviar Arquivo" ng-click="$ctrl.uploadFile($index)" ng-hide="file.status == \'uploading\'" ng-disabled="$ctrl.pendingCounter >= 5"><md-icon md-font-set="material-icons">file_upload</md-icon><md-tooltip md-direction="bottom">Enviar Arquivo</md-tooltip></md-button><md-button class="md-icon-button md-secondary" aria-label="Excluir" ng-click="$ctrl.popFromPending($index)" ng-hide="file.status == \'uploading\'"><md-icon md-font-set="material-icons">delete</md-icon><md-tooltip md-direction="bottom">Excluir</md-tooltip></md-button></div></md-list-item></md-content><md-divider></md-divider><md-divider></md-divider><md-content ng-show="$ctrl.sentFiles.length != 0" style="background-color:#ebebeb; margin-top: 25px;"><md-subheader class="md-no-sticky">Arquivos Enviados</md-subheader><md-list-item class="md-2-line" ng-repeat="file in $ctrl.sentFiles track by $index"><div class="md-list-item-text" layout="column"><span class="md-subhead md-truncate">{{ file.name }}</span><p>Tamanho: {{ file.printableSize }}</p></div><div class="action-panel" flex="20"><md-button class="md-icon-button md-secondary" aria-label="Download" ng-click="$ctrl.downloadFile($index)"><md-icon md-font-set="material-icons">file_download</md-icon><md-tooltip md-direction="bottom">Download</md-tooltip></md-button><md-button class="md-icon-button md-secondary" aria-label="Delete" ng-click="$ctrl.deleteFile($index, $event)"><md-icon md-font-set="material-icons">delete_forever</md-icon><md-tooltip md-direction="bottom">Apagar Arquivo</md-tooltip></md-button></div></md-list-item><md-divider></md-divider></md-content></md-list></div></md-content>',
      controller: Controller,
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    });

  Controller.$inject = [
    '$mdToast',
    '$q',
    '$mdDialog',
    'otusjs.player.data.activity.CurrentItemService',
    'otusjs.utils.FileUploadFactory',
    '$scope',
    'otusjs.surveyItem.customAnswer.FileUploadAnswerFactory',
  ];

  function Controller($mdToast, $q, $mdDialog, CurrentItemService, FileUploadService, $scope, FileUploadAnswerFactory) {
    var self = this;

    var _uploadInterface;
    var _questionID;
    var _pendingArrayControl;
    var _deleteDialog;
    var _deleteError;

    /* Public Interface */
    self.$onInit = onInit;
    self.popFromPending = popFromPending;
    self.uploadFile = uploadFile;
    self.uploadMultiple = uploadMultiple;
    self.downloadFile = downloadFile;
    self.deleteFile = deleteFile;
    self.clear = clear;
    self.cancelUpload = cancelUpload;

    function onInit() {
      var answerFiles = CurrentItemService.getFilling().answer.value || [];
      self.sentFiles = FileUploadAnswerFactory.buildFromJson(answerFiles);
      self.pendingList = [];
      self.promise = 0;
      self.uploadConfig = {
        callback: _populatePendingList,
        type: 'any',
        multiple: true
      };
      self.otusQuestion.answer = self;

      _uploadInterface = FileUploadService.getUploadInterface();
      _questionID = CurrentItemService.getItem().templateID;
      _deleteDialog = _createDeleteDialog();
      _pendingArrayControl = 0;
      self.pendingCounter = 0;
    }


    function popFromPending(idx) {
      return self.pendingList.splice(idx, 1);
    }

    function cancelUpload(controlIndex) {
      _uploadInterface.cancelRequest(controlIndex);
      _updateView();
    }

    function uploadMultiple() {
      for (var i = 0; i < self.pendingList.length; i++) {
        uploadFile(i);
      }
    }

    function uploadFile(idx) {
      var file = self.pendingList[idx];
      file.status = 'uploading';

      self.pendingCounter++;

      _uploadInterface.uploadFile(file, _questionID)
      .then(function(response) {
        var _oid = response.data.data;
        self.pendingCounter--;
        var fileInfo = _removeFile(file);
        fileInfo.oid = _oid;
        self.sentFiles.push(FileUploadAnswerFactory.buildAnswer(fileInfo));
        _updateView();
        _updateAnswer();
      }, function(err) {
        _toastError('enviar');
        file.status = 'pending';
        self.pendingCounter--;
      });
    }

    function _removeFile(file) {
      var idx = self.pendingList.indexOf(file);
      return self.pendingList.splice(idx, 1)[0];
    }

    function downloadFile(idx) {
      var fileInfo = self.sentFiles[idx];
      _uploadInterface.getFile(fileInfo)
        .then(function(responseBlob) {
          var link = document.createElement('a');
          var downloadUrl = URL.createObjectURL(responseBlob);
          link.setAttribute('href', downloadUrl);
          link.download = responseBlob.name;
          document.body.appendChild(link);
          link.click();
        }, function(err) {
          _toastError('transferir');
        });
    }

    function deleteFile(idx) {
      var file = self.sentFiles[idx];
      _showConfirm(event).then(function() {
        _uploadInterface.deleteFile(file.oid)
          .then(function(response) {
            self.sentFiles.splice(idx, 1);
            _updateAnswer();
          }, function(err) {
            _toastError('excluir');
          });
      }, function() {});
    }

    var _toastLocker = {
      enviar: false,
      transferir: false,
      excluir: false
   };

    function _toastError(action) {
      if (!_toastLocker[action]) {
        _toastLocker[action] = true;
        var toast = $mdToast.show($mdToast.simple()
          .textContent('Erro ao ' + action + ' um ou mais arquivos!')
          .hideDelay(3000));
        toast.then(function(log) {
          _toastLocker[action] = false;
        });
      }
    }

    function _showConfirm() {
      return $mdDialog.show(_deleteDialog);
    }

    function _createDeleteDialog() {
      return $mdDialog.confirm()
        .title('Exclusão de Arquivo')
        .textContent('O arquivo será excluído permanentemente da base de dados.')
        .ariaLabel('Confirmar exclusão')
        .ok('Excluir Arquivo')
        .cancel('Cancelar');
    }

    function _populatePendingList(filesArray) {
      self.pendingList = self.pendingList.concat(filesArray.map(function(file) {
        file.status = 'pending';
        file.control = _pendingArrayControl++;
        return file;
      }));
      _updateView();
    }

    function _updateView() {
      var phase = $scope.$root.$$phase;
      if (phase == '$apply' || phase == '$digest') {
        return;
      } else {
        $scope.$apply();
      }
    }

    function _updateAnswer() {
      if (self.sentFiles.length) {
        self.onUpdate({
          valueType: 'answer',
          value: self.sentFiles
        });
      } else {
        self.onUpdate({
          valueType: 'answer',
          value: {}
        });
      }
    }

    function clear() {
      self.pendingList = [];
      _pendingArrayControl = 0;
    }

  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusAutocompleteQuestion', {
      template:'<md-content layout-padding><div layout="row" style="margin-top: 15px" layout-fill><div layout="column" flex><p layout="row" ng-hide="$ctrl.dataReady || $ctrl.dataError">Aguarde. Preparando lista de opções.</p><p layout="row" md-warn ng-show="$ctrl.dataError">Erro ao carregar opções.</p><md-autocomplete flex ng-disabled="!$ctrl.dataReady || $ctrl.answer" md-search-text="$ctrl.autoCompleteSettings.searchText" md-selected-item="$ctrl.answer" md-selected-item-change="$ctrl.update()" md-items="meds in $ctrl.searchQuery($ctrl.autoCompleteSettings.searchText)" md-item-text="meds.value" md-min-length="3" placeholder="Inicie a digitação"><md-item-template layout-fill flex><span md-highlight-text="$ctrl.autoCompleteSettings.searchText" md-highlight-flags="gi">{{meds.value}}</span></md-item-template><md-not-found><span ng-click="$ctrl.setOther()">"{{$ctrl.autoCompleteSettings.searchText}}" não encontrado. Clique para responder com "Outro"</span></md-not-found></md-autocomplete></div></div></md-content>',
      controller: Controller,
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    });

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService',
    'otusjs.utils.DatasourceService',
    'otusjs.utils.SearchQueryFactory'
  ];

  function Controller(CurrentItemService, DatasourceService, SearchQueryFactory) {
    var self = this;
    var _datasource = [];

    /* Question Methods */
    self.$onInit = function() {
      self.dataReady = false;
      self.answer = CurrentItemService.getFilling().answer.value;
      self.otusQuestion.answer = self;
      _setupDatasourceQuery();
    };

    self.update = function() {
      var _answerUpdate;
      if (!self.answer) {
         _answerUpdate = null;
     } else{
        _answerUpdate = self.answer.value;
     }
      self.onUpdate({
        valueType: 'answer',
        value: _answerUpdate
    });
    };

    self.clear = function() {
      CurrentItemService.getFilling().answer.clear();
      delete self.answer;
    };

    self.setOther = function() {
      self.answer = {value:"Outro"};
      self.update();
    };

    /* Datasource Methods */
    function _setupDatasourceQuery() {
      DatasourceService.fetchDatasources(self.itemData.templateID)
        .then(function(dataList) {
          _datasource = _datasource.concat(dataList);
          if (_datasource.length) {
            self.searchQuery = SearchQueryFactory.newStringSearch(_datasource).perform;
            self.dataReady = true;
          }
       }, function(err){
          self.dataError = true;
       });
      self.autoCompleteSettings = {
        selectedItem: null,
        searchText: "",
      };
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusGridTextQuestion', {
      template:'<div ng-repeat="line in ::$ctrl.itemData.getLinesList()" ng-init="outerIndex=$index" layout="row" flex><div ng-repeat="gridText in ::line.getGridTextList()" ng-init="innerIndex=$index" layout-padding layout="row" flex><md-input-container flex><label>{{ ::gridText.label.ptBR.formattedText }}</label><div><textarea ng-model="$ctrl.answerArray[outerIndex][innerIndex].value" ng-blur="$ctrl.update(outerIndex, innerIndex)"></textarea></div><div style="color: gray;">{{::gridText.unit.ptBR.plainText}}</div></md-input-container></div></div>',
      controller: Controller,
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    });

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function Controller(CurrentItemService) {
    var self = this;

    /* Public Interface */
    self.$onInit = onInit;
    self.update = update;
    self.clear = clear;

    function onInit() {
      self.answerArray = CurrentItemService.getFilling().answer.value;
      self.otusQuestion.answer = self;
      _fixArray();
    }

    function update(outerIndex, innerIndex) {
      if (!_checkIfAnswered()) {
        clear();
        self.onUpdate({
          valueType: 'answer',
          value: null
        });
      } else {
        assignNullsToEmptyValues();
        self.onUpdate({
          valueType: 'answer',
          value: self.answerArray
        });
      }
    }

    function _fixArray() {
      if (!self.answerArray) {
        self.answerArray = [[]];

        self.itemData.getLinesList().forEach(function (line, outerIndex) {
          self.answerArray[outerIndex] = [];
          line.getGridTextList().forEach(function (gridText, innerIndex) {
            self.answerArray[outerIndex][innerIndex] = _buildAnswerObject(gridText);
          });
        });
      }
    }

    function _buildAnswerObject(gridText) {
      return {
        objectType: 'GridTextAnswer',
        gridText: gridText.customID,
        value: (gridText.value === undefined || gridText.value === '') ? null : gridText.value
      };
    }

    function _checkIfAnswered() {
      var result = false;
      self.itemData.getLinesList().forEach(function (line, outerIndex) {
        line.getGridTextList().forEach(function (gridText, innerIndex) {
          if (self.answerArray[outerIndex][innerIndex].value && self.answerArray[outerIndex][innerIndex].value !== null) {
            result = true;
          }
        });
      });
      return result;
    }

    function assignNullsToEmptyValues() {
      self.itemData.getLinesList().forEach(function (line, outerIndex) {
        line.getGridTextList().forEach(function (gridText, innerIndex) {
          if (self.answerArray[outerIndex][innerIndex].value === '') {
            self.answerArray[outerIndex][innerIndex].value = null;
          }
        });
      });
    }

    function clear() {
      CurrentItemService.getFilling().answer.clear();
      delete self.answerArray;
      _fixArray();
    }
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusGridIntegerQuestion', {
      template:'<div ng-repeat="line in ::$ctrl.itemData.getLinesList()" ng-init="outerIndex=$index" layout="row" flex><div ng-repeat="gridNumber in ::line.getGridIntegerList()" ng-init="innerIndex=$index" layout-padding layout="row" flex><md-input-container flex><label>{{ ::gridNumber.label.ptBR.formattedText }}</label><div><input type="text" numbers-only ng-model="$ctrl.answerArray[outerIndex][innerIndex].value" ng-blur="$ctrl.update(outerIndex, innerIndex)"></div><div style="color: gray;">{{::gridNumber.unit.ptBR.plainText}}</div></md-input-container></div></div>',
      controller: Controller,
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    });

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function Controller(CurrentItemService) {
    var self = this;

    /* Public Interface */
    self.$onInit = onInit;
    self.update = update;
    self.clear = clear;

    function onInit() {
      self.answerArray = CurrentItemService.getFilling().answer.value;
      self.otusQuestion.answer = self;
      _fixArray();
    }

    function update(outerIndex, innerIndex) {
      assignNullsToEmptyValues();
      if (!_checkIfAnswered()) {
        clear();
        self.onUpdate({
          valueType: 'answer',
          value: null
        });
      } else {
        self.onUpdate({
          valueType: 'answer',
          value: self.answerArray
        });
      }
    }

    function _fixArray() {
      if (!Array.isArray(self.answerArray)) {
        self.answerArray = [
          []
        ];

        self.itemData.getLinesList().forEach(function (line, outerIndex) {
          self.answerArray[outerIndex] = [];
          line.getGridIntegerList().forEach(function (gridInteger,
            innerIndex) {
            self.answerArray[outerIndex][innerIndex] =
              _buildAnswerObject(gridInteger);
          });
        });
      }
    }

    function _buildAnswerObject(gridInteger) {
      return {
        objectType: 'GridIntegerAnswer',
        customID: gridInteger.customID,
        value: (gridInteger.value === undefined || gridInteger.value === '') ? null : Number(gridInteger.value)
      };
    }

    function _checkIfAnswered() {
      var result = false;
      self.itemData.getLinesList().forEach(function (line, outerIndex) {
        line.getGridIntegerList().forEach(function (gridInteger,
          innerIndex) {
          if (self.answerArray[outerIndex][innerIndex].value !== null) {
            result = true;
          }
        });
      });
      return result;
    }

    function assignNullsToEmptyValues() {
      self.itemData.getLinesList().forEach(function (line, outerIndex) {
        line.getGridIntegerList().forEach(function (gridInteger,
          innerIndex) {
          if (self.answerArray[outerIndex][innerIndex].value === '' || self
            .answerArray[outerIndex][innerIndex].value === undefined) {
            self.answerArray[outerIndex][innerIndex].value = null;
          }
        });
      });
    }

    function clear() {
      CurrentItemService.getFilling().answer.clear();
      delete self.answerArray;
      _fixArray();
    }
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .directive('numbersOnly', function() {
      return {
        require: 'ngModel',
        link: function(scope, element, attr, ngModelCtrl) {
          function fromUser(text) {
            if (text) {
              var stringfiedText = String(text);
              var transformedInput = stringfiedText.replace(/[^0-9]/g, '');
              if (transformedInput !== stringfiedText) {
                ngModelCtrl.$setViewValue(transformedInput);
                ngModelCtrl.$render();
              }
              return Number(transformedInput);
            }
            return undefined;
          }
          ngModelCtrl.$parsers.push(fromUser);
        }
      };
    });
}());

(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusMiscItem', {
            template:'<div ng-if="$ctrl.isImageItem()" layout="column" layout-align="center center" layout-padding><otus-image-item item-data="$ctrl.itemData"></otus-image-item></div><div ng-if="$ctrl.isTextItem()" layout="column" layout-padding><otus-text-item item-data="$ctrl.itemData"></otus-text-item></div>',
            controller: OtusMiscItemController,
            bindings: {
                itemData : '<'
            }
        });

    function OtusMiscItemController() {
        var self = this;

        self.isImageItem = isImageItem;
        self.isTextItem = isTextItem;

        function isImageItem() {
            return self.itemData.objectType === 'ImageItem' ? true : false;
        }

        function isTextItem() {
            return self.itemData.objectType === 'TextItem' ? true : false;
        }

        self.$onInit = function() {};
    }

})();

(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusImageItem', {
            template:'<img ng-src="{{$ctrl.itemData.url}}" layout="row"><otus-label class="md-headline" item-label="$ctrl.itemData.footer.ptBR.formattedText"></otus-label>',
            controller: ImageItemController,
            bindings: {
                itemData : '<'
            }
        });

    function ImageItemController() {
        var self = this;

        self.$onInit = function() {};
    }

})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusTextItem', {
      template:'<div><label class="md-headline" ng-bind-html="$ctrl.trustedHtml($ctrl.itemData.value.ptBR.formattedText)"></label></div>',
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

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusValidationError', {
      template:'<ng-messages layout="column" layout-align="end start" for="$ctrl.$error" layout-padding ng-messages-multiple role="alert"><ng-message class="md-button md-warn" when="mandatory"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">Questão de preenchimento obrigatório</span></ng-message><ng-message class="md-button md-warn" when="distinct"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">Insira um valor diferente de {{ $ctrl.reference(\'distinct\') }}</span></ng-message><ng-message class="md-button md-warn" when="lowerLimit"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">O valor deve ser maior ou igual a {{ $ctrl.reference(\'lowerLimit\') }}</span></ng-message><ng-message class="md-button md-warn" when="upperLimit"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">O valor deve ser menor ou igual a {{ $ctrl.reference(\'upperLimit\') }}</span></ng-message><ng-message class="md-button md-warn" when="rangeDate"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">O valor deve ser maior que {{ $ctrl.referenceAsDate(\'rangeDate\').initial }} e menor que {{ $ctrl.referenceAsDate(\'rangeDate\').end }}</span></ng-message><ng-message class="md-button md-warn" when="maxDate"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">A data deve ser menor que {{ $ctrl.referenceAsDate(\'maxDate\')}}</span></ng-message><ng-message class="md-button md-warn" when="minDate"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">A data deve ser maior que {{ $ctrl.referenceAsDate(\'minDate\')}}</span></ng-message><ng-message class="md-button md-warn" when="pastDate"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">A data deve ser anterior à data corrente</span></ng-message><ng-message class="md-button md-warn" when="futureDate"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">A data deve ser posterior à data corrente</span></ng-message><ng-message class="md-button md-warn" when="minLength"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">Resposta deve ter no mínimo {{ $ctrl.reference(\'minLength\') }} caracteres</span></ng-message><ng-message class="md-button md-warn" when="maxLength"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">Resposta deve ter no máximo {{ $ctrl.reference(\'maxLength\') }} caracteres</span></ng-message><ng-message class="md-button md-warn" when="in"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">O valor deve ser maior ou igual a {{ $ctrl.reference(\'in\').initial }} e menor ou igual a {{ $ctrl.reference(\'in\').end }}</span></ng-message><ng-message class="md-button md-warn" when="precision"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">Resposta deve conter exatamente {{ $ctrl.reference(\'precision\') }} dígitos</span></ng-message><ng-message class="md-button md-warn" when="scale"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">Resposta deve conter exatamente {{ $ctrl.reference(\'scale\') }} casas decimais</span></ng-message><ng-message class="md-button md-warn" when="maxTime"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">Hora máxima permitida: {{ $ctrl.referenceAsTime(\'maxTime\') }}</span></ng-message><ng-message class="md-button md-warn" when="minTime"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">Hora mínima permitida: {{ $ctrl.referenceAsTime(\'minTime\') }}</span></ng-message><ng-message class="md-button md-warn" when="quantity"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">Quantidade selecionada deve ser igual a {{ $ctrl.reference(\'quantity\') }}</span></ng-message><ng-message class="md-button md-warn" when="minSelected"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">Quantidade mínima selecionada deve ser {{ $ctrl.reference(\'minSelected\') }}</span></ng-message><ng-message class="md-button md-warn" when="maxSelected"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">Quantidade máxima selecionada deve ser {{ $ctrl.reference(\'maxSelected\')}}</span></ng-message><ng-message class="md-button md-warn" when="ImmutableDate"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">Formato Inválido</span></ng-message></ng-messages>',
      controller: otusValidationErrorController,
      bindings: {
        $error: '=error'
      },
      require: {
        otusSurveyItem: '^otusSurveyItem'
      }
    });

  otusValidationErrorController.$inject = [
    'otusjs.player.data.activity.CurrentItemService',
    '$filter',
    '$element'
  ];

  function otusValidationErrorController(CurrentItemService, $filter, $element) {
    var self = this;

    self.$onInit = function() {
      self.otusSurveyItem.errorComponent = self;
    };

    self.referenceAsDate = function(type) {
      var reference = CurrentItemService.getFillingRules()[type].data.reference;
      var date;
      if (type === 'rangeDate') {
        date = {
          'initial': $filter('date')(new Date(reference.initial.value), 'dd/MM/yyyy'),
          'end': $filter('date')(new Date(reference.end.value), 'dd/MM/yyyy')
        };
      } else {
        date = $filter('date')(new Date(reference.value), 'dd/MM/yyyy');
      }
      return date;
    };

    self.referenceAsTime = function(type) {
      var reference = CurrentItemService.getFillingRules()[type].data.reference.value;
      return $filter('date')(new Date(reference), 'hh:mm a');
    };

    self.reference = function(type) {
      var reference = CurrentItemService.getFillingRules()[type].data.reference;
      return reference;
    };

    self.focus = function() {
      $element.focus();
    };
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusQuestionMenu', {
      template:'<md-fab-speed-dial style="position:absolute; top:90px; right:0; transform: translate(0%, 0%);" md-direction="left" class="md-scale"><md-fab-trigger><md-button class="md-fab md-mini md-raised" aria-label="Limpar Resposta"><md-icon>delete</md-icon><md-tooltip md-direction="down">Limpar</md-tooltip></md-button></md-fab-trigger><md-fab-actions><md-button ng-click="$ctrl.clear(\'comment\')" class="md-fab md-raised md-mini" aria-label="Comentario"><md-icon>comment</md-icon><md-tooltip md-direction="down">Limpar comentário</md-tooltip></md-button><md-button ng-click="$ctrl.clear(\'metadata\')" class="md-fab md-raised md-mini" aria-label="Metadado"><md-icon>label</md-icon><md-tooltip md-direction="down">Limpar metadata</md-tooltip></md-button><md-button ng-click="$ctrl.clear(\'answer\')" class="md-fab md-raised md-mini" aria-label="Questão"><md-icon>question_answer</md-icon><md-tooltip md-direction="down">Limpar resposta</md-tooltip></md-button></md-fab-actions></md-fab-speed-dial><md-button id="accept-button" ng-class="{ \'md-primary\': $ctrl.forceAnswer, \'md-raised\': !$ctrl.forceAnswer }" style="position:absolute; top:30px; right:0; transform: translate(0%, 0%);" ng-click="$ctrl.showConfirm($event)" ng-show="$ctrl.showAccept()" class="md-fab md-mini md-raised" aria-label="Aceitar resposta"><md-icon>check</md-icon><md-tooltip md-direction="down">Aceitar resposta</md-tooltip></md-button>',
      controller: OtusSurveyMenuController,
      bindings: {
        onClear: '&',
        onAccept: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    });

  OtusSurveyMenuController.$inject = [
    '$mdDialog',
    '$mdMedia'
  ];

  function OtusSurveyMenuController($mdDialog, $mdMedia) {
    var self = this;
    self.forceAnswer = false;

    /* Public methods */
    self.showAccept = showAccept;

    self.$onInit = function() {
      self.otusQuestion.menuComponent = self;
      _enableDialogSettings();
      _disableDialogSettings();

      self.forceAnswer = self.otusQuestion.menuComponent.otusQuestion.filling.forceAnswer;
    };

    self.clear = function(value) {
      self.onClear({
        value: value
      });
    };

    self.showConfirm = function(ev) {
      if (!self.forceAnswer) {
        $mdDialog
          .show(self.enableDialogSettings)
          .then(
            _enableForwardSuccessfulExecution,
            _enableForwardUnsuccessfulExecution
          );

        return {
          onConfirm: function(callback) {
            self.callback = callback;
          }
        };
      } else {
        $mdDialog
          .show(self.disableDialogSettings)
          .then(
            _disableForwardSuccessfulExecution,
            _disableForwardUnsuccessfulExecution
          );

        return {
          onConfirm: function(callback) {
            self.callback = callback;
          }
        };
      }
    };

    function _enableForwardSuccessfulExecution(response) {
      if (response.action !== 'cancel') {
        self.onAccept({
          value: true
        });
        self.forceAnswer = true;
      }
    }

    function _enableForwardUnsuccessfulExecution(error) {}

    function _disableForwardSuccessfulExecution(response) {
      if (response.action !== 'cancel') {
        self.onAccept({
          value: false
        });
        self.forceAnswer = false;
      }
    }

    function _disableForwardUnsuccessfulExecution(error) {}

    function _enableDialogSettings() {
      self.enableDialogSettings = {
        parent: angular.element(document.body),
        template:'<div class="md-padding" ng-cloak><md-dialog-content><h2 class="md-title">Questão fora dos limites estabelecidos</h2><p class="md-body-1">Você deseja <b>ignorar a validação</b> e aceitar a resposta?</p></md-dialog-content><md-dialog-actions><md-button class="md-raised" ng-click="controller.cancel({ action: \'cancel\' })">Cancelar</md-button><md-button class="md-raised md-primary" aria-label="Aceitar resposta" ng-click="controller.event({ action: \'true\' })">Aceitar</md-button></md-dialog-actions></div>',
        controller: DialogController,
        controllerAs: 'controller',
        openFrom: '#system-toolbar',
        closeTo: {
          bottom: 0
        }
      };
    }

    function _disableDialogSettings() {
      self.disableDialogSettings = {
        parent: angular.element(document.body),
        template:'<div class="md-padding" ng-cloak><md-dialog-content><h2 class="md-title">Questão fora dos limites estabelecidos</h2><p class="md-body-1">Você deseja <b>remover a ação</b> de aceitar a resposta?</p></md-dialog-content><md-dialog-actions><md-button class="md-raised" ng-click="controller.cancel({ action: \'cancel\' })">Cancelar</md-button><md-button class="md-raised md-primary" aria-label="Aceitar resposta" ng-click="controller.event({ action: \'false\' })">Remover</md-button></md-dialog-actions></div>',
        controller: DialogController,
        controllerAs: 'controller',
        openFrom: '#system-toolbar',
        closeTo: {
          bottom: 0
        }
      };
    }

    function showAccept() {
      return (self.error && self.forceAnswer) || (self.error && self.otusQuestion.isAccept()) || self.forceAnswer;
    }

  }

  function DialogController($mdDialog) {
    var self = this;

    /* Public interface */
    self.cancel = cancel;
    self.event = event;

    function cancel(response) {
      $mdDialog.hide(response);
    }

    function event(response) {
      $mdDialog.hide(response);
    }
  }

})();

(function () {
  angular.module('otusjs.player.component')
    .component('answerView',{
      template:'<md-card flex layout="row"><md-card-header layout-fill style="padding: 0 !important;"><md-card><md-card-content><md-icon md-font-set="material-icons" class="material-icons ng-binding md-layoutTheme-theme">{{icon}}</md-icon></md-card-content></md-card><span></span><md-card-header-text layout-align="center start"><span class="md-title">{{label}}</span> <span class="md-subhead">{{answer}}</span> <span class="md-subhead">{{comment}}</span></md-card-header-text></md-card-header><md-button class="md-icon-button" ng-click="$ctrl.goBack()"><md-icon md-font-set="material-icons" class="material-icons ng-binding md-layoutTheme-theme">edit</md-icon></md-button></md-card>',
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
(function() {
  'use strict';

  angular
    .module('otusjs.player.core', [
      'otusjs.player.core.phase',
      'otusjs.player.core.player',
      'otusjs.player.core.renderer',
      'otusjs.player.core.scaffold',
      'otusjs.player.core.step',
      'otusjs.player.data'
    ]);

}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.phase', []);

}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.phase')
    .service('otusjs.player.core.phase.ActionPipeService', Service);

  function Service() {
    var self = this;
    self.pipe = {};
    self.flowData = {};

    /* Public methods */
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.phase')
    .service('otusjs.player.core.phase.AheadActionService', Service);

  Service.$inject = [
    'otusjs.player.core.phase.ActionPipeService',
    'otusjs.player.core.phase.PreAheadActionService',
    'otusjs.player.core.phase.ExecutionAheadActionService',
    'otusjs.player.core.phase.PostAheadActionService'
  ];

  function Service(ActionPipeService, PreAheadActionService, ExecutionAheadActionService, PostAheadActionService) {
    var self = this;

    /* Public methods */
    self.PreAheadActionService = PreAheadActionService;
    self.ExecutionAheadActionService = ExecutionAheadActionService;
    self.PostAheadActionService = PostAheadActionService;
    self.execute = execute;

    function execute() {
      ActionPipeService.flowData.flowDirection = 'ahead';
      var phaseData = PreAheadActionService.execute(ActionPipeService.flowData);
      phaseData = ExecutionAheadActionService.execute(phaseData);
      phaseData = PostAheadActionService.execute(phaseData);
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.phase')
    .service('otusjs.player.core.phase.ExecutionAheadActionService', Service);

  Service.$inject = [
    'otusjs.player.core.scaffold.ChainFactory',
    'otusjs.player.core.scaffold.ChainLinkFactory'
  ];

  function Service(ChainFactory, ChainLinkFactory) {
    var self = this;
    var _stepChain = ChainFactory.create();

    self.isFlowing = true;

    /* Public methods */
    self.pipe = pipe;
    self.execute = execute;
    self.stopFlow = stopFlow;

    function pipe(step) {
      var link = ChainLinkFactory.create();
      link.setPreExecute(step.beforeEffect);
      link.setExecute(step.effect);
      link.setPostExecute(step.afterEffect);
      link.setResult(step.getEffectResult);
      _stepChain.chain(link);
    }

    function execute(phaseData) {
      if (phaseData.pipe.isFlowing) {
        self.isFlowing = phaseData.pipe.isFlowing;
        self.flowData = phaseData.flowData;
        return _stepChain.execute(self, self.flowData);
      } else {
        return phaseData;
      }
    }

    function stopFlow() {
      self.isFlowing = false;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.phase')
    .service('otusjs.player.core.phase.PostAheadActionService', Service);

  Service.$inject = [
    'otusjs.player.core.scaffold.ChainFactory',
    'otusjs.player.core.scaffold.ChainLinkFactory'
  ];

  function Service(ChainFactory, ChainLinkFactory) {
    var self = this;
    var _stepChain = ChainFactory.create();

    self.isFlowing = true;

    /* Public methods */
    self.pipe = pipe;
    self.execute = execute;
    self.stopFlow = stopFlow;

    function pipe(step) {
      var link = ChainLinkFactory.create();
      link.setPreExecute(step.beforeEffect);
      link.setExecute(step.effect);
      link.setPostExecute(step.afterEffect);
      link.setResult(step.getEffectResult);
      _stepChain.chain(link);
    }

    function execute(phaseData) {
      if (phaseData.pipe.isFlowing) {
        self.isFlowing = phaseData.pipe.isFlowing;
        self.flowData = phaseData.flowData;
        return _stepChain.execute(self, self.flowData);
      } else {
        return phaseData;
      }
    }

    function stopFlow() {
      self.isFlowing = false;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.phase')
    .service('otusjs.player.core.phase.PreAheadActionService', Service);

  Service.$inject = [
    'otusjs.player.core.scaffold.ChainFactory',
    'otusjs.player.core.scaffold.ChainLinkFactory'
  ];

  function Service(ChainFactory, ChainLinkFactory) {
    var self = this;
    var _stepChain = ChainFactory.create();

    /* Public methods */
    self.pipe = pipe;
    self.execute = execute;
    self.stopFlow = stopFlow;

    function pipe(step) {
      var link = ChainLinkFactory.create();
      link.setPreExecute(step.beforeEffect);
      link.setExecute(step.effect);
      link.setPostExecute(step.afterEffect);
      link.setResult(step.getEffectResult);
      _stepChain.chain(link);
    }

    function execute(flowData) {
      self.isFlowing = true;
      return _stepChain.execute(self, flowData);
    }

    function stopFlow() {
      self.isFlowing = false;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.phase')
    .service('otusjs.player.core.phase.BackActionService', Service);

  Service.$inject = [
    'otusjs.player.core.phase.ActionPipeService',
    'otusjs.player.core.phase.PreBackActionService',
    'otusjs.player.core.phase.ExecutionBackActionService',
    'otusjs.player.core.phase.PostBackActionService'
  ];

  function Service(ActionPipeService, PreBackActionService, ExecutionBackActionService, PostBackActionService) {
    var self = this;

    /* Public methods */
    self.PreBackActionService = PreBackActionService;
    self.ExecutionBackActionService = ExecutionBackActionService;
    self.PostBackActionService = PostBackActionService;
    self.execute = execute;

    function execute() {
      ActionPipeService.flowData.flowDirection = 'back';
      var phaseData = PreBackActionService.execute(ActionPipeService.flowData);
      phaseData = ExecutionBackActionService.execute(phaseData);
      phaseData = PostBackActionService.execute(phaseData);
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.phase')
    .service('otusjs.player.core.phase.ExecutionBackActionService', Service);

  Service.$inject = [
    'otusjs.player.core.scaffold.ChainFactory',
    'otusjs.player.core.scaffold.ChainLinkFactory'
  ];

  function Service(ChainFactory, ChainLinkFactory) {
    var self = this;
    var _stepChain = ChainFactory.create();

    self.isFlowing = true;

    /* Public methods */
    self.pipe = pipe;
    self.execute = execute;
    self.stopFlow = stopFlow;

    function pipe(step) {
      var link = ChainLinkFactory.create();
      link.setPreExecute(step.beforeEffect);
      link.setExecute(step.effect);
      link.setPostExecute(step.afterEffect);
      link.setResult(step.getEffectResult);
      _stepChain.chain(link);
    }

    function execute(phaseData) {
      if (phaseData.pipe.isFlowing) {
        self.isFlowing = phaseData.pipe.isFlowing;
        self.flowData = phaseData.flowData;
        return _stepChain.execute(self, self.flowData);
      } else {
        return phaseData;
      }
    }

    function stopFlow() {
      self.isFlowing = false;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.phase')
    .service('otusjs.player.core.phase.PostBackActionService', Service);

  Service.$inject = [
    'otusjs.player.core.scaffold.ChainFactory',
    'otusjs.player.core.scaffold.ChainLinkFactory'
  ];

  function Service(ChainFactory, ChainLinkFactory) {
    var self = this;
    var _stepChain = ChainFactory.create();

    self.isFlowing = true;

    /* Public methods */
    self.pipe = pipe;
    self.execute = execute;
    self.stopFlow = stopFlow;

    function pipe(step) {
      var link = ChainLinkFactory.create();
      link.setPreExecute(step.beforeEffect);
      link.setExecute(step.effect);
      link.setPostExecute(step.afterEffect);
      link.setResult(step.getEffectResult);
      _stepChain.chain(link);
    }

    function execute(phaseData) {
      if (phaseData.pipe.isFlowing) {
        self.isFlowing = phaseData.pipe.isFlowing;
        self.flowData = phaseData.flowData;
        return _stepChain.execute(self, self.flowData);
      } else {
        return phaseData;
      }
    }

    function stopFlow() {
      self.isFlowing = false;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.phase')
    .service('otusjs.player.core.phase.PreBackActionService', Service);

  Service.$inject = [
    'otusjs.player.core.scaffold.ChainFactory',
    'otusjs.player.core.scaffold.ChainLinkFactory'
  ];

  function Service(ChainFactory, ChainLinkFactory) {
    var self = this;
    var _stepChain = ChainFactory.create();

    /* Public methods */
    self.pipe = pipe;
    self.execute = execute;
    self.stopFlow = stopFlow;

    function pipe(step) {
      var link = ChainLinkFactory.create();
      link.setPreExecute(step.beforeEffect);
      link.setExecute(step.effect);
      link.setPostExecute(step.afterEffect);
      link.setResult(step.getEffectResult);
      _stepChain.chain(link);
    }

    function execute(flowData) {
      self.isFlowing = true;
      return _stepChain.execute(self, flowData);
    }

    function stopFlow() {
      self.isFlowing = false;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.phase')
    .service('otusjs.player.core.phase.EjectActionService', Service);

  Service.$inject = [
    'otusjs.player.core.phase.ActionPipeService',
    'otusjs.player.core.phase.PreEjectActionService',
    'otusjs.player.core.phase.ExecutionEjectActionService',
    'otusjs.player.core.phase.PostEjectActionService'
  ];

  function Service(ActionPipeService, PreEjectActionService, ExecutionEjectActionService, PostEjectActionService) {
    var self = this;

    /* Public methods */
    self.PreEjectActionService = PreEjectActionService;
    self.ExecutionEjectActionService = ExecutionEjectActionService;
    self.PostEjectActionService = PostEjectActionService;
    self.execute = execute;

    function execute() {
      var phaseData = PreEjectActionService.execute(ActionPipeService.flowData);
      phaseData = ExecutionEjectActionService.execute(phaseData);
      phaseData = PostEjectActionService.execute(phaseData);
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.phase')
    .service('otusjs.player.core.phase.ExecutionEjectActionService', Service);

  Service.$inject = [
    'otusjs.player.core.scaffold.ChainFactory',
    'otusjs.player.core.scaffold.ChainLinkFactory'
  ];

  function Service(ChainFactory, ChainLinkFactory) {
    var self = this;
    var _stepChain = ChainFactory.create();

    self.isFlowing = true;

    /* Public methods */
    self.pipe = pipe;
    self.execute = execute;
    self.stopFlow = stopFlow;

    function pipe(step) {
      var link = ChainLinkFactory.create();
      link.setPreExecute(step.beforeEffect);
      link.setExecute(step.effect);
      link.setPostExecute(step.afterEffect);
      link.setResult(step.getEffectResult);
      _stepChain.chain(link);
    }

    function execute(phaseData) {
      if (phaseData.pipe.isFlowing) {
        self.isFlowing = phaseData.pipe.isFlowing;
        self.flowData = phaseData.flowData;
        return _stepChain.execute(self, self.flowData);
      } else {
        return phaseData;
      }
    }

    function stopFlow() {
      self.isFlowing = false;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.phase')
    .service('otusjs.player.core.phase.PostEjectActionService', Service);

  Service.$inject = [
    'otusjs.player.core.scaffold.ChainFactory',
    'otusjs.player.core.scaffold.ChainLinkFactory'
  ];

  function Service(ChainFactory, ChainLinkFactory) {
    var self = this;
    var _stepChain = ChainFactory.create();

    self.isFlowing = true;

    /* Public methods */
    self.pipe = pipe;
    self.execute = execute;
    self.stopFlow = stopFlow;

    function pipe(step) {
      var link = ChainLinkFactory.create();
      link.setPreExecute(step.beforeEffect);
      link.setExecute(step.effect);
      link.setPostExecute(step.afterEffect);
      link.setResult(step.getEffectResult);
      _stepChain.chain(link);
    }

    function execute(phaseData) {
      if (phaseData.pipe.isFlowing) {
        self.isFlowing = phaseData.pipe.isFlowing;
        self.flowData = phaseData.flowData;
        return _stepChain.execute(self, self.flowData);
      } else {
        return phaseData;
      }
    }

    function stopFlow() {
      self.isFlowing = false;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.phase')
    .service('otusjs.player.core.phase.PreEjectActionService', Service);

  Service.$inject = [
    'otusjs.player.core.scaffold.ChainFactory',
    'otusjs.player.core.scaffold.ChainLinkFactory'
  ];

  function Service(ChainFactory, ChainLinkFactory) {
    var self = this;
    var _stepChain = ChainFactory.create();

    self.isFlowing = true;

    /* Public methods */
    self.pipe = pipe;
    self.execute = execute;
    self.stopFlow = stopFlow;

    function pipe(step) {
      var link = ChainLinkFactory.create();
      link.setPreExecute(step.beforeEffect);
      link.setExecute(step.effect);
      link.setPostExecute(step.afterEffect);
      link.setResult(step.getEffectResult);
      _stepChain.chain(link);
    }

    function execute(flowData) {
      self.isFlowing = true;
      return _stepChain.execute(self, flowData);
    }

    function stopFlow() {
      self.isFlowing = false;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.phase')
    .service('otusjs.player.core.phase.PlayActionService', Service);

  Service.$inject = [
    'otusjs.player.core.phase.ActionPipeService',
    'otusjs.player.core.phase.PrePlayActionService',
    'otusjs.player.core.phase.ExecutionPlayActionService',
    'otusjs.player.core.phase.PostPlayActionService'
  ];

  function Service(ActionPipeService, PrePlayActionService, ExecutionPlayActionService, PostPlayActionService) {
    var self = this;

    /* Public methods */
    self.PrePlayActionService = PrePlayActionService;
    self.ExecutionPlayActionService = ExecutionPlayActionService;
    self.PostPlayActionService = PostPlayActionService;
    self.execute = execute;

    function execute() {
      var phaseData = PrePlayActionService.execute(ActionPipeService.flowData);
      phaseData = ExecutionPlayActionService.execute(phaseData);
      phaseData = PostPlayActionService.execute(phaseData);
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.phase')
    .service('otusjs.player.core.phase.ExecutionPlayActionService', Service);

  Service.$inject = [
    'otusjs.player.core.scaffold.ChainFactory',
    'otusjs.player.core.scaffold.ChainLinkFactory'
  ];

  function Service(ChainFactory, ChainLinkFactory) {
    var self = this;
    var _stepChain = ChainFactory.create();

    self.isFlowing = true;

    /* Public methods */
    self.pipe = pipe;
    self.execute = execute;
    self.stopFlow = stopFlow;

    function pipe(step) {
      var link = ChainLinkFactory.create();
      link.setPreExecute(step.beforeEffect);
      link.setExecute(step.effect);
      link.setPostExecute(step.afterEffect);
      link.setResult(step.getEffectResult);
      _stepChain.chain(link);
    }

    function execute(phaseData) {
      if (phaseData.pipe.isFlowing) {
        self.isFlowing = phaseData.pipe.isFlowing;
        self.flowData = phaseData.flowData;
        return _stepChain.execute(self, self.flowData);
      } else {
        return phaseData;
      }
    }

    function stopFlow() {
      self.isFlowing = false;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.phase')
    .service('otusjs.player.core.phase.PostPlayActionService', Service);

  Service.$inject = [
    'otusjs.player.core.scaffold.ChainFactory',
    'otusjs.player.core.scaffold.ChainLinkFactory'
  ];

  function Service(ChainFactory, ChainLinkFactory) {
    var self = this;
    var _stepChain = ChainFactory.create();

    self.isFlowing = true;

    /* Public methods */
    self.pipe = pipe;
    self.execute = execute;
    self.stopFlow = stopFlow;

    function pipe(step) {
      var link = ChainLinkFactory.create();
      link.setPreExecute(step.beforeEffect);
      link.setExecute(step.effect);
      link.setPostExecute(step.afterEffect);
      link.setResult(step.getEffectResult);
      _stepChain.chain(link);
    }

    function execute(phaseData) {
      if (phaseData.pipe.isFlowing) {
        self.isFlowing = phaseData.pipe.isFlowing;
        self.flowData = phaseData.flowData;
        return _stepChain.execute(self, self.flowData);
      } else {
        return phaseData;
      }
    }

    function stopFlow() {
      self.isFlowing = false;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.phase')
    .service('otusjs.player.core.phase.PrePlayActionService', Service);

  Service.$inject = [
    'otusjs.player.core.scaffold.ChainFactory',
    'otusjs.player.core.scaffold.ChainLinkFactory'
  ];

  function Service(ChainFactory, ChainLinkFactory) {
    var self = this;
    var _stepChain = ChainFactory.create();

    self.isFlowing = true;

    /* Public methods */
    self.pipe = pipe;
    self.execute = execute;
    self.stopFlow = stopFlow;

    function pipe(step) {
      var link = ChainLinkFactory.create();
      link.setPreExecute(step.beforeEffect);
      link.setExecute(step.effect);
      link.setPostExecute(step.afterEffect);
      link.setResult(step.getEffectResult);
      _stepChain.chain(link);
    }

    function execute(flowData) {
      self.isFlowing = true;
      return _stepChain.execute(self, flowData);
    }

    function stopFlow() {
      self.isFlowing = false;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.phase')
    .service('otusjs.player.core.phase.SaveActionService', Service);

  Service.$inject = [
    'otusjs.player.core.phase.ActionPipeService',
    'otusjs.player.core.phase.PreSaveActionService',
    'otusjs.player.core.phase.ExecutionSaveActionService',
    'otusjs.player.core.phase.PostSaveActionService'
  ];

  function Service(ActionPipeService, PreSaveActionService, ExecutionSaveActionService, PostSaveActionService) {
    var self = this;

    /* Public methods */
    self.PreSaveActionService = PreSaveActionService;
    self.ExecutionSaveActionService = ExecutionSaveActionService;
    self.PostSaveActionService = PostSaveActionService;
    self.execute = execute;

    function execute() {
      var phaseData = PreSaveActionService.execute(ActionPipeService.flowData);
      phaseData = ExecutionSaveActionService.execute(phaseData);
      phaseData = PostSaveActionService.execute(phaseData);
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.phase')
    .service('otusjs.player.core.phase.ExecutionSaveActionService', Service);

  Service.$inject = [
    'otusjs.player.core.scaffold.ChainFactory',
    'otusjs.player.core.scaffold.ChainLinkFactory'
  ];

  function Service(ChainFactory, ChainLinkFactory) {
    var self = this;
    var _stepChain = ChainFactory.create();

    self.isFlowing = true;

    /* Public methods */
    self.pipe = pipe;
    self.execute = execute;
    self.stopFlow = stopFlow;

    function pipe(step) {
      var link = ChainLinkFactory.create();
      link.setPreExecute(step.beforeEffect);
      link.setExecute(step.effect);
      link.setPostExecute(step.afterEffect);
      link.setResult(step.getEffectResult);
      _stepChain.chain(link);
    }

    function execute(phaseData) {
      if (phaseData.pipe.isFlowing) {
        self.isFlowing = phaseData.pipe.isFlowing;
        self.flowData = phaseData.flowData;
        return _stepChain.execute(self, self.flowData);
      } else {
        return phaseData;
      }
    }

    function stopFlow() {
      self.isFlowing = false;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.phase')
    .service('otusjs.player.core.phase.PostSaveActionService', Service);

  Service.$inject = [
    'otusjs.player.core.scaffold.ChainFactory',
    'otusjs.player.core.scaffold.ChainLinkFactory'
  ];

  function Service(ChainFactory, ChainLinkFactory) {
    var self = this;
    var _stepChain = ChainFactory.create();

    self.isFlowing = true;

    /* Public methods */
    self.pipe = pipe;
    self.execute = execute;
    self.stopFlow = stopFlow;

    function pipe(step) {
      var link = ChainLinkFactory.create();
      link.setPreExecute(step.beforeEffect);
      link.setExecute(step.effect);
      link.setPostExecute(step.afterEffect);
      link.setResult(step.getEffectResult);
      _stepChain.chain(link);
    }

    function execute(phaseData) {
      if (phaseData.pipe.isFlowing) {
        self.isFlowing = phaseData.pipe.isFlowing;
        self.flowData = phaseData.flowData;
        return _stepChain.execute(self, self.flowData);
      } else {
        return phaseData;
      }
    }

    function stopFlow() {
      self.isFlowing = false;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.phase')
    .service('otusjs.player.core.phase.PreSaveActionService', Service);

  Service.$inject = [
    'otusjs.player.core.scaffold.ChainFactory',
    'otusjs.player.core.scaffold.ChainLinkFactory'
  ];

  function Service(ChainFactory, ChainLinkFactory) {
    var self = this;
    var _stepChain = ChainFactory.create();

    self.isFlowing = true;

    /* Public methods */
    self.pipe = pipe;
    self.execute = execute;
    self.stopFlow = stopFlow;

    function pipe(step) {
      var link = ChainLinkFactory.create();
      link.setPreExecute(step.beforeEffect);
      link.setExecute(step.effect);
      link.setPostExecute(step.afterEffect);
      link.setResult(step.getEffectResult);
      _stepChain.chain(link);
    }

    function execute(flowData) {
      self.isFlowing = true;
      return _stepChain.execute(self, flowData);
    }

    function stopFlow() {
      self.isFlowing = false;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.phase')
    .service('otusjs.player.core.phase.ExecutionPlayerStartActionService', Service);

  Service.$inject = [
    'otusjs.player.core.scaffold.ChainFactory',
    'otusjs.player.core.scaffold.ChainLinkFactory'
  ];

  function Service(ChainFactory, ChainLinkFactory) {
    var self = this;
    var _stepChain = ChainFactory.create();

    self.isFlowing = true;

    /* Public methods */
    self.pipe = pipe;
    self.execute = execute;
    self.stopFlow = stopFlow;

    function pipe(step) {
      var link = ChainLinkFactory.create();
      link.setPreExecute(step.beforeEffect);
      link.setExecute(step.effect);
      link.setPostExecute(step.afterEffect);
      link.setResult(step.getEffectResult);
      _stepChain.chain(link);
    }

    function execute(phaseData) {
      if (phaseData.pipe.isFlowing) {
        self.isFlowing = phaseData.pipe.isFlowing;
        self.flowData = phaseData.flowData;
        return _stepChain.execute(self, self.flowData);
      } else {
        return phaseData;
      }
    }

    function stopFlow() {
      self.isFlowing = false;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.phase')
    .service('otusjs.player.core.phase.PlayerStartActionService', Service);

  Service.$inject = [
    'otusjs.player.core.phase.ActionPipeService',
    'otusjs.player.core.phase.PrePlayerStartActionService',
    'otusjs.player.core.phase.ExecutionPlayerStartActionService',
    'otusjs.player.core.phase.PostPlayerStartActionService'
  ];

  function Service(ActionPipeService, PrePlayerStartActionService, ExecutionPlayerStartActionService, PostPlayerStartActionService) {
    var self = this;

    /* Public methods */
    self.PrePlayerStartActionService = PrePlayerStartActionService;
    self.ExecutionPlayerStartActionService = ExecutionPlayerStartActionService;
    self.PostPlayerStartActionService = PostPlayerStartActionService;
    self.execute = execute;

    function execute() {
      var phaseData = PrePlayerStartActionService.execute(ActionPipeService.flowData);
      phaseData = ExecutionPlayerStartActionService.execute(phaseData);
      phaseData = PostPlayerStartActionService.execute(phaseData);
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.phase')
    .service('otusjs.player.core.phase.PostPlayerStartActionService', Service);

  Service.$inject = [
    'otusjs.player.core.scaffold.ChainFactory',
    'otusjs.player.core.scaffold.ChainLinkFactory'
  ];

  function Service(ChainFactory, ChainLinkFactory) {
    var self = this;
    var _stepChain = ChainFactory.create();

    self.isFlowing = true;

    /* Public methods */
    self.pipe = pipe;
    self.execute = execute;
    self.stopFlow = stopFlow;

    function pipe(step) {
      var link = ChainLinkFactory.create();
      link.setPreExecute(step.beforeEffect);
      link.setExecute(step.effect);
      link.setPostExecute(step.afterEffect);
      link.setResult(step.getEffectResult);
      _stepChain.chain(link);
    }

    function execute(phaseData) {
      if (phaseData.pipe.isFlowing) {
        self.isFlowing = phaseData.pipe.isFlowing;
        self.flowData = phaseData.flowData;
        return _stepChain.execute(self, self.flowData);
      } else {
        return phaseData;
      }
    }

    function stopFlow() {
      self.isFlowing = false;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.phase')
    .service('otusjs.player.core.phase.PrePlayerStartActionService', Service);

  Service.$inject = [
    'otusjs.player.core.scaffold.ChainFactory',
    'otusjs.player.core.scaffold.ChainLinkFactory'
  ];

  function Service(ChainFactory, ChainLinkFactory) {
    var self = this;
    var _stepChain = ChainFactory.create();

    self.isFlowing = true;

    /* Public methods */
    self.pipe = pipe;
    self.execute = execute;
    self.stopFlow = stopFlow;

    function pipe(step) {
      var link = ChainLinkFactory.create();
      link.setPreExecute(step.beforeEffect);
      link.setExecute(step.effect);
      link.setPostExecute(step.afterEffect);
      link.setResult(step.getEffectResult);
      _stepChain.chain(link);
    }

    function execute(flowData) {
      self.isFlowing = true;
      return _stepChain.execute(self, flowData);
    }

    function stopFlow() {
      self.isFlowing = false;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.phase')
    .service('otusjs.player.core.phase.ExecutionStopActionService', Service);

  Service.$inject = [
    'otusjs.player.core.scaffold.ChainFactory',
    'otusjs.player.core.scaffold.ChainLinkFactory'
  ];

  function Service(ChainFactory, ChainLinkFactory) {
    var self = this;
    var _stepChain = ChainFactory.create();

    self.isFlowing = true;

    /* Public methods */
    self.pipe = pipe;
    self.execute = execute;
    self.stopFlow = stopFlow;

    function pipe(step) {
      var link = ChainLinkFactory.create();
      link.setPreExecute(step.beforeEffect);
      link.setExecute(step.effect);
      link.setPostExecute(step.afterEffect);
      link.setResult(step.getEffectResult);
      _stepChain.chain(link);
    }

    function execute(phaseData) {
      if (phaseData.pipe.isFlowing) {
        self.isFlowing = phaseData.pipe.isFlowing;
        self.flowData = phaseData.flowData;
        return _stepChain.execute(self, self.flowData);
      } else {
        return phaseData;
      }
    }

    function stopFlow() {
      self.isFlowing = false;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.phase')
    .service('otusjs.player.core.phase.StopActionService', Service);

  Service.$inject = [
    'otusjs.player.core.phase.ActionPipeService',
    'otusjs.player.core.phase.PreStopActionService',
    'otusjs.player.core.phase.ExecutionStopActionService',
    'otusjs.player.core.phase.PostStopActionService'
  ];

  function Service(ActionPipeService, PreStopActionService, ExecutionStopActionService, PostStopActionService) {
    var self = this;

    /* Public methods */
    self.PreStopActionService = PreStopActionService;
    self.ExecutionStopActionService = ExecutionStopActionService;
    self.PostStopActionService = PostStopActionService;
    self.execute = execute;

    function execute() {
      var phaseData = PreStopActionService.execute(ActionPipeService.flowData);
      phaseData = ExecutionStopActionService.execute(phaseData);
      phaseData = PostStopActionService.execute(phaseData);
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.phase')
    .service('otusjs.player.core.phase.PostStopActionService', Service);

  Service.$inject = [
    'otusjs.player.core.scaffold.ChainFactory',
    'otusjs.player.core.scaffold.ChainLinkFactory'
  ];

  function Service(ChainFactory, ChainLinkFactory) {
    var self = this;
    var _stepChain = ChainFactory.create();

    self.isFlowing = true;

    /* Public methods */
    self.pipe = pipe;
    self.execute = execute;
    self.stopFlow = stopFlow;

    function pipe(step) {
      var link = ChainLinkFactory.create();
      link.setPreExecute(step.beforeEffect);
      link.setExecute(step.effect);
      link.setPostExecute(step.afterEffect);
      link.setResult(step.getEffectResult);
      _stepChain.chain(link);
    }

    function execute(phaseData) {
      if (phaseData.pipe.isFlowing) {
        self.isFlowing = phaseData.pipe.isFlowing;
        self.flowData = phaseData.flowData;
        return _stepChain.execute(self, self.flowData);
      } else {
        return phaseData;
      }
    }

    function stopFlow() {
      self.isFlowing = false;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.phase')
    .service('otusjs.player.core.phase.PreStopActionService', Service);

  Service.$inject = [
    'otusjs.player.core.scaffold.ChainFactory',
    'otusjs.player.core.scaffold.ChainLinkFactory'
  ];

  function Service(ChainFactory, ChainLinkFactory) {
    var self = this;
    var _stepChain = ChainFactory.create();

    self.isFlowing = true;

    /* Public methods */
    self.pipe = pipe;
    self.execute = execute;
    self.stopFlow = stopFlow;

    function pipe(step) {
      var link = ChainLinkFactory.create();
      link.setPreExecute(step.beforeEffect);
      link.setExecute(step.effect);
      link.setPostExecute(step.afterEffect);
      link.setResult(step.getEffectResult);
      _stepChain.chain(link);
    }

    function execute(flowData) {
      self.isFlowing = true;
      return _stepChain.execute(self, flowData);
    }

    function stopFlow() {
      self.isFlowing = false;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.player', [])
    .run([
      'otusjs.player.core.player.PlayerConfigurationService',
      'otusjs.player.core.step.ApplyAnswerStepService',
      'otusjs.player.core.step.ClearSkippedAnswersStepService',
      'otusjs.player.core.step.InitializeSurveyActivityStepService',
      'otusjs.player.core.step.FinalizeSurveyActivityStepService',
      'otusjs.player.core.step.SaveSurveyActivityStepService',
      'otusjs.player.core.step.LoadPreviousItemStepService',
      'otusjs.player.core.step.LoadNextItemStepService',
      'otusjs.player.core.step.UpdateItemTrackingStepService',
      'otusjs.player.core.step.LoadSurveyActivityStepService',
      'otusjs.player.core.step.LoadSurveyActivityCoverStepService',
      'otusjs.player.core.step.ReadValidationErrorStepService',
      'otusjs.player.core.step.RunValidationStepService',
      'otusjs.player.core.step.SetupValidationStepService',
      'otusjs.player.core.step.HandleValidationErrorStepService',
      run
    ]);

    function run(
      PlayerConfigurationService,
      ApplyAnswer,
      ClearSkippedAnswersStepService,
      InitializeSurveyActivity,
      FinalizeSurveyActivity,
      SaveSurveyActivity,
      LoadPreviousItem,
      LoadNextItem,
      UpdateItemTracking,
      LoadSurveyActivity,
      LoadSurveyActivityCover,
      ReadValidationError,
      RunValidation,
      SetupValidation,
      HandleValidationError) {

      /**************************************************************
       * Player Start Phase
       *
       * Here we put the configurations that will affect the phase
       * where the player is itself starting.
       * This phase is divided in three sub-phases and each one can be
       * configured separately.
       *
       **************************************************************/
      /* PreStart Phase */
      // PlayerConfigurationService.onPrePlayerStart();

      /* ExecutionStart Phase */
      PlayerConfigurationService.onPlayerStart(LoadSurveyActivity);

      /* PostStart Phase */
      // PlayerConfigurationService.onPostPlayerStart(LoadSurveyActivityCover);

      /**************************************************************
       * Play Phase
       *
       * Here we put the configurations that will affect the phase
       * where the player is starting the SurveyActiviy.
       * This phase is divided in three sub-phases and each one can be
       * configured separately.
       *
       **************************************************************/
      /* PrePlat Phase */
      // PlayerConfigurationService.onPrePlay();

      /* ExecutionPlay Phase */
      PlayerConfigurationService.onPlay(InitializeSurveyActivity);

      /* PostPlay Phase */
      PlayerConfigurationService.onPostPlay(LoadNextItem);
      PlayerConfigurationService.onPostPlay(SetupValidation);

      /**************************************************************
       * Ahead Phase
       *
       * Here we put the configurations that will affect the phase
       * where the player is moving to the next item of SurveyActiviy.
       * This phase is divided in three sub-phases and each one can be
       * configured separately.
       *
       **************************************************************/
      /* PreAhead Phase */
      PlayerConfigurationService.onPreAhead(ApplyAnswer);
      PlayerConfigurationService.onPreAhead(RunValidation);
      PlayerConfigurationService.onPreAhead(ReadValidationError);
      PlayerConfigurationService.onPreAhead(HandleValidationError);
      PlayerConfigurationService.onPreAhead(UpdateItemTracking);

      /* ExecutionAhead Phase */
      PlayerConfigurationService.onAhead(LoadNextItem);

      /* PostAhead Phase */
      PlayerConfigurationService.onPostAhead(SetupValidation);

      /**************************************************************
       * Back Phase
       *
       * Here we put the configurations that will affect the phase
       * where the player is moving to the previous item of
       * SurveyActiviy.
       * This phase is divided in three sub-phases and each one can be
       * configured separately.
       *
       **************************************************************/
      /* PreBack Phase */
      // PlayerConfigurationService.onPreBack();

      /* ExecutionBack Phase */
      PlayerConfigurationService.onBack(LoadPreviousItem);

      /* PostBack Phase */
      PlayerConfigurationService.onPostBack(SetupValidation);

      /**************************************************************
       * Save Phase
       *
       * Here we put the configurations that will affect the phase
       * where the player is saving the current state of SurveyActiviy.
       * This phase is divided in three sub-phases and each one can be
       * configured separately.
       *
       **************************************************************/
      /* PreSave Phase */
      PlayerConfigurationService.onPreSave(ApplyAnswer);
      // PlayerConfigurationService.onPreSave(UpdateItemTracking);

      /* ExecutionSave Phase */
      PlayerConfigurationService.onSave(SaveSurveyActivity);

      /* PostSave Phase */

      /**************************************************************
       * Stop Phase
       *
       * Here we put the configurations that will affect the phase
       * where the player is stoping the current SurveyActiviy.
       * This phase is divided in three sub-phases and each one can be
       * configured separately.
       *
       **************************************************************/
      /* PreBack Phase */

      /* ExecutionStop Phase */

      /* PostStop Phase */

      /**************************************************************
       * Eject Phase
       *
       * Here we put the configurations that will affect the phase
       * where the player is ejecting (finalizing) the current
       * SurveyActiviy.
       * This phase is divided in three sub-phases and each one can be
       * configured separately.
       *
       **************************************************************/
      /* PreBack Phase */

      /* ExecutionStop Phase */
      PlayerConfigurationService.onEject(ClearSkippedAnswersStepService);
      PlayerConfigurationService.onEject(FinalizeSurveyActivity);

      /* PostStop Phase */
    }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.player')
    .service('otusjs.player.core.player.PlayerConfigurationService', Service);

  Service.$inject = [
    'otusjs.player.core.phase.PlayerStartActionService',
    'otusjs.player.core.phase.PlayActionService',
    'otusjs.player.core.phase.AheadActionService',
    'otusjs.player.core.phase.BackActionService',
    'otusjs.player.core.phase.EjectActionService',
    'otusjs.player.core.phase.SaveActionService',
    'otusjs.player.core.phase.StopActionService'
  ];

  function Service(PlayerStartActionService, PlayActionService, AheadActionService, BackActionService, EjectActionService, SaveActionService, StopActionService) {
    var self = this;

    /* Public methods */
    self.onPrePlayerStart = onPrePlayerStart;
    self.onPlayerStart = onPlayerStart;
    self.onPostPlayerStart = onPostPlayerStart;
    self.onPrePlay = onPrePlay;
    self.onPlay = onPlay;
    self.onPostPlay = onPostPlay;
    self.onPreAhead = onPreAhead;
    self.onAhead = onAhead;
    self.onPostAhead = onPostAhead;
    self.onPreBack = onPreBack;
    self.onBack = onBack;
    self.onPostBack = onPostBack;
    self.onPreEject = onPreEject;
    self.onEject = onEject;
    self.onPostEject = onPostEject;
    self.onPreSave = onPreSave;
    self.onSave = onSave;
    self.onPostSave = onPostSave;
    self.onPreStop = onPreStop;
    self.onStop = onStop;
    self.onPostStop = onPostStop;

    function onPrePlayerStart(step) {
      PlayerStartActionService.PrePlayerStartActionService.pipe(step);
    }

    function onPlayerStart(step) {
      PlayerStartActionService.ExecutionPlayerStartActionService.pipe(step);
    }

    function onPostPlayerStart(step) {
      PlayerStartActionService.PostPlayerStartActionService.pipe(step);
    }

    function onPrePlay(step) {
      PlayActionService.PrePlayActionService.pipe(step);
    }

    function onPlay(step) {
      PlayActionService.ExecutionPlayActionService.pipe(step);
    }

    function onPostPlay(step) {
      PlayActionService.PostPlayActionService.pipe(step);
    }

    function onPreAhead(step) {
      AheadActionService.PreAheadActionService.pipe(step);
    }

    function onAhead(step) {
      AheadActionService.ExecutionAheadActionService.pipe(step);
    }

    function onPostAhead(step) {
      AheadActionService.PostAheadActionService.pipe(step);
    }

    function onPreBack(step) {
      BackActionService.PreBackActionService.pipe(step);
    }

    function onBack(step) {
      BackActionService.ExecutionBackActionService.pipe(step);
    }

    function onPostBack(step) {
      BackActionService.PostBackActionService.pipe(step);
    }

    function onPreEject(step) {
      EjectActionService.PreEjectActionService.pipe(step);
    }

    function onEject(step) {
      EjectActionService.ExecutionEjectActionService.pipe(step);
    }

    function onPostEject(step) {
      EjectActionService.PostEjectActionService.pipe(step);
    }

    function onPreSave(step) {
      SaveActionService.PreSaveActionService.pipe(step);
    }

    function onSave(step) {
      SaveActionService.ExecutionSaveActionService.pipe(step);
    }

    function onPostSave(step) {
      SaveActionService.PostSaveActionService.pipe(step);
    }

    function onPreStop(step) {
      StopActionService.PreStopActionService.pipe(step);
    }

    function onStop(step) {
      StopActionService.ExecutionStopActionService.pipe(step);
    }

    function onPostStop(step) {
      StopActionService.PostStopActionService.pipe(step);
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.player')
    .service('otusjs.player.core.player.PlayerService', PlayerService);

  PlayerService.$inject = [
    'otusjs.player.data.activity.ActivityFacadeService',
    'otusjs.player.core.phase.PlayerStartActionService',
    'otusjs.player.core.phase.PlayActionService',
    'otusjs.player.core.phase.AheadActionService',
    'otusjs.player.core.phase.BackActionService',
    'otusjs.player.core.phase.EjectActionService',
    'otusjs.player.core.phase.StopActionService',
    'otusjs.player.core.phase.SaveActionService'
  ];

  function PlayerService(
    ActivityFacadeService,
    PlayerStartActionService,
    PlayActionService,
    AheadActionService,
    BackActionService,
    EjectActionService,
    StopActionService,
    SaveActionService) {

    var self = this;
    var _component = null;
    var _goBackTo = null;
    var _goingBack = null;

    self.bindComponent = bindComponent;
    self.getItemData = getItemData;
    self.goAhead = goAhead;
    self.goBack = goBack;
    self.setGoBackTo = setGoBackTo;
    self.getGoBackTo = getGoBackTo;
    self.isGoingBack = isGoingBack;
    self.play = play;
    self.setup = setup;
    self.end = end;
    self.eject = eject;
    self.stop = stop;
    self.save = save;

    /**/
    self.registerPhaseBlocker = registerPhaseBlocker;
    self.getPhaseBlocker = getPhaseBlocker;
    self.clearPhaseBlocker = clearPhaseBlocker;


    var _phaseBlocker = null;
    function registerPhaseBlocker(blocker) {
      _phaseBlocker = blocker;
      _phaseBlocker.then(function(){
         getPhaseBlocker();
      });
    }

    function getPhaseBlocker(){
      return _phaseBlocker;
    }

    function clearPhaseBlocker(){
      _phaseBlocker = null;
   }

    /**/

    function bindComponent(component) {
      _component = component;
    }

    function getItemData() {
      return ActivityFacadeService.getCurrentItem().getItem();
    }

    function goAhead() {
      AheadActionService.execute();
    }

    function goBack() {
      BackActionService.execute();
    }

    function setGoBackTo(templateID) {
      if(templateID === null){
        _goingBack = false;
      } else {
        _goingBack = true;
      }
      _goBackTo = templateID;
    }

    function getGoBackTo() {
      return _goBackTo;
    }

    function isGoingBack() {
      return _goingBack;
    }

    function play() {
      PlayActionService.execute();
    }

    function setup() {
      PlayerStartActionService.execute();
    }

    function end() {
      _component.showBack();
    }

    function eject() {
      EjectActionService.execute();
    }

    function stop() {
      StopActionService.execute();
    }

    function save() {
      SaveActionService.execute();
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.renderer', []);

}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.renderer')
    .service('otusjs.player.core.renderer.HtmlBuilderService', HtmlBuilderService);

  function HtmlBuilderService() {
    var self = this;

    self.generateTagName = generateTagName;

    function generateTagName(stringToFormat) {
      var chars = stringToFormat.split('');
      var tagName = '';

      chars.forEach(function(character, index) {
        var lowerChar = '';

        if (character === character.toUpperCase()) {
          lowerChar = character.toLowerCase();
          if (index !== 0) {
            lowerChar = '-' + lowerChar;
          }
        } else {
          lowerChar = character;
        }

        tagName = tagName + lowerChar;
      });

      return tagName;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.renderer')
    .service('otusjs.player.core.renderer.TagComponentBuilderService', TagComponentBuilderService);

  TagComponentBuilderService.$inject = [
    'otusjs.player.core.renderer.HtmlBuilderService'
  ];

  function TagComponentBuilderService(HtmlBuilderService) {
    var self = this;

    self.createTagElement = createTagElement;

    function createTagElement(elementType) {
      return _replace(HtmlBuilderService.generateTagName(elementType));
    }

    function _replace(tagName) {
      return '<otus-' + tagName + ' item-data="$ctrl.itemData" on-update="$ctrl.update(valueType, value)" />';
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.scaffold', []);

}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.scaffold')
    .factory('otusjs.player.core.scaffold.ChainFactory', Factory);

  Factory.$inject = [
    'otusjs.player.core.scaffold.ChainLinkFactory'
  ];

  var Inject = {};

  function Factory(ChainLinkFactory) {
    var self = this;

    Inject.ChainLinkFactory = ChainLinkFactory;

    /* Public methods */
    self.create = create;

    function create() {
      return new Chain();
    }

    return self;
  }

  function Chain() {
    var self = this;
    var _chainHead = Inject.ChainLinkFactory.create();
    var _chainTail = _chainHead;

    /* Public methods */
    self.chain = chain;
    self.execute = execute;
    self.getChainHead = getChainHead;
    self.getChainTail = getChainTail;

    function chain(link) {
      _chainTail.setNext(link);
      _chainTail = link;
    }

    function execute(pipe, flowData) {
      return _chainHead.execute(pipe, flowData);
    }

    function getChainHead() {
      return _chainHead;
    }

    function getChainTail() {
      return _chainTail;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.scaffold')
    .factory('otusjs.player.core.scaffold.ChainLinkFactory', Factory);

  function Factory() {
    var self = this;

    /* Public methods */
    self.create = create;

    function create() {
      return new ChainLink();
    }

    return self;
  }

  function ChainLink() {
    var self = this;
    var _next = null;
    var _catchFlowData = null;
    var _preExecute = null;
    var _execute = null;
    var _postExecute = null;
    var _getFlowData = null;

    /* Public methods */
    self.getNext = getNext;
    self.getResult = getResult;
    self.execute = execute;
    self.catchFlowData = catchFlowData;
    self.setExecute = setExecute;
    self.setNext = setNext;
    self.setPostExecute = setPostExecute;
    self.setPreExecute = setPreExecute;
    self.setResult = setResult;

    function getResult() {
      return _result;
    }

    function getNext() {
      return _next;
    }

    function execute(pipe, flowData) {
      if (_preExecute) _preExecute(pipe, flowData);

      if (_execute && !pipe.skipStep) {
        _execute(pipe, flowData);
      }

      if (_postExecute && !pipe.skipStep) {
        _postExecute(pipe, flowData);
      }

      if (pipe.isFlowing) {
        pipe.skipStep = false;
        if (_getFlowData) {
          if (_next) _next.execute(pipe, _getFlowData(pipe, flowData));
        } else {
          if (_next) _next.execute(pipe, flowData);
        }
      }

      return { pipe: pipe, flowData: flowData };
    }

    function catchFlowData(procedure) {
      _catchFlowData = procedure;
    }

    function setExecute(procedure) {
      _execute = procedure;
    }

    function setNext(next) {
      _next = next;
    }

    function setPostExecute(procedure) {
      _postExecute = procedure;
    }

    function setPreExecute(procedure) {
      _preExecute = procedure;
    }

    function setResult(procedure) {
      _getFlowData = procedure;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.step', []);

}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.step')
    .service('otusjs.player.core.step.InitializeSurveyActivityStepService', Service);

  Service.$inject = [
    'otusjs.player.data.activity.ActivityFacadeService'
  ];

  function Service(ActivityFacadeService) {
    var self = this;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) { }

    function effect(pipe, flowData) {
      ActivityFacadeService.initialize();
    }

    function afterEffect(pipe, flowData) { }

    function getEffectResult(pipe, flowData) {
      return flowData;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.step')
    .service('otusjs.player.core.step.FinalizeSurveyActivityStepService', Service);

  Service.$inject = [
    'otusjs.player.data.activity.ActivityFacadeService'
  ];

  function Service(ActivityFacadeService) {
    var self = this;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) { }

    function effect(pipe, flowData) {
      ActivityFacadeService.finalize();
    }

    function afterEffect(pipe, flowData) { }

    function getEffectResult(pipe, flowData) {
      return flowData;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.step')
    .service('otusjs.player.core.step.SaveSurveyActivityStepService', Service);

  Service.$inject = [
    'otusjs.player.data.activity.ActivityFacadeService'
  ];

  function Service(ActivityFacadeService) {
    var self = this;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) { }

    function effect(pipe, flowData) {
      ActivityFacadeService.save();
    }

    function afterEffect(pipe, flowData) { }

    function getEffectResult(pipe, flowData) {
      return flowData;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.step')
    .service('otusjs.player.core.step.LoadSurveyActivityStepService', Service);

  Service.$inject = [
    'otusjs.player.data.activity.ActivityFacadeService',
    'otusjs.player.data.navigation.NavigationService'
  ];

  function Service(ActivityFacadeService, NavigationService) {
    var self = this;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) { }

    function effect(pipe, flowData) {
      ActivityFacadeService.setup();
      NavigationService.initialize();
    }

    function afterEffect(pipe, flowData) { }

    function getEffectResult(pipe, flowData) {
      return flowData;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.step')
    .service('otusjs.player.core.step.LoadSurveyActivityCoverStepService', Service);

  Service.$inject = [
    'otusjs.player.core.player.PlayerService'
  ];

  function Service(PlayerService) {
    var self = this;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) { }

    function effect(pipe, flowData) { }

    function afterEffect(pipe, flowData) { }

    function getEffectResult(pipe, flowData) {
      return flowData;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.step')
    .service('otusjs.player.core.step.LoadNextItemStepService', Service);

  Service.$inject = [
    'otusjs.player.data.navigation.NavigationService',
    'otusjs.player.data.activity.CurrentItemService',
    'otusjs.player.core.player.PlayerService',
  ];

  function Service(NavigationService, CurrentItemService, PlayerService) {
    var self = this;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) {}

    function effect(pipe, flowData) {
      var loadData = NavigationService.loadNextItem();

      if (loadData && loadData !== 'END NODE') {
        CurrentItemService.setup(loadData);
        flowData.answerToEvaluate = {};
        flowData.answerToEvaluate.data = {};
        flowData.metadataToEvaluate = {};
        flowData.metadataToEvaluate.data = {};
      } else {
        PlayerService.end();
      }
    }

    function afterEffect(pipe, flowData) {}

    function getEffectResult(pipe, flowData) {
      return flowData;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.step')
    .service('otusjs.player.core.step.LoadPreviousItemStepService', Service);

  Service.$inject = [
    'otusjs.player.data.navigation.NavigationService',
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function Service(NavigationService, CurrentItemService) {
    var self = this;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) {}

    function effect(pipe, flowData) {
      var loadData = NavigationService.loadPreviousItem();

      if (loadData) {
        CurrentItemService.setup(loadData);
        flowData.answerToEvaluate = {};
        flowData.answerToEvaluate.data = {};
      }
    }

    function afterEffect(pipe, flowData) {}

    function getEffectResult(pipe, flowData) {
      return flowData;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.step')
    .service('otusjs.player.core.step.UpdateItemTrackingStepService', Service);

  Service.$inject = [
    'otusjs.player.data.navigation.NavigationService',
    'otusjs.player.data.activity.CurrentItemService',
    'otusjs.player.core.player.PlayerService',
  ];

  function Service(NavigationService, CurrentItemService, PlayerService) {
    var self = this;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) {}

    function effect(pipe, flowData) {
      NavigationService.updateItemTracking();
    }

    function afterEffect(pipe, flowData) {}

    function getEffectResult(pipe, flowData) {
      return flowData;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.step')
    .service('otusjs.player.core.step.ApplyAnswerStepService', Service);

  Service.$inject = [
    'otusjs.player.data.activity.ActivityFacadeService'
  ];

  function Service(ActivityFacadeService) {
    var self = this;
    var _currentItem;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) {
      _currentItem = ActivityFacadeService.getCurrentItem();

      if (!_currentItem.shouldApplyAnswer()) {
        pipe.skipStep = true;
      } else {
        pipe.skipStep = false;
      }

      pipe.isFlowing = true;
    }

    function effect(pipe, flowData) {
      ActivityFacadeService.applyAnswer();
      flowData.answerToEvaluate.data = _ensureTestableValue(_currentItem.getFilling().answer);
      flowData.metadataToEvaluate.data = _ensureTestableValue(_currentItem.getFilling().metadata);
    }

    function afterEffect(pipe, flowData) { }

    function getEffectResult(pipe, flowData) {
      return flowData;
    }

    function _isTestableValue(value) {
      if (value !== null && value !== undefined ) {
        return true;
      } else {
        return false;
      }
    }

    function _ensureTestableValue(filling) {
      if (_isTestableValue(filling.value)) {
        return filling.value;
      } else {
        return {};
      }
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.step')
    .service('otusjs.player.core.step.ClearSkippedAnswersStepService', Service);

  Service.$inject = [
    'otusjs.player.data.activity.ActivityFacadeService'
  ];

  function Service(ActivityFacadeService) {
    var self = this;
    var _currentItem;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) {}

    function effect(pipe, flowData) {
      ActivityFacadeService.clearSkippedAnswers();
    }

    function afterEffect(pipe, flowData) { }

    function getEffectResult(pipe, flowData) {
      return flowData;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.step')
    .service('otusjs.player.core.step.HandleValidationErrorStepService', Service);

  Service.$inject = [
    'otusjs.player.data.activity.ActivityFacadeService'
  ];

  function Service(ActivityFacadeService) {
    var self = this;
    var _currentItem;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) {
      _currentItem = ActivityFacadeService.getCurrentItem();

      if (_currentItem.shouldIgnoreResponseEvaluation()) {
        pipe.skipStep = true;
      } else {
        pipe.skipStep = false;
      }
    }

    function effect(pipe, flowData) {
      ActivityFacadeService.attachItemValidationError(flowData.validationResult);
    }

    function afterEffect(pipe, flowData) {
      if (flowData.validationResult.hasError) {
        pipe.isFlowing = false;
      }
      // delete flowData.validationResult;
    }

    function getEffectResult(pipe, flowData) {
      return flowData;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.step')
    .service('otusjs.player.core.step.ReadValidationErrorStepService', Service);

  Service.$inject = [
    'otusjs.player.data.activity.ActivityFacadeService'
  ];

  function Service(ActivityFacadeService) {
    var self = this;
    var _currentItem;
    var _validationResult = {};

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) {
      _currentItem = ActivityFacadeService.getCurrentItem();

      if (_currentItem.shouldIgnoreResponseEvaluation()) {
        pipe.skipStep = true;
      } else {
        pipe.skipStep = false;
      }
    }

    function effect(pipe, flowData) {
      var mandatoryResults = [];
      var otherResults = [];
      flowData.validationResult = {};
      if (_currentItem.getItem().isQuestion()) {
        flowData.validationResponse.validatorsResponse.map(function(validator) {
          if (validator.name === 'mandatory' || validator.data.reference) {
            flowData.validationResult[validator.name] = !validator.result && (angular.equals(flowData.metadataToEvaluate.data, {}));
          } else {
            flowData.validationResult[validator.name] = !validator.result;
          }
        });
      }

      flowData.validationResult.hasError = _hasError(flowData);
    }

    function afterEffect(pipe, flowData) {}

    function getEffectResult(pipe, flowData) {
      return flowData;
    }

    function _hasError(flowData) {
      return Object.keys(flowData.validationResult).some(function(validator) {
        return flowData.validationResult[validator];
      });
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.step')
    .service('otusjs.player.core.step.RunValidationStepService', Service);

  Service.$inject = [
    'otusjs.player.data.activity.ActivityFacadeService',
    'otusjs.player.data.validation.ItemFillingValidatorService'
  ];

  function Service(ActivityFacadeService, ItemFillingValidatorService) {
    var self = this;
    var _currentItem;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) {
      _currentItem = ActivityFacadeService.getCurrentItem();

      if (_currentItem.shouldIgnoreResponseEvaluation()) {
        pipe.skipStep = true;
      } else {
        pipe.skipStep = false;
      }
    }

    function effect(pipe, flowData) {
      ItemFillingValidatorService.applyValidation(_currentItem, function(validationResponse) {
        flowData.validationResponse = validationResponse[0];
      });
    }

    function afterEffect(pipe, flowData) {}

    function getEffectResult(pipe, flowData) {
      return flowData;
    }

    function _parseBool(value) {
      return (value === 'true');
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.step')
    .service('otusjs.player.core.step.SetupValidationStepService', Service);

  Service.$inject = [
    'otusjs.player.data.activity.ActivityFacadeService',
    'otusjs.player.data.validation.ItemFillingValidatorService'
  ];

  function Service(ActivityFacadeService, ItemFillingValidatorService) {
    var self = this;
    var _currentItem;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) {
      _currentItem = ActivityFacadeService.getCurrentItem();

      if (_currentItem.shouldIgnoreResponseEvaluation()) {
        pipe.skipStep = true;
      } else {
        pipe.skipStep = false;
      }
    }

    function effect(pipe, flowData) {
      ItemFillingValidatorService.setupValidation(_currentItem, flowData.answerToEvaluate);
    }

    function afterEffect(pipe, flowData) { }

    function getEffectResult(pipe, flowData) {
      return flowData;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.data', [
      'otusjs',
      'otusjs.player.data.activity',
      'otusjs.player.data.navigation',
      'otusjs.player.data.validation'
    ]);

}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.data.activity', []);

}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.data.activity')
    .service('otusjs.player.data.activity.ActivityFacadeService', Service);

  Service.$inject = [
    'otusjs.player.data.activity.CurrentSurveyService',
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function Service(CurrentSurveyService, CurrentItemService) {
    var self = this;

    /* Public Interface */
    self.applyAnswer = applyAnswer;
    self.attachItemValidationError = attachItemValidationError;
    self.fetchItemAnswerByCustomID = fetchItemAnswerByCustomID;
    self.fetchItemAnswerByTemplateID = fetchItemAnswerByTemplateID;
    self.fetchItemByID = fetchItemByID;
    self.fetchNavigationByOrigin = fetchNavigationByOrigin;
    self.getCurrentItem = getCurrentItem;
    self.getCurrentSurvey = getCurrentSurvey;
    self.initialize = initialize;
    self.finalize = finalize;
    self.save = save;
    self.setupAnswer = setupAnswer;
    self.setup = setup;
    self.clearSkippedAnswers = clearSkippedAnswers;

    function applyAnswer() {
      CurrentItemService.applyFilling();
    }

    function attachItemValidationError(validationError) {
      CurrentItemService.attachValidationError(validationError);
    }

    function fetchItemAnswerByCustomID(id) {
      return CurrentSurveyService.getAnswerByItemID(id);
    }

    function fetchItemAnswerByTemplateID(id) {
      return CurrentSurveyService.getAnswerByItemID(id);
    }

    function fetchItemByID(id) {
      return CurrentSurveyService.getItemByTemplateID(id);
    }

    function fetchNavigationByOrigin(id) {
      return CurrentSurveyService.getNavigationByOrigin(id);
    }

    function getCurrentItem() {
      return CurrentItemService;
    }

    function getCurrentSurvey() {
      return CurrentSurveyService;
    }

    function initialize() {
      CurrentSurveyService.initialize();
    }

    function finalize() {
      CurrentSurveyService.finalize();
    }

    function save() {
      CurrentSurveyService.save();
    }

    function setupAnswer(answerData) {
      CurrentItemService.fill(answerData);
    }

    function setup() {
      CurrentItemService.clearData();
      CurrentSurveyService.setup();
    }

    function clearSkippedAnswers() {
      CurrentSurveyService.clearSkippedAnswers();
    }
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.data.activity')
    .service('otusjs.player.data.activity.CurrentItemService', Service);

  Service.$inject = [
    'otusjs.model.activity.ActivityFacadeService',
    'otusjs.utils.ImmutableDate'
  ];

  function Service(ActivityFacadeService, ImmutableDate) {
    var self = this;
    var _item = null;
    var _filling = null;
    var _navigation = null;
    var _validationError = null;
    var _observer = null;

    /* Public Interface */
    self.applyFilling = applyFilling;
    self.attachValidationError = attachValidationError;
    self.clearData = clearData;
    self.fill = fill;
    self.getFilling = getFilling;
    self.getFillingRules = getFillingRules;
    self.getItem = getItem;
    self.getNavigation = getNavigation;
    self.getValidationError = getValidationError;
    self.hasItem = hasItem;
    self.shouldIgnoreResponseEvaluation = shouldIgnoreResponseEvaluation;
    self.shouldApplyAnswer = shouldApplyAnswer;
    self.observerRegistry = observerRegistry;
    self.setup = setup;

    function applyFilling() {
      if (_filling) {
        ActivityFacadeService.fillQuestion(_filling);
      }
    }

    function attachValidationError(validationError) {
      _validationError = validationError;
      _observer.updateValidation(validationError);
    }

    function clearData() {
      _item = null;
      _filling = null;
      _navigation = null;
      _validationError = null;
      _observer = null;
    }

    function fill(filling) {
      if (_item.isQuestion()) {
        _filling = filling;
      }
    }

    function getFilling() {
      return _filling;
    }

    function getFillingRules() {
      return _item.fillingRules.options;
    }

    function getItem() {
      return _item;
    }

    function getNavigation() {
      return _navigation;
    }

    function getValidationError() {
      return _validationError;
    }

    function hasItem() {
      if (_item) {
        return true;
      } else {
        return false;
      }
    }

    function shouldApplyAnswer() {
      return _item && _item.isQuestion();
    }

    function shouldIgnoreResponseEvaluation() {
      return !_item || !_item.isQuestion();
    }

    function observerRegistry(observer) {
      _observer = observer;
      _observer.pushData(_filling);
    }

    function setup(data) {
      clearData();
      _item = data.item;
      _navigation = data.navigation;

      if (_item.isQuestion()) {
        _filling = ActivityFacadeService.getFillingByQuestionID(_item.templateID);

        if (!_filling) {
          _filling = ActivityFacadeService.createQuestionFill(_item);
          _filling.answerType = _item.objectType;
        }
      } else {
        _filling = null;
      }
    }
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.data.activity')
    .service('otusjs.player.data.activity.CurrentSurveyService', Service);

  Service.$inject = [
    'otusjs.model.activity.ActivityFacadeService'
  ];

  function Service(ActivityFacadeService) {
    var self = this;

    /* Public Interface */
    self.getSurvey = getSurvey;
    self.getAnswerByItemID = getAnswerByItemID;
    self.getItems = getItems;
    self.getNavigations = getNavigations;
    self.getNavigationByOrigin = getNavigationByOrigin;
    self.getItemByCustomID = getItemByCustomID;
    self.getItemByTemplateID = getItemByTemplateID;
    self.getSurveyDatasources = getSurveyDatasources;
    self.initialize = initialize;
    self.finalize = finalize;
    self.save = save;
    self.setup = setup;
    self.clearSkippedAnswers = clearSkippedAnswers;
    self.getNavigationTracker = getNavigationTracker;

    function getSurvey() {
      return ActivityFacadeService.surveyActivity;
    }

    function getSurveyDatasources(){ //question datasources
      return getSurvey().getDataSources();
   }

    function getAnswerByItemID(id) {
      return ActivityFacadeService.getFillingByQuestionID(id);
    }

    function getItems() {
      return ActivityFacadeService.surveyActivity.getItems();
    }

    function getItemByCustomID(customID) {
      var fetchedItem = null;

      getItems().some(function(item) {
        if (item.customID === customID) {
          fetchedItem = item;
          return true;
        }
      });

      return fetchedItem;
    }

    function getItemByTemplateID(templateID) {
      var fetchedItem = null;

      getItems().some(function(item) {
        if (item.templateID === templateID) {
          fetchedItem = item;
          return true;
        }
      });

      return fetchedItem;
    }

    function getNavigations() {
      return ActivityFacadeService.surveyActivity.getNavigations();
    }

    function getNavigationByOrigin(origin) {
      var fetchedNavigation = null;

      getNavigations().some(function(navigation) {
        if (navigation.origin === origin) {
          fetchedNavigation = navigation;
          return true;
        }
      });

      return fetchedNavigation;
    }

    function initialize() {
      ActivityFacadeService.initializeActivitySurvey();
    }

    function finalize() {
      ActivityFacadeService.finalizeActivitySurvey();
    }

    function save() {
      ActivityFacadeService.saveActivitySurvey();
    }

    function setup() { }

    function clearSkippedAnswers() {
      ActivityFacadeService.clearSkippedAnswers();
    }

    function getNavigationTracker() {
      return ActivityFacadeService.getNavigationTracker();
    }

  }
}());

(function() {
    'use strict';

    angular
        .module('otusjs.player.data.navigation', [
          'otusjs'
        ]);

}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.data.navigation')
    .service('otusjs.player.data.navigation.NavigationService', Service);

  Service.$inject = [
    'otusjs.model.navigation.NavigationTrackingItemFactory',
    'otusjs.player.data.activity.ActivityFacadeService',
    'otusjs.player.data.navigation.RouteService'
  ];

  function Service(NavigationTrackingItemFactory, ActivityFacadeService, RouteService) {
    var self = this;
    var _navigationTracker = null;

    /* Public Interface */
    self.getNextItems = getNextItems;
    self.getPreviousItem = getPreviousItem;
    self.hasNext = hasNext;
    self.hasPrevious = hasPrevious;
    self.initialize = initialize;
    self.loadNextItem = loadNextItem;
    self.loadPreviousItem = loadPreviousItem;
    self.updateItemTracking = updateItemTracking;

    function getNextItems() {
      return ActivityFacadeService.getCurrentItem().getNavigation().listRoutes().map(function(route) {
        return ActivityFacadeService.getCurrentSurvey().getItemByTemplateID(route.destination);
      });
    }

    function getPreviousItem() {
      if (hasPrevious()) {
        var previousID = _navigationTracker.getCurrentItem().getPrevious();
        return ActivityFacadeService.getCurrentSurvey().getItemByTemplateID(previousID);
      } else {
        return null;
      }
    }

    function hasNext() {
      if (ActivityFacadeService.getCurrentItem().getNavigation().listRoutes().length) {
        return true;
      } else {
        return false;
      }
    }

    function hasPrevious() {
      if (_navigationTracker.hasPreviousItem()) {
        return true;
      } else {
        return false;
      }
    }

    function initialize() {
      _navigationTracker = ActivityFacadeService.getCurrentSurvey().getSurvey().getNavigationTracker();
    }

    function loadNextItem() {
      if (ActivityFacadeService.getCurrentItem().hasItem()) {
        return _loadNextItem();
      } else if (_navigationTracker.getCurrentIndex()) {
        return _loadLastVisitedItem();
      } else {
        return _loadFirstItem();
      }
    }

    function loadPreviousItem() {
      if (hasPrevious()) {
        var item = getPreviousItem();
        var navigation = ActivityFacadeService.getCurrentSurvey().getNavigationByOrigin(item.templateID);

        RouteService.setup(navigation);
        _navigationTracker.visitItem(item.templateID);

        return {
          item: item,
          navigation: navigation
        };
      }
    }

    function updateItemTracking() {
      var currentItemFilling = ActivityFacadeService.getCurrentItem().getFilling();
      _navigationTracker.updateCurrentItem(currentItemFilling);
    }

    function _loadFirstItem() {
      return _loadItem();
    }

    function _loadLastVisitedItem() {
      return _loadItem(_navigationTracker.getCurrentItem().getID());
    }

    function _loadNextItem() {
      var currentItemNavigation = ActivityFacadeService.getCurrentItem().getNavigation();

      if (currentItemNavigation) {
        var routeToUse = RouteService.calculateRoute();
        return _loadItem(routeToUse.destination);
      }
    }

    function _loadItem(id) {
      if (id === 'END NODE') {
        return id;
      }
      var itemToLoad = null;
      var navigation = null;

      if (!id) {
        itemToLoad = ActivityFacadeService.getCurrentSurvey().getItems()[0];
        navigation = ActivityFacadeService.getCurrentSurvey().getNavigations()[2];
      } else {
        itemToLoad = ActivityFacadeService.fetchItemByID(id);
        navigation = ActivityFacadeService.fetchNavigationByOrigin(id);
      }

      if (navigation) {
        RouteService.setup(navigation);
      }

      _navigationTracker.visitItem(itemToLoad.templateID);

      return {
        item: itemToLoad,
        navigation: navigation
      };
    }
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.data.navigation')
    .service('otusjs.player.data.navigation.RouteService', Service);

  Service.$inject = [
    'otusjs.player.data.navigation.RuleService'
  ];

  function Service(RuleService) {
    var self = this;
    var _navigation = null;
    var _defaultRoute = null;
    var _alternativeRoutes = [];

    /* Public Interface */
    self.calculateRoute = calculateRoute;
    self.getAlternativeRoutes = getAlternativeRoutes;
    self.getCurrentNavigation = getCurrentNavigation;
    self.getDefaultRoute = getDefaultRoute;
    self.setup = setup;

    function getAlternativeRoutes() {
      return _alternativeRoutes;
    }

    function getCurrentNavigation() {
      return _navigation;
    }

    function getDefaultRoute() {
      return _defaultRoute;
    }

    function calculateRoute() {
      var alternativeRoute = _findAlternativeRoute();

      if (alternativeRoute) {
        return alternativeRoute;
      } else {
        return _defaultRoute;
      }
    }

    function _findAlternativeRoute() {
      var alternativeRoute = null;

      _alternativeRoutes.some(function(route) {
        if (_routeCanBeUsed(route)) {
          alternativeRoute = route;
          return true;
        }
      });

      return alternativeRoute;
    }

    function _routeCanBeUsed(route) {
      return route.listConditions().some(_conditionIsApplicable);
    }

    function _conditionIsApplicable(condition) {
      return condition.listRules().every(RuleService.isRuleApplicable);
    }

    function setup(navigation) {
      var routeList = navigation.listRoutes();

      _navigation = navigation;
      _defaultRoute = routeList[0];
      _alternativeRoutes = routeList.slice(1);
    }
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.data.navigation')
    .service('otusjs.player.data.navigation.RuleService', Service);

  Service.$inject = [
    'otusjs.player.data.activity.ActivityFacadeService',
    'otusjs.player.data.activity.CurrentSurveyService'
  ];

  function Service(ActivityFacadeService, CurrentSurveyService) {
    var self = this;

    /* Public Interface */
    self.isRuleApplicable = isRuleApplicable;

    function isRuleApplicable(rule) {
      var itemAnswer = ActivityFacadeService.fetchItemAnswerByTemplateID(rule.when);

      if (itemAnswer && !_isSkipped(rule.when)) {
        if (rule.isMetadata) {
          return itemAnswer.answer.eval.run(rule, itemAnswer.metadata.value);
        } else {
          return itemAnswer.answer.eval.run(rule, itemAnswer.answer.value);
        }
      } else {
        return false;
      }
    }

    function _isSkipped(item) {
      return CurrentSurveyService.getNavigationTracker().getSkippedItems().some(function(element) {
        return item === element.getID();
      });
    }

  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.data.validation', [
      'otus.validation'
    ]);

}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.data.validation')
    .service('otusjs.player.data.validation.ItemFillingValidatorService', Service);

  Service.$inject = [
    'ElementRegisterFactory',
    'otusjs.validation.api.ValidationService',
  ];

  function Service(ElementRegisterFactory, ValidationService) {
    var self = this;
    var _elementRegister;
    var _answer = {};

    /* Public methods */
    self.applyValidation = applyValidation;
    self.setupValidation = setupValidation;

    function applyValidation(currentItemService, callback) {
      ValidationService.unregisterElement(_elementRegister.id);
      setupValidation(currentItemService, _answer);

      ValidationService.validateElement(currentItemService.getItem().customID, callback);
    }

    function setupValidation(currentItemService, answer) {
      _answer = answer;
      _elementRegister = ElementRegisterFactory.create(currentItemService.getItem().customID, answer);

      if (currentItemService.getFilling().forceAnswer) {
        Object.keys(currentItemService.getItem().fillingRules.options).filter(function(validator) {
          if (!currentItemService.getItem().fillingRules.options[validator].data.canBeIgnored) {
            _addValidator(validator, currentItemService);
          }
        });
      } else {
        Object.keys(currentItemService.getItem().fillingRules.options).map(function(validator) {
          _addValidator(validator, currentItemService);
        });
        _setupImmutableDateValidation(currentItemService);
      }

      ValidationService.unregisterElement(_elementRegister.id);
      ValidationService.registerElement(_elementRegister);
    }

    function _addValidator(validator, currentItemService) {
      var reference = currentItemService.getItem().fillingRules.options[validator].data;
      _elementRegister.addValidator(validator, reference);
    }

    function _setupImmutableDateValidation(currentItemService) {
      var currentItemItemType = currentItemService.getItem().objectType;
      if(currentItemItemType === "TimeQuestion" || currentItemItemType === "CalendarQuestion") {
        _elementRegister.addValidator("ImmutableDate", currentItemService);
      }
    }

  }
}());

angular.module("trail",["ngMaterial","nsPopover"]),function(e,t,n){"use strict";var o=t.module("nsPopover",[]),i=t.element,r=t.isDefined,c=[],a=0;o.provider("nsPopover",function(){var e={template:"",theme:"ns-popover-list-theme",plain:"false",trigger:"click",triggerPrevent:!0,angularEvent:"",scopeEvent:"",container:"body",placement:"bottom|left",timeout:1.5,hideOnInsideClick:!1,hideOnOutsideClick:!0,hideOnButtonClick:!0,mouseRelative:"",popupDelay:0};this.setDefaults=function(n){t.extend(e,n)},this.$get=function(){return{getDefaults:function(){return e}}}}),o.controller("clientCtrl",function(){var e=this;e.tracks=[{id:"TST1",icon:"date_range",text:"TST1",time:"",styleClass:"md-warn",click:function(){}},{id:"",icon:"looks_one",text:"Segundo nodo da lista",time:"",styleClass:"md-warn",click:function(){e.add()}},{id:"",icon:"exposure_zero",text:"Terceira opção",time:"",styleClass:"md-warn"},{id:"",icon:"radio_button_checked",text:"Ultima.",time:"",styleClass:"md-warn"}],e.add=function(){var t={id:"",icon:"looks_one",text:"Segundo nodo da lista",time:"",styleClass:"md-warn",click:function(){console.log("oi")}};e.tracks.push(t)}}),o.directive("nsPopover",["nsPopover","$rootScope","$timeout","$templateCache","$q","$http","$compile","$document","$parse",function(n,o,l,s,p,d,u,m,v){return{restrict:"A",scope:!0,link:function(g,h,f){function y(e,t,n,o,i){var r,c,a=P(e[0]),l=function(){return"center"===n?Math.round(o.left+o.width/2-a.width/2):"right"===n?o.right-a.width:o.left},s=function(){return"center"===n?Math.round(o.top+o.height/2-a.height/2):"bottom"===n?o.bottom-a.height:o.top};"top"===t?(r=o.top-a.height,c=l()):"right"===t?(r=s(),c=o.right):"bottom"===t?(r=o.bottom,c=l()):"left"===t&&(r=s(),c=o.left-a.width),e.css("top",r.toString()+"px").css("left",c.toString()+"px"),i&&("top"===t||"bottom"===t?(c=o.left+o.width/2-c,i.css("left",c.toString()+"px")):(r=o.top+o.height/2-r,i.css("top",r.toString()+"px")))}function k(e,t,n,o){var i={bottom:e.bottom,height:e.height,left:e.left,right:e.right,top:e.top,width:e.width};return t&&(i.left=o.pageX,i.right=o.pageX,i.width=0),n&&(i.top=o.pageY,i.bottom=o.pageY,i.height=0),i}function P(t){var n=e,o=document.documentElement||document.body.parentNode||document.body,i=r(n.pageXOffset)?n.pageXOffset:o.scrollLeft,c=r(n.pageYOffset)?n.pageYOffset:o.scrollTop,a=t.getBoundingClientRect();return i||c?{bottom:a.bottom+c,left:a.left+i,right:a.right+i,top:a.top+c,height:a.height,width:a.width}:a}function O(e){return e=!(!e||0===e.length)&&"true"==(""+e).toLowerCase()}function b(){B.isOpen&&_.hide(0)}function C(e){function n(e){if(e.id===o)return!0;var i=t.element(e).parent()[0];return!!i&&(i.id===o||n(i))}if(B.isOpen&&e.target!==h[0]){var o=B[0].id;n(e.target)||_.hide(0)}}function w(){B.isOpen&&_.hide(0)}var x=n.getDefaults(),$={template:f.nsPopoverTemplate||x.template,theme:f.nsPopoverTheme||x.theme,plain:O(f.nsPopoverPlain||x.plain),trigger:f.nsPopoverTrigger||x.trigger,triggerPrevent:f.nsPopoverTriggerPrevent||x.triggerPrevent,angularEvent:f.nsPopoverAngularEvent||x.angularEvent,scopeEvent:f.nsPopoverScopeEvent||x.scopeEvent,container:f.nsPopoverContainer||x.container,placement:f.nsPopoverPlacement||x.placement,timeout:f.nsPopoverTimeout||x.timeout,hideOnInsideClick:O(f.nsPopoverHideOnInsideClick||x.hideOnInsideClick),hideOnOutsideClick:O(f.nsPopoverHideOnOutsideClick||x.hideOnOutsideClick),hideOnButtonClick:O(f.nsPopoverHideOnButtonClick||x.hideOnButtonClick),mouseRelative:f.nsPopoverMouseRelative,popupDelay:f.nsPopoverPopupDelay||x.popupDelay,group:f.nsPopoverGroup};$.mouseRelative&&($.mouseRelativeX=-1!==$.mouseRelative.indexOf("x"),$.mouseRelativeY=-1!==$.mouseRelative.indexOf("y"));var E={id_:void 0,display:function(e,t){!1!==v(f.nsPopover)(g)&&(l.cancel(E.id_),r(e)||(e=0),$.group&&o.$broadcast("ns:popover:hide",$.group),E.id_=l(function(){B.isOpen=!0,B.css("display","block");var e=P(h[0]);$.mouseRelative&&(e=k(e,$.mouseRelativeX,$.mouseRelativeY,t)),y(B,R,T,e,D),$.hideOnInsideClick&&B.on("click",b),$.hideOnOutsideClick&&m.on("click",C),$.hideOnButtonClick&&h.on("click",w)},1e3*e))},cancel:function(){l.cancel(E.id_)}},_={id_:void 0,hide:function(e){l.cancel(_.id_),"-1"!==e&&(r(e)||(e=1.5),_.id_=l(function(){B.off("click",b),m.off("click",C),h.off("click",w),B.isOpen=!1,E.cancel(),B.css("display","none")},1e3*e))},cancel:function(){l.cancel(_.id_)}},S=m.find($.container);S.length||(S=m.find("body"));var D,R,T;a+=1;var B=i('<div id="nspopover-'+a+'"></div>');c.push(B);var X=$.placement.match(/^(top|bottom|left|right)$|((top|bottom)\|(center|left|right)+)|((left|right)\|(center|top|bottom)+)/);if(!X)throw new Error('"'+$.placement+'" is not a valid placement or has a invalid combination of placements.');R=X[6]||X[3]||X[1],T=X[7]||X[4]||X[2]||"center",p.when(function(e,n){return e?t.isString(e)&&n?e:s.get(e)||d.get(e,{cache:!0}):""}($.template,$.plain)).then(function(e){e=t.isString(e)?e:e.data&&t.isString(e.data)?e.data:"",B.html(e),$.theme&&B.addClass($.theme),B.addClass("ns-popover-"+R+"-placement").addClass("ns-popover-"+T+"-align"),u(B)(g),g.$on("$destroy",function(){B.remove()}),g.hidePopover=function(){_.hide(0)},g.$on("ns:popover:hide",function(e,t){$.group===t&&g.hidePopover()}),B.css("position","absolute").css("display","none"),D=B[0].querySelectorAll(".triangle"),D.length&&(D=i(D)),S.append(B)}),$.angularEvent?o.$on($.angularEvent,function(){_.cancel(),E.display($.popupDelay)}):$.scopeEvent?g.$on($.scopeEvent,function(){_.cancel(),E.display(B,$.popupDelay)}):h.on($.trigger,function(e){!1!==$.triggerPrevent&&e.preventDefault(),_.cancel(),E.display($.popupDelay,e)}),h.on("mouseout",function(){_.hide($.timeout)}).on("mouseover",function(){_.cancel()}),B.on("mouseout",function(e){_.hide($.timeout)}).on("mouseover",function(){_.cancel()})}}}])}(window,window.angular),angular.module("trail").directive("otusTrail",function(){return{template:'<div layout-align="center center" layout="column"><md-button class="md-fab md-primary"><md-icon >question_answer</md-icon></md-button><div layout-align="center" ng-repeat="content in nodes"><section flex class="timeLine"></section><div layout="row" layout-align="center center"><div id="stepButtons"><md-button ng-click="content.click(content)" ns-popover ns-popover-template="tooltip" ns-popover-trigger="mouseover"ns-popover-theme="ns-popover-tooltip-theme" ns-popover-timeout="0.1"ns-popover-placement="right" ng-class="content.styleClass" class="md-fab md-mini"><md-icon>{{content.icon}}</md-icon></md-button></div><div><span>{{content.time}}</span></div></div><script type="text/ng-template" id="tooltip"><div class="triangle"></div><div class="md-body-2 ns-popover-tooltip">{{content.text+i}}</div></script></div></div',restrict:"E",scope:{nodes:"="}}});