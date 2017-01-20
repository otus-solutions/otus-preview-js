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
        .module('otusjs.player.component', []);

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
      template:'<md-content layout-padding style="margin-left: 10px"><md-radio-group ng-model="$ctrl.metadata" ng-change="$ctrl.update()" layout-padding flex><md-content value="{{option.value}}" ng-repeat="option in $ctrl.itemData.metadata.options" layout="row" style="margin: 10px"><md-radio-button aria-label="{{option.label}}" value="{{option.value}}" flex><otus-label item-label="option.label.ptBR.formattedText"></otus-label></md-radio-button></md-content></md-radio-group></md-content>',
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
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function MetadataGroupController(CurrentItemService) {
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
  }

})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusPlayer', {
      template:'<otus-survey-cover on-play="$ctrl.play()" ng-show="$ctrl.showCover" layout-align="center center" layout="column" flex class="player-cover"></otus-survey-cover><md-content layout="column" flex ng-show="$ctrl.showActivity"><otus-survey-header layout="row" flex="21"></otus-survey-header><otus-player-commander layout="row" flex="10" on-go-back="$ctrl.goBack()" on-pause="$ctrl.pause()" on-stop="$ctrl.stop()" on-go-ahead="$ctrl.goAhead()" on-eject="$ctrl.eject()"></otus-player-commander><otus-player-display layout="row" flex style="overflow: hidden !important; position: relative !important"></otus-player-display></md-content><otus-survey-back-cover on-finalize="$ctrl.eject()" ng-show="$ctrl.showBackCover" layout-align="center center" layout="column" flex class="player-back-cover"></otus-survey-back-cover>',
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

    function _loadItem() {
      if (PlayerService.getItemData()) {
        self.playerDisplay.loadItem(PlayerService.getItemData());
      }
    }
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusPlayerCommander', {
      template:'<md-content layout-padding layout="column" flex style="padding-top: 0 !important; padding-bottom: 0 !important"><md-toolbar style="border-radius: 3px" class="md-whiteframe-1dp"><div class="md-toolbar-tools" layout-align="space-around center"><md-button class="md-icon-button" aria-label="Voltar" ng-click="$ctrl.goBack()" ng-disabled="$ctrl.isGoBackDisabled"><md-icon md-font-set="material-icons">skip_previous</md-icon></md-button><md-button class="md-icon-button" aria-label="Salvar" ng-click="$ctrl.pause()"><md-icon md-font-set="material-icons">save</md-icon></md-button><md-button class="md-icon-button" aria-label="Cancelar" ng-click="$ctrl.stop()"><md-icon md-font-set="material-icons">close</md-icon></md-button><md-button class="md-icon-button" aria-label="Avançar" ng-click="$ctrl.goAhead()" ng-disabled="$ctrl.isGoAheadDisabled"><md-icon md-font-set="material-icons">skip_next</md-icon></md-button></div></md-toolbar></md-content>',
      controller: Controller,
      bindings: {
        onGoAhead: '&',
        onGoBack: '&',
        onPause: '&',
        onStop: '&'
      }
    });

  Controller.$inject = [
    '$scope'
  ];

  function Controller($scope) {
    var self = this;

    /* Public methods */
    self.goBack = goBack;
    self.goAhead = goAhead;
    self.pause = pause;
    self.stop = stop;
    self.remove = remove;
    self.$onInit = onInit;

    function goAhead() {
      self.onGoAhead();
    }

    function goBack() {
      self.onGoBack();
    }

    function pause() {
      self.onPause();
    }

    function stop() {
      self.onStop();
    }

    function remove() {
      $element.remove();
    }

    function onInit() {
      $scope.$parent.$ctrl.playerCommander = self;
    }
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusPlayerDisplay', {
      template:'',
      controller: Controller
    });

  Controller.$inject = [
    '$scope',
    '$element',
    '$compile'
  ];

  function Controller($scope, $element, $compile) {
    var self = this;

    var SURVEY_ITEM = '<otus-survey-item item-data="itemData" flex style="overflow: auto; position: relative; margin-right: -15px;"/>';
    var SURVEY_COVER = '<otus-cover />';

    /* Public methods */
    self.loadItem = loadItem;
    self.showCover = showCover;
    self.remove = remove;
    self.$onInit = onInit;

    function _destroyCurrentItem() {
      if (self.currentItem) {
        self.currentItem.destroy();
      }
    }

    function loadItem(itemData) {
      if (_shouldLoadItem(itemData)) {
        _destroyCurrentItem();
        $scope.itemData = itemData;
        $element.empty();
        $element.append($compile(SURVEY_ITEM)($scope));
      }
    }

    function showCover() {
      _destroyCurrentItem();
      $element.empty();
      $element.append($compile(SURVEY_COVER)($scope));
    }

    function remove() {
      $element.remove();
    }

    function onInit() {
      $scope.$parent.$ctrl.playerDisplay = self;
      $scope.itemData = {};
      $scope.itemData.customID = '';
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
      self.title = activity.surveyForm.identity.name;
    }
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusSurveyCover', {
      template:'<md-content class="cover-content" layout-align="center center" layout="row" flex><div layout-align="center center" layout="column" flex><section><h2 class="md-display-1">{{ $ctrl.title }}</h2></section><md-button class="md-raised md-primary" aria-label="Iniciar" ng-click="$ctrl.play()"><md-icon md-font-set="material-icons">assignment</md-icon>Iniciar</md-button></div></md-content>',
      controller: Controller,
      bindings: {
        onPlay: '&'
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
      self.title = activity.surveyForm.identity.name;
    }

    function play() {
      self.onPlay();
    }

    function show() {
      var activity = ActivityFacadeService.getCurrentSurvey().getSurvey();
      self.title = activity.surveyForm.identity.name;
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
      template:'<md-content layout="column" flex><md-content layout="row"><md-chips layout="column" layout-padding layout-align="center center" style="padding: 0 !important; padding-left: 10px !important"><md-chip style="margin: 0 !important">{{ $ctrl.surveyIdentity.acronym }}</md-chip></md-chips><md-content layout="column" flex layout-padding style="padding: 0 !important" layout-align="center start"><div><span class="md-display-1">{{ $ctrl.surveyIdentity.name }}</span></div></md-content></md-content><md-content layout="row" style="padding-left: 10px !important; padding-right: 10px !important"><div layout="column" layout-padding layout-align="center start"><label class="md-subhead" style="padding: 0 !important">Participante</label> <span style="padding: 0 !important">{{ $ctrl.participantData.name }}</span></div><div layout="column" layout-padding layout-align="center start"><label class="md-subhead" style="padding: 0 !important">Número de Recrutamento</label> <span style="padding: 0 !important">{{ $ctrl.participantData.recruitmentNumber }}</span></div><div layout-padding flex></div></md-content></md-content>',
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
      self.surveyIdentity = self.activity.surveyForm.identity;
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
      template:'<md-card flex><md-card-title layout="row"><md-card-title-text layout="column" flex><div layout="row"><otus-label class="md-headline" item-label="$ctrl.itemData.label.ptBR.formattedText" flex layout-padding></otus-label></div></md-card-title-text></md-card-title><otus-validation-error error="$ctrl.$error" layout="row"></otus-validation-error><md-card-content layout="row" layout-align="space-between" flex><otus-question ng-if="$ctrl.isQuestion()" on-update="$ctrl.update(valueType, value)" item-data="$ctrl.itemData" layout="column" flex></otus-question><otus-misc-item ng-if="$ctrl.isItem()" item-data="$ctrl.itemData" layout="column" flex></otus-misc-item></md-card-content></md-card>',
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
        self.errorComponent.focus();
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
      template:'<md-content layout="column"><div layout="row"><md-tabs md-dynamic-height layout="column" flex="95"><md-tab label="Resposta"><md-content class="md-padding" bind-html-compile="$ctrl.template"></md-content></md-tab><md-tab label="Metadado"><md-content class="md-padding"><metadata-group on-update="$ctrl.update(valueType, value)" item-data="$ctrl.itemData"></metadata-group></md-content></md-tab><md-tab label="Comentário"><md-content class="md-padding"><otus-comment on-update="$ctrl.update(valueType, value)" item-data="$ctrl.itemData"></otus-comment></md-content></md-tab></md-tabs><div layout="column"><otus-question-menu on-clear="$ctrl.clear(value)" on-accept="$ctrl.forceAnswer()"></otus-question-menu></div></div></md-content>',
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
      self.item = {};
      self.metadata = {};
      self.comment = {};
      self.menuComponent = {};
    };

    self.update = function(prop, value) {
      self.onUpdate({
        valueType: prop,
        value: value
      });
    };

    self.forceAnswer = function() {
      self.onUpdate({
        valueType: 'forceAnswer',
        value: true
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
    }

    self.clearAnswer = function() {
      self.item.clear();
    };

    self.clearMetadataAnswer = function() {
      self.metadata.clear();
    };

    self.clearCommentAnswer = function() {
      self.comment.clear();
    };
  }

})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusCalendarQuestion', {
      template:'<md-content layout-padding><div layout="row" style="margin-top: 15px"><md-datepicker ng-model="$ctrl.answer" ng-change="$ctrl.update()" md-placeholder="Insira a data"></md-datepicker></div></md-content>',
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
      self.otusQuestion.item = self;
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
    .component('otusIntegerQuestion', {
      template:'<md-content layout-padding><div layout="row"><md-input-container md-no-float class="md-block" flex-gt-sm="45"><input type="number" step="1" ng-model="$ctrl.answer" ng-change="$ctrl.update()" ui-integer placeholder="Insira um valor inteiro"></md-input-container><md-input-container class="md-block" flex-gt-sm="45"><otus-label item-label="$ctrl.itemData.unit"></otus-label></md-input-container></div></md-content>',
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
      self.otusQuestion.item = self;
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
                    var deleteKey = (keycode === 46);
                    var controlKey = (keycode === 17);
                    // var cKey = (keycode === 67);
                    // var vKey = (keycode === 86);
                    var leftKey = (keycode === 37);
                    var rightKey = (keycode === 39);

                    return (minusKey || shiftKey || backspaceKey || homeKey || endKey || deleteKey || controlKey || leftKey || rightKey);
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
      self.otusQuestion.item = self;
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
      template:'<md-content layout-padding style="margin-left: 10px"><md-radio-group ng-model="$ctrl.answer" ng-change="$ctrl.update()" layout-padding flex><md-radio-button value="{{option.value}}" ng-repeat="option in $ctrl.itemData.options" layout="row" style="margin: 10px"><otus-label item-label="option.label.ptBR.formattedText"></otus-label></md-radio-button></md-radio-group></md-content>',
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
      self.otusQuestion.item = self;
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
    .component('otusCheckboxQuestion', {
      template:'<md-content layout-padding style="margin-top: 12px"><md-content ng-repeat="option in $ctrl.itemData.options track by $index" flex><md-checkbox ng-model="$ctrl.answerArray[$index].state" ng-change="$ctrl.update($index)" layout="row" style="margin: 7px"><otus-label item-label="option.label.ptBR.formattedText"></otus-label></md-checkbox></md-content></md-content>',
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
      self.answerArray = CurrentItemService.getFilling().answer.value;
      self.otusQuestion.item = self;
      if (!self.answerArray) {
        self.answerArray = [];
        self.itemData.options.forEach(function(option) {
          self.answerArray.push(_buildAnswerObject(option));
        });
      }
    };

    self.update = function(index) {
      self.onUpdate({
        valueType: 'answer',
        value: self.answerArray
      });
    };

    function _buildAnswerObject(option) {
      return {
        option: option.customOptionID,
        state: option.value
      };
    }

    self.clear = function() {
      CurrentItemService.getFilling().answer.clear();
      delete self.answerArray;
    }
  }

}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusTextQuestion', {
      template:'<md-content id="text-question" layout-padding><div layout="row"><md-input-container md-no-float class="md-block" flex><textarea ng-class="{lowercase: $ctrl.hasLowerCase, uppercase: $ctrl.hasUpperCase}" ng-model="$ctrl.answer" ng-change="$ctrl.update()" placeholder="Digite o texto aqui"></textarea></md-input-container></div></md-content>',
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
    '$element',
    'otusjs.player.data.activity.CurrentItemService',
    'uiFormatedService'
  ];

  function Controller($element, CurrentItemService, uiFormatedService) {
    var self = this;

    self.$onInit = function() {
      self.answer = CurrentItemService.getFilling().answer.value;
      self.hasAlphanumeric = CurrentItemService.getFillingRules().alphanumeric;
      self.hasSpecials = CurrentItemService.getFillingRules().specials;
      self.hasUpperCase = CurrentItemService.getFillingRules().upperCase;
      self.hasLowerCase = CurrentItemService.getFillingRules().lowerCase;
      self.otusQuestion.item = self;
    };

    self.update = function() {
      if (self.hasLowerCase) {
        self.answer.value.toLowerCase();
      }
      if (self.hasUpperCase) {
        self.answer.value.toUpperCase();
      }

      if ((self.hasAlphanumeric && self.hasAlphanumeric.data.reference) ||
        (self.hasSpecials && self.hasSpecials.data.reference)) {
        uiFormatedService.apply($element, self.answer);
      }

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
    .module("otusjs.player.component")
    .service('uiFormatedService', uiFormatedService);

  function uiFormatedService() {

    var self = this;

    self.apply = apply;

    function apply($element, answer) {
      var lastValidValue;

      var element = $element.find('textarea');
      var key = answer[answer.length - 1];
      if (isValidKey(key)) {
        return answer;
      } else {
        var formatedAnswer = answer.slice(0, -1);
        $element.find('textarea')[0].value = formatedAnswer;
        return formatedAnswer;
      }

      function isValidKey(key) {
        var reg = /^[a-záàâãéèêíïóòôõöúùçA-ZÁÀÂÃÉÈÊÍÓÒÔÕÚÙÇ0-9 .,]*$/;
        return (reg.test(key)) ? true : false;
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
      self.otusQuestion.item = self;
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
      template:'<md-content layout-padding><div layout="row"><md-input-container class="md-block" flex-gt-sm="45"><md-icon class="material-icons">access_time</md-icon><input type="time" ng-model="$ctrl.answer" ng-change="$ctrl.update()" aria-label="Tempo" min="0" max="4999"></md-input-container></div></md-content>',
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
      self.otusQuestion.item = self;
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
      self.otusQuestion.item = self;
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
        .component('otusMiscItem', {
            template:'<md-content layout="column" layout-align="center center"><otus-image-item ng-if="$ctrl.isImageItem()" item-data="$ctrl.itemData"></otus-image-item><otus-text-item ng-if="$ctrl.isTextItem()" item-data="$ctrl.itemData"></otus-text-item></md-content>',
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
      template:'<md-content><br><label ng-bind-html="$ctrl.trustedHtml($ctrl.itemData.value.ptBR.formattedText)"></label></md-content>',
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
      template:'<ng-messages layout="column" layout-align="end start" for="$ctrl.$error" layout-padding ng-messages-multiple role="alert"><ng-message class="md-button md-warn" when="mandatory"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">Questão de preenchimento obrigatório</span></ng-message><ng-message class="md-button md-warn" when="distinct"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">Insira um valor diferente de {{ $ctrl.reference(\'distinct\') }}</span></ng-message><ng-message class="md-button md-warn" when="lowerLimit"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">O valor deve ser maior que {{ $ctrl.reference(\'lowerLimit\') }}</span></ng-message><ng-message class="md-button md-warn" when="upperLimit"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">O valor deve ser menor que {{ $ctrl.reference(\'upperLimit\') }}</span></ng-message><ng-message class="md-button md-warn" when="rangeDate"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">O valor deve ser maior que {{ $ctrl.referenceAsDate(\'rangeDate\').initial }} e menor que {{ $ctrl.referenceAsDate(\'rangeDate\').end }}</span></ng-message><ng-message class="md-button md-warn" when="maxDate"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">A data deve ser menor que {{ $ctrl.referenceAsDate(\'maxDate\')}}</span></ng-message><ng-message class="md-button md-warn" when="minDate"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">A data deve ser maior que {{ $ctrl.referenceAsDate(\'minDate\')}}</span></ng-message><ng-message class="md-button md-warn" when="pastDate"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">A data deve ser anterior à data corrente</span></ng-message><ng-message class="md-button md-warn" when="futureDate"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">A data deve ser posterior à data corrente</span></ng-message><ng-message class="md-button md-warn" when="minLength"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">Resposta deve ter mais que {{ $ctrl.reference(\'minLength\') }} caracteres</span></ng-message><ng-message class="md-button md-warn" when="maxLength"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">Resposta deve ter mais que {{ $ctrl.reference(\'maxLength\') }} caracteres</span></ng-message><ng-message class="md-button md-warn" when="in"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">O valor deve ser maior que {{ $ctrl.reference(\'in\').initial }} e menor que {{ $ctrl.reference(\'in\').end }}</span></ng-message><ng-message class="md-button md-warn" when="precision"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">Resposta deve conter exatamente {{ $ctrl.reference(\'precision\') }} dígitos</span></ng-message><ng-message class="md-button md-warn" when="scale"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">Resposta deve conter exatamente {{ $ctrl.reference(\'scale\') }} casas decimais</span></ng-message><ng-message class="md-button md-warn" when="maxTime"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">Hora máxima permitida: {{ $ctrl.referenceAsTime(\'maxTime\') }}</span></ng-message><ng-message class="md-button md-warn" when="minTime"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">Hora mínima permitida: {{ $ctrl.referenceAsTime(\'minTime\') }}</span></ng-message><ng-message class="md-button md-warn" when="quantity"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">Quantidade selecionada deve ser igual a {{ $ctrl.reference(\'quantity\') }}</span></ng-message><ng-message class="md-button md-warn" when="minSelected"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">Quantidade mínima selecionada deve ser {{ $ctrl.reference(\'minSelected\') }}</span></ng-message><ng-message class="md-button md-warn" when="maxSelected"><md-icon md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">Quantidade máxima selecionada deve ser {{ $ctrl.reference(\'maxSelected\')}}</span></ng-message></ng-messages>',
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
          'initial': $filter('date')(new Date(reference.initial), 'dd/MM/yyyy'),
          'end': $filter('date')(new Date(reference.end), 'dd/MM/yyyy')
        };
      } else {
        date = $filter('date')(new Date(reference), 'dd/MM/yyyy');
      }
      return date;
    };

    self.referenceAsTime = function(type) {
      var reference = CurrentItemService.getFillingRules()[type].data.reference;
      return $filter('date')(new Date(reference), 'hh:mm:ss');
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
      template:'<md-fab-speed-dial style="position:absolute; top:90px; right:0; transform: translate(0%, 0%);" md-direction="left" class="md-scale"><md-fab-trigger><md-button class="md-fab md-mini md-raised" aria-label="Limpar Resposta"><md-icon>delete</md-icon><md-tooltip md-direction="down">Limpar</md-tooltip></md-button></md-fab-trigger><md-fab-actions><md-button ng-click="$ctrl.clear(\'comment\')" class="md-fab md-raised md-mini" aria-label="Comentario"><md-icon>comment</md-icon><md-tooltip md-direction="down">Limpar comentário</md-tooltip></md-button><md-button ng-click="$ctrl.clear(\'metadata\')" class="md-fab md-raised md-mini" aria-label="Metadado"><md-icon>label</md-icon><md-tooltip md-direction="down">Limpar metadata</md-tooltip></md-button><md-button ng-click="$ctrl.clear(\'answer\')" class="md-fab md-raised md-mini" aria-label="Questão"><md-icon>question_answer</md-icon><md-tooltip md-direction="down">Limpar resposta</md-tooltip></md-button></md-fab-actions></md-fab-speed-dial><md-fab-trigger style="position:absolute; top:30px; right:0; transform: translate(0%, 0%);" md-direction="left" class="md-scale"><md-button ng-click="$ctrl.showConfirm($event)" class="md-fab md-mini md-raised" aria-label="Aceitar resposta"><md-icon>check</md-icon><md-tooltip md-direction="down">Aceitar resposta</md-tooltip></md-button></md-fab-trigger>',
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

    self.$onInit = function() {
      self.otusQuestion.menuComponent = self;
      self.dialogSettings = {
        parent: angular.element(document.body),
        template:'<div md-theme="layoutTheme" class="md-padding" ng-cloak><md-dialog-content><h2 class="md-title">Questão fora dos limites estabelecidos</h2><p class="md-body-1">Você deseja ignorar a validação e aceitar a resposta?</p></md-dialog-content><md-dialog-actions><md-button class="md-raised" ng-click="controller.cancel({ action: \'cancel\' })">Cancelar</md-button><md-button class="md-raised md-primary" aria-label="Aceitar resposta" ng-click="controller.accept({ action: \'accept\' })">Aceitar</md-button></md-dialog-actions></div>',
        controller: DialogController,
        controllerAs: 'controller',
        openFrom: '#system-toolbar',
        closeTo: {
          bottom: 0
        }
      };
    };

    self.clear = function(value) {
      self.onClear({
        value: value
      });
    };

    self.showConfirm = function(ev) {
      $mdDialog
        .show(self.dialogSettings)
        .then(
          forwardSuccessfulExecution,
          forwardUnsuccessfulExecution
        );

      return {
        onConfirm: function(callback) {
          self.callback = callback;
        }
      };
    };

    function forwardSuccessfulExecution(response) {
      self.onAccept({
        value: true
      });
    }

    function forwardUnsuccessfulExecution(error) {}
  }

  function DialogController($mdDialog) {
    var self = this;

    /* Public interface */
    self.cancel = cancel;
    self.accept = accept;

    function cancel(response) {
      $mdDialog.hide(response);
    }

    function accept(response) {
      $mdDialog.hide(response);
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
    self.flowData = {}

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
      'otusjs.player.core.step.InitializeSurveyActivityStepService',
      'otusjs.player.core.step.FinalizeSurveyActivityStepService',
      'otusjs.player.core.step.SaveSurveyActivityStepService',
      'otusjs.player.core.step.LoadPreviousItemStepService',
      'otusjs.player.core.step.LoadNextItemStepService',
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
      InitializeSurveyActivity,
      FinalizeSurveyActivity,
      SaveSurveyActivity,
      LoadPreviousItem,
      LoadNextItem,
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

    self.bindComponent = bindComponent;
    self.getItemData = getItemData;
    self.goAhead = goAhead;
    self.goBack = goBack;
    self.play = play;
    self.setup = setup;
    self.end = end;
    self.eject = eject;
    self.stop = stop;
    self.save = save;

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
      flowData.answerToEvaluate.data = _currentItem.getFilling().answer.value || {};
      flowData.metadataToEvaluate.data = _currentItem.getFilling().metadata.value || {};
    }

    function afterEffect(pipe, flowData) {
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
    'otusjs.player.data.validation.ItemFillingValidatorService',
  ];

  function Service(ActivityFacadeService, ValidationService) {
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
      ValidationService.applyValidation(_currentItem.getItem(), function(validationResponse) {
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

  function Service(ActivityFacadeService, ValidationService) {
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
      ValidationService.setupValidation(_currentItem.getItem(), flowData.answerToEvaluate);
    }

    function afterEffect(pipe, flowData) {
    }

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
    self.fetchItemByID = fetchItemByID;
    self.fetchNavigationByOrigin = fetchNavigationByOrigin;
    self.getCurrentItem = getCurrentItem;
    self.getCurrentSurvey = getCurrentSurvey;
    self.initialize = initialize;
    self.finalize = finalize;
    self.save = save;
    self.setupAnswer = setupAnswer;
    self.setup = setup;

    function applyAnswer() {
      CurrentItemService.applyFilling();
    }

    function attachItemValidationError(validationError) {
      CurrentItemService.attachValidationError(validationError);
    }

    function fetchItemAnswerByCustomID(id) {
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
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.data.activity')
    .service('otusjs.player.data.activity.CurrentItemService', Service);

  Service.$inject = [
    'otusjs.model.activity.ActivityFacadeService'
  ];

  function Service(ActivityFacadeService) {
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
      return !_item || !_item.isQuestion() || _filling.forceAnswer;
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
        _filling = ActivityFacadeService.getFillingByQuestionID(_item.customID);

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
    self.initialize = initialize;
    self.finalize = finalize;
    self.save = save;
    self.setup = setup;

    function getSurvey() {
      return ActivityFacadeService.surveyActivity;
    }

    function getAnswerByItemID(id) {
      return ActivityFacadeService.getFillingByQuestionID(id);
    }

    function getItems() {
      return ActivityFacadeService.surveyActivity.surveyForm.SurveyItemManager.getItemList();
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
      return ActivityFacadeService.surveyActivity.surveyForm.NavigationManager.getNavigationList();
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

    function setup() {
      // ActivityFacadeService.openActivitySurvey();
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
    'otusjs.model.navigation.NavigationPathItemFactory',
    'otusjs.player.data.activity.ActivityFacadeService',
    'otusjs.player.data.navigation.RouteService'
  ];

  function Service(NavigationStackItemFactory, ActivityFacadeService, RouteService) {
    var self = this;
    var _path = null;

    /* Public Interface */
    self.getNextItems = getNextItems;
    self.getPreviousItem = getPreviousItem;
    self.getStack = getStack;
    self.hasNext = hasNext;
    self.hasPrevious = hasPrevious;
    self.initialize = initialize;
    self.loadNextItem = loadNextItem;
    self.loadPreviousItem = loadPreviousItem;

    function getNextItems() {
      return ActivityFacadeService.getCurrentItem().getNavigation().listRoutes().map(function(route) {
        return ActivityFacadeService.getCurrentSurvey().getItemByTemplateID(route.destination);
      });
    }

    function getPreviousItem() {
      var item = _path.getCurrentItem().getPrevious();
      _path.back();
      if (item) {
        return ActivityFacadeService.getCurrentSurvey().getItemByTemplateID(item.getID());
      } else {
        return null;
      }
    }

    function getStack() {
      return _path;
    }

    function hasNext() {
      if (ActivityFacadeService.getCurrentItem().getNavigation().listRoutes().length) {
        return true;
      } else {
        return false;
      }
    }

    function hasPrevious() {
      if (_path.getCurrentItem().getPrevious()) {
        return true;
      } else {
        return false;
      }
    }

    function initialize() {
      _path = ActivityFacadeService.getCurrentSurvey().getSurvey().getNavigationStack();
    }

    function loadNextItem() {
      if (ActivityFacadeService.getCurrentItem().hasItem()) {
        return _loadNextItem();
      } else if (_path.getSize()) {
        return _loadLastVisitedItem();
      } else {
        return _loadFirstItem();
      }
    }

    function _loadFirstItem() {
      return _loadItem();
    }

    function _loadLastVisitedItem() {
      return _loadItem(_path.getCurrentItem().getID());
    }

    function _loadNextItem() {
      var currentItemNavigation = ActivityFacadeService.getCurrentItem().getNavigation();

      if (currentItemNavigation) {
        var routeToUse = RouteService.calculateRoute(currentItemNavigation);
        return _loadItem(routeToUse.destination);
      }
    }

    function _loadItem(id) {
      if (id === 'END NODE') {
        return id;
      }
      var item = null;
      var navigation = null;

      if (!id) {
        item = ActivityFacadeService.getCurrentSurvey().getItems()[0];
        navigation = ActivityFacadeService.getCurrentSurvey().getNavigations()[2];
      } else {
        item = ActivityFacadeService.fetchItemByID(id);
        navigation = ActivityFacadeService.fetchNavigationByOrigin(id);
      }

      if (navigation) {
        RouteService.setup(navigation);
      }
      _pathUpItem(item);

      return {
        item: item,
        navigation: navigation
      };
    }

    function loadPreviousItem() {
      if (hasPrevious()) {
        var item = getPreviousItem();
        var navigation = ActivityFacadeService.getCurrentSurvey().getNavigationByOrigin(item.templateID);
        RouteService.setup(navigation);

        return {
          item: item,
          navigation: navigation
        };
      }
    }

    function _pathUpItem(item) {
      var options = {};
      options.id = item.templateID;
      options.type = item.objectType;

      if (item.isQuestion()) {
        options.label = item.label.ptBR.plainText;
      }
      _path.add(NavigationStackItemFactory.create(options));
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
    'otusjs.player.data.activity.ActivityFacadeService'
  ]

  function Service(ActivityFacadeService) {
    var self = this;

    /* Public Interface */
    self.isRuleApplicable = isRuleApplicable;

    function isRuleApplicable(rule) {
      var whenItem = ActivityFacadeService.fetchItemByID(rule.when);
      var itemAnswer = ActivityFacadeService.fetchItemAnswerByCustomID(rule.when);

      if (itemAnswer) {
        if (rule.isMetadata) {
          return itemAnswer.answer.eval.run(rule, itemAnswer.metadata.value);
        } else {
          return itemAnswer.answer.eval.run(rule, itemAnswer.answer.value);
        }
      } else {
        return false;
      }
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
    var elementRegister;

    /* Public methods */
    self.applyValidation = applyValidation;
    self.setupValidation = setupValidation;

    function applyValidation(item, callback) {
      ValidationService.validateElement(item.customID, callback);
    }

    function setupValidation(item, answer) {
      var elementRegister = ElementRegisterFactory.create(item.customID, answer);

      Object.keys(item.fillingRules.options).map(function(validator) {
        var reference = item.fillingRules.options[validator].data;
        elementRegister.addValidator(validator, reference);
      });

      ValidationService.unregisterElement(elementRegister.id);
      ValidationService.registerElement(elementRegister);
    }
  }
}());
