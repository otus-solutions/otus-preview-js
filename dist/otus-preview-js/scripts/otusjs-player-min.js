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
            template:'<md-content layout-padding><div layout=row><md-input-container md-no-float class=md-block flex><textarea ng-model=$ctrl.comment ng-change=$ctrl.update() placeholder="Digite o texto aqui"></textarea></md-input-container></div></md-content>',
            controller: OtusCommentController,
            bindings: {
                itemData : '<',
                onUpdate: '&'
            }
        });

    OtusCommentController.$inject = [
        'otusjs.player.data.activity.CurrentItemService'
    ];

    function OtusCommentController(CurrentItemService) {
        var self = this;

        self.$onInit = function() {
          self.comment = CurrentItemService.getFilling().comment;
        };

        self.update = function() {
            self.onUpdate({
                valueType: 'comment',
                value: self.comment
            });
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
            template:'<md-content layout-padding style="margin-left: 10px"><md-radio-group ng-model=$ctrl.metadata ng-change=$ctrl.update() layout-padding flex><md-content value={{option.value}} ng-repeat="option in $ctrl.itemData.metadata.options" layout=row style="margin: 10px"><md-radio-button aria-label={{option.label}} value={{option.value}} flex><otus-label item-label=option.label.ptBR.formattedText></otus-label></md-radio-button></md-content></md-radio-group></md-content>',
            controller: MetadataGroupController,
            bindings: {
                itemData : '<',
                onUpdate: '&'
            }
        });

    MetadataGroupController.$inject = [
        'otusjs.player.data.activity.CurrentItemService'
    ];

    function MetadataGroupController(CurrentItemService) {
        var self = this;

        self.$onInit = function() {
          self.metadata = CurrentItemService.getFilling().metadata.value;
        };

        self.update = function() {
            self.onUpdate({
                valueType: 'metadata',
                value: self.metadata
            });
        };
    }

})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusPlayer', {
      template:'<md-content msd-wheel=$ctrl.catchMouseWheel($event)><otus-player-commander on-eject=$ctrl.eject() on-go-ahead=$ctrl.goAhead() on-go-back=$ctrl.goBack() on-pause=$ctrl.pause() on-play=$ctrl.play() on-stop=$ctrl.stop()></otus-player-commander><otus-survey-header survey-identity=$ctrl.identity></otus-survey-header><otus-player-display></otus-player-display></md-content>',
      controller: Controller,
      bindings: {
        surveyActivity: '<'
      }
    });

  Controller.$inject = [
    'otusjs.player.core.player.PlayerService'
  ];

  function Controller(PlayerService) {
    let SURVEY_ITEM = '<otus-survey-item item-data="itemData" />';
    let self = this;

    /* Public methods */
    self.catchMouseWheel = catchMouseWheel;
    self.eject = eject;
    self.goAhead = goAhead;
    self.goBack = goBack;
    self.pause = pause;
    self.play = play;
    self.stop = stop;
    self.$onInit = onInit;

    function catchMouseWheel($event) {
      if (event.deltaY > 0) {
        goAhead();
      } else {
        goBack();
      }
    }

    function eject() {
    }

    function goAhead() {
      self.playerDisplay.loadItem();
    }

    function goBack() {
      self.playerDisplay.loadItem();
    }

    function pause() {
    }

    function play() {
      self.playerDisplay.loadItem();
    }

    function stop() {
    }

    function onInit() {
      self.identity = self.surveyActivity.template.identity;

      /*
       * These objects are initialized by child components of Player
       * See player-commander-componente.js (onInit method)
       * See player-display-componente.js (onInit method)
       */
      self.playerCommander = {};
      self.playerDisplay = {};

      PlayerService.setup();
    }
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusPlayerCommander', {
      template:'<md-content layout-padding layout=row><md-toolbar style="border-radius: 3px" class=md-whiteframe-2dp><div class=md-toolbar-tools layout-align="space-around center"><md-button class=md-icon-button aria-label=Voltar ng-click=$ctrl.goBack() ng-disabled=$ctrl.isGoBackDisabled><md-icon md-font-set=material-icons>skip_previous</md-icon></md-button><md-button class=md-icon-button aria-label=Play ng-click=$ctrl.play()><md-icon md-font-set=material-icons>play_arrow</md-icon></md-button><md-button class=md-icon-button aria-label=Salvar ng-click=$ctrl.pause()><md-icon md-font-set=material-icons>pause</md-icon></md-button><md-button class=md-icon-button aria-label=Cancelar ng-click=$ctrl.stop()><md-icon md-font-set=material-icons>stop</md-icon></md-button><md-button class=md-icon-button aria-label=Avançar ng-click=$ctrl.goAhead() ng-disabled=$ctrl.isGoAheadDisabled><md-icon md-font-set=material-icons>skip_next</md-icon></md-button></div></md-toolbar></md-content>',
      controller: Controller,
      bindings: {
        onEject: '&',
        onGoAhead: '&',
        onGoBack: '&',
        onPause: '&',
        onPlay: '&',
        onStop: '&'
      }
    });

  Controller.$inject = [
    '$scope',
    'otusjs.player.core.player.PlayerService'
  ];

  function Controller($scope, PlayerService) {
    var self = this;

    /* Public methods */
    self.goBack = goBack;
    self.goAhead = goAhead;
    self.pause = pause;
    self.play = play;
    self.stop = stop;
    self.$onInit = onInit;

    function goAhead() {
      PlayerService.goAhead();
      self.onGoAhead();
    }

    function goBack() {
      PlayerService.goBack();
      self.onGoBack();
    }

    function pause() {
      self.onPause();
    }

    function play() {
      PlayerService.play();
      self.onPlay();
    }

    function stop() {
      self.onStop();
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
      template:'<md-content><section></section></md-content>',
      controller: Controller
    });

  Controller.$inject = [
    '$scope',
    '$element',
    '$compile',
    'otusjs.player.core.player.PlayerService'
  ];

  function Controller($scope, $element, $compile, PlayerService) {
    var self = this;

    var SURVEY_ITEM = '<otus-survey-item item-data="itemData" />';

    /* Public methods */
    self.loadItem = loadItem;
    self.$onInit = onInit;

    function _destroyCurrentItem() {
      if (self.currentChild) {
        self.currentChild.destroy();
      }
    }

    function loadItem() {
      if ($scope.itemData !== PlayerService.getItem()) {        
        _destroyCurrentItem();
        $scope.itemData = PlayerService.getItem();
        $element.find('section').prepend($compile(SURVEY_ITEM)($scope));
      }
    }

    function onInit() {
      $scope.$parent.$ctrl.playerDisplay = self;
    }
  }
}());

(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusSurveyHeader', {
            template:'<md-card><md-card-content><div layout=row><div layout=row layout-align="start center"><md-chips><md-chip>{{$ctrl.surveyIdentity.acronym}}</md-chip></md-chips><span class=md-subhead>{{$ctrl.surveyIdentity.name}}</span></div><span flex></span><div layout=row layout-align="start down"><md-input-container><label>Realização</label> <input ng-model=$ctrl.realizationDate disabled></md-input-container><md-input-container><label>Entrevistador(a)</label> <input ng-model=$ctrl.interviewer disabled></md-input-container></div></div><div layout=row><span class=md-body-1>{{$ctrl.surveyIdentity.description}}</span></div></md-card-content></md-card>',
            controller: OtusSurveyHeaderController,
            bindings: {
                surveyIdentity: '<'
            }
        });

    function OtusSurveyHeaderController() {
        var self = this;
    }

}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusSurveyItem', {
      template:'<md-card flex><md-card-title><md-card-title-text layout=column flex><div layout=row><otus-label class=md-headline item-label=$ctrl.itemData.label.ptBR.formattedText flex layout-padding></otus-label></div></md-card-title-text></md-card-title><md-card-content layout=row layout-align=space-between><otus-question ng-if=$ctrl.isQuestion() on-update="$ctrl.update(valueType, value)" item-data=$ctrl.itemData layout=column flex></otus-question><otus-misc-item ng-if=$ctrl.isItem() item-data=$ctrl.itemData layout=column flex></otus-misc-item></md-card-content><otus-validation-error error=$ctrl.$error></otus-validation-error></md-card>',
      controller: OtusSurveyItemController,
      bindings: {
        itemData: '<'
      }
    });

  OtusSurveyItemController.$inject = [
    '$scope',
    '$element',
    'otusjs.player.data.activity.CurrentItemService',
    '$filter'
  ];

  function OtusSurveyItemController($scope, $element, CurrentItemService, $filter) {
    var self = this;

    /* Public methods */
    self.isQuestion = isQuestion;
    self.isItem = isItem;
    self.restoreAll = restoreAll;
    self.update = update;
    self.pushData = pushData;
    self.destroy = destroy;
    self.updateValidation = updateValidation;

    self.$onInit = function() {
      self.filling = {};
      self.filling.questionID = self.itemData.templateID;
      $scope.$parent.$ctrl.currentChild = self;
      CurrentItemService.observerRegistry(self);
      self.$error = {};
    };

    function updateValidation(validationMap) {
      self.$error = validationMap;
    }

    function isQuestion() {
      return (self.itemData.objectType === 'ImageItem') || (self.itemData.objectType === 'TextItem') ? false : true;
    }

    function isItem() {
      return (self.itemData.objectType === 'ImageItem') || (self.itemData.objectType === 'TextItem') ? true : false;
    }

    function restoreAll() {
      console.log(self.itemData);
    }

    function update(prop, value) {
      if (prop) {
        if (prop !== 'comment') {
          self.filling[prop].value = value;
        } else {
          self.filling[prop] = value;
        }
      } else {

      }
      CurrentItemService.fill(self.filling);
    }

    function pushData(filling) {
      self.filling = filling;
      console.log(filling);
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
            template:'<md-content layout=column><md-tabs><md-tab label=Resposta><md-content bind-html-compile=$ctrl.template></md-content></md-tab><md-tab label=Metadado><metadata-group on-update="$ctrl.update(valueType, value)" item-data=$ctrl.itemData></metadata-group></md-tab><md-tab label=Comentário><otus-comment on-update="$ctrl.update(valueType, value)" item-data=$ctrl.itemData></otus-comment></md-tab></md-tabs></md-content>',
            controller: OtusQuestionController,
            bindings: {
                itemData: '<',
                onUpdate: '&'
            },
            require: {
                otusSurveyItem: '^otusSurveyItem'
            }
        });

    OtusQuestionController.$inject = [
      'otusjs.player.core.renderer.TagComponentBuilderService',
      'otusjs.player.data.activity.CurrentItemService',
    ];

    function OtusQuestionController(TagComponentBuilderService, CurrentItemService) {
        var self = this;

        self.$onInit = function() {
            self.template = TagComponentBuilderService.createTagElement(self.itemData.objectType);
        };

        self.update = function(prop, value) {
            self.onUpdate({
                valueType: prop,
                value: value
            });
        };

    }

})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusCalendarQuestion', {
      template:'<md-content layout-padding><div layout=row style="margin-top: 15px"><md-datepicker ng-model=$ctrl.answer ng-change=$ctrl.update() md-placeholder="Insira a data"></md-datepicker></div></md-content>',
      controller: Controller,
      bindings: {
        itemData: '<',
        onUpdate: '&'
      }
    });

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function Controller(CurrentItemService) {
    var self = this;

    self.$onInit = function() {
      self.answer = CurrentItemService.getFilling().answer.value;
    };

    self.update = function() {
      self.onUpdate({
        valueType: 'answer',
        value: self.answer
      });
    };
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusIntegerQuestion', {
      template:'<md-content layout-padding><div layout=row><md-input-container md-no-float class=md-block flex-gt-sm=45><input type=number step=1 ng-model=$ctrl.answer ng-change=$ctrl.update() ui-integer placeholder="Insira um valor inteiro"></md-input-container><md-input-container class=md-block flex-gt-sm=45><otus-label item-label=$ctrl.itemData.unit></otus-label></md-input-container></div></md-content>',
      controller: Controller,
      bindings: {
        itemData: '<',
        onUpdate: '&'
      }
    });

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function Controller(CurrentItemService) {
    var self = this;

    self.$onInit = function() {
      self.answer = CurrentItemService.getFilling().answer.value;
    };

    self.update = function() {
      self.onUpdate({
        valueType: 'answer',
        value: self.answer
      });
    };
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
      template:'<md-content layout-padding><div layout=row><md-input-container md-no-float class=md-block flex-gt-sm=45><input type=number step=any ng-model=$ctrl.answer ng-change=$ctrl.update() ui-decimal placeholder="Insira um valor decimal"></md-input-container><md-input-container class=md-block flex-gt-sm=45><otus-label item-label=$ctrl.itemData.unit></otus-label></md-input-container></div></md-content>',
      controller: Controller,
      bindings: {
        itemData: '<',
        onUpdate: '&'
      }
    });

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function Controller(CurrentItemService) {
    var self = this;

    self.$onInit = function() {
      self.answer = CurrentItemService.getFilling().answer.value;
    };

    self.update = function() {
      self.onUpdate({
        valueType: 'answer',
        value: self.answer
      });
    };
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusSingleSelectionQuestion', {
      template:'<md-content layout-padding style="margin-left: 10px"><md-radio-group ng-model=$ctrl.answer ng-change=$ctrl.update() layout-padding flex><md-radio-button value={{option.value}} ng-repeat="option in $ctrl.itemData.options" layout=row style="margin: 10px"><otus-label item-label=option.label.ptBR.formattedText></otus-label></md-radio-button></md-radio-group></md-content>',
      controller: Controller,
      bindings: {
        itemData: '<',
        onUpdate: '&'
      }
    });

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function Controller(CurrentItemService) {
    var self = this;

    self.$onInit = function() {
      self.answer = CurrentItemService.getFilling().answer.value;
    };

    self.update = function() {
      self.onUpdate({
        valueType: 'answer',
        value: self.answer
      });
    };
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusCheckboxQuestion', {
      template:'<md-content layout-padding style="margin-top: 12px"><md-content ng-repeat="option in $ctrl.itemData.options track by $index" flex><md-checkbox value=$index ng-model=$ctrl.answerArray[$index].value.state ng-change=$ctrl.update($index) layout=row style="margin: 7px"><otus-label item-label=option.label.ptBR.formattedText></otus-label></md-checkbox></md-content></md-content>',
      controller: Controller,
      bindings: {
        itemData: '<',
        onUpdate: '&'
      }
    });

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function Controller(CurrentItemService) {
    var self = this;

    self.$onInit = function() {
      self.answerArray = CurrentItemService.getFilling().answer.value || [];
      if (!self.answerArray) {
        self.itemData.options.forEach(function(option) {
          self.answerArray.push(_buildAnswerObject(option));
        });
      }
    };

    self.update = function() {
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
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusTextQuestion', {
      template:'<md-content id=text-question layout-padding><div layout=row><md-input-container md-no-float class=md-block flex><textarea ng-class="{lowercase: $ctrl.hasLowerCase, uppercase: $ctrl.hasUpperCase}" ng-model=$ctrl.answer ng-change=$ctrl.update() placeholder="Digite o texto aqui"></textarea></md-input-container></div></md-content>',
      controller: Controller,
      bindings: {
        itemData: '<',
        onUpdate: '&'
      }
    });

  Controller.$inject = [
    '$element',
    'otusjs.player.data.activity.CurrentItemService',
    'uiSpecialsService',
    'uiAlphanumericService'
  ];

  function Controller($element, CurrentItemService, uiSpecialsService, uiAlphanumericService) {
    var self = this;

    _init();

    self.hasUpperCase = CurrentItemService.getFillingRules().upperCase;
    self.hasLowerCase = CurrentItemService.getFillingRules().lowerCase;

    self.update = function() {
      var answer = self.answer;
      if (self.hasLowerCase) {
        answer = answer.toLowerCase();
      }
      if (self.hasUpperCase) {
        answer = answer.toUpperCase();
      }
      self.onUpdate({
        valueType: 'answer',
        value: answer
      });
    };

    function _init() {
      self.answer = CurrentItemService.getFilling().answer.value;

      var hasAlphanumeric = CurrentItemService.getFillingRules().alphanumeric;
      var hasSpecials = CurrentItemService.getFillingRules().specials;

      if (hasAlphanumeric && hasAlphanumeric.data.reference) {
        uiAlphanumericService.apply($element);
      }
      if (hasSpecials && hasSpecials.data.reference) {
        uiSpecialsService.apply($element);
      }
    }
  }
}());

(function() {
    'use strict';

    angular
        .module("otusjs.player.component")
        .service('uiAlphanumericService', uiAlphanumericService);

    function uiAlphanumericService() {
        var self = this;

        self.apply = apply;

        function apply($element) {
            var lastValidValue;
            var element = $element.find('textarea');

            element.on('keydown', shouldPrintChar);
            element.on('keyup', formatedAlphanumeric);

            function shouldPrintChar(event) {
                var keycode = event.which;
                return (isAlphanumericKey(keycode) || isValidKey(keycode));
            }

            function formatedAlphanumeric(event) {
                var keycode = event.which;
                var currentValue = element.val();

                if (currentValue.length === 0) {
                    lastValidValue = '';
                } else if (isAlphanumericKey(keycode) || isValidKey(keycode)) {
                    lastValidValue = element.val();
                } else if (!isValidKey(keycode)) {
                    element.val(lastValidValue);
                }
            }

            function isAlphanumericKey(keycode) {
                return ((keycode > 47 && keycode < 58) || (keycode > 64 && keycode < 91) || (keycode > 96 && keycode < 105)) ? true : false;
            }

            function isValidKey(keycode) {
                var shiftKey = (keycode === 16);
                var capslock = (keycode === 20);
                var backspaceKey = (keycode === 8);
                var spacebar = (keycode === 32);
                var capslock = (keycode === 20);
                var homeKey = (keycode === 36);
                var endKey = (keycode === 35);
                var deleteKey = (keycode === 46);
                var leftKey = (keycode === 37);
                var rightKey = (keycode === 39);
                var enterkey = (keycode === 13);

                return (shiftKey || capslock || backspaceKey || spacebar || capslock || homeKey || endKey || deleteKey || leftKey || rightKey || enterkey) ? true : false;
            }
        }
    }
}());

(function() {
    'use strict';

    angular
        .module("otusjs.player.component")
        .service('uiSpecialsService', uiSpecialsService);

    function uiSpecialsService() {
        var self = this;

        self.apply = apply;

        function apply($element) {
            var lastValidValue;
            var element = $element.find('textarea');

            element.on('keydown', shouldPrintChar);
            element.on('keyup', formatedSpecials);

            function shouldPrintChar(event) {
                var keycode = event.which;
                return (!isSpecialsKey(keycode) || isValidKey(keycode));
            }

            function formatedSpecials(event) {
                var keycode = event.which;
                var currentValue = element.val();

                if (currentValue.length === 0) {
                    lastValidValue = '';
                } else if (!isSpecialsKey(keycode) || isValidKey(keycode)) {
                    lastValidValue = element.val();
                } else if (!isValidKey(keycode)) {
                    element.val(lastValidValue);
                }
            }

            function isSpecialsKey(keycode) {
                return ((event.shiftKey === true && (keycode > 47 && keycode < 58)) || (keycode > 186 && keycode < 195) || (keycode > 218 && keycode < 223) || (keycode > 105 && keycode < 112) || (keycode == 226)) ? true : false;
            }

            function isValidKey(keycode) {
                var shiftKey = (keycode === 16);
                var ctrlkey = (keycode === 17);
                var backspaceKey = (keycode === 8);
                var spacebar = (keycode === 32);
                var capslock = (keycode === 20);
                var homeKey = (keycode === 36);
                var endKey = (keycode === 35);
                var deleteKey = (keycode === 46);
                var leftKey = (keycode === 37);
                var rightKey = (keycode === 39);
                var enterkey = (keycode === 13);

                return (shiftKey || ctrlkey || backspaceKey || spacebar || capslock || homeKey || endKey || deleteKey || leftKey || rightKey || enterkey) ? true : false;
            }
        }
    }

}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusEmailQuestion', {
      template:'<md-content layout-padding><div layout=row><md-input-container md-no-float class=md-block flex-gt-sm=45><md-icon class=material-icons>email</md-icon><input name=email type=email ng-model=$ctrl.answer ng-change=$ctrl.update() placeholder=email@email.com aria-label={{$ctrl.ariaLabel()}}></md-input-container></div></md-content>',
      controller: Controller,
      bindings: {
        itemData: '<',
        onUpdate: '&'
      }
    });

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function Controller(CurrentItemService) {
    var self = this;

    self.$onInit = function() {
      self.answer = CurrentItemService.getFilling().answer.value;
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
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusTimeQuestion', {
      template:'<md-content layout-padding><div layout=row><md-input-container class=md-block flex-gt-sm=45><md-icon class=material-icons>access_time</md-icon><input type=time ng-model=$ctrl.answer ng-change=$ctrl.update() aria-label=Tempo min=0 max=4999></md-input-container></div></md-content>',
      controller: Controller,
      bindings: {
        itemData: '<',
        onUpdate: '&'
      }
    });

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function Controller(CurrentItemService) {
    var self = this;

    self.$onInit = function() {
      self.answer = CurrentItemService.getFilling().answer.value;
    };

    self.update = function() {
      self.onUpdate({
        valueType: 'answer',
        value: self.answer
      });
    };
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusPhoneQuestion', {
      template:'<md-content layout-padding><div><md-input-container md-no-float class=md-block flex-gt-sm=45><md-icon class=material-icons>phone</md-icon><input type=text ng-model=$ctrl.answer ng-change=$ctrl.update() placeholder="(XX) XXXXX-XXXX" ui-br-phone-number></md-input-container></div></md-content>',
      controller: Controller,
      bindings: {
        itemData: '<',
        onUpdate: '&'
      }
    });

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function Controller(CurrentItemService) {
    var self = this;

    self.$onInit = function() {
      self.answer = CurrentItemService.getFilling().answer.value;
    };

    self.update = function() {
      self.onUpdate({
        valueType: 'answer',
        value: self.answer
      });
    };
  }
}());

(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusMiscItem', {
            template:'<md-content layout=column layout-align="center center"><otus-image-item ng-if=$ctrl.isImageItem() item-data=$ctrl.itemData></otus-image-item><otus-text-item ng-if=$ctrl.isTextItem() item-data=$ctrl.itemData></otus-text-item></md-content>',
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
            template:'<img ng-src={{$ctrl.itemData.url}} layout=row><otus-label class=md-headline item-label=$ctrl.itemData.footer.ptBR.formattedText></otus-label>',
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
            template:'<md-content><br><label>{{$ctrl.itemData.value.ptBR.formattedText}}</label></md-content>',
            controller: TextItemController,
            bindings: {
                itemData : '<'
            }
        });

    function TextItemController() {
        var self = this;

        self.$onInit = function() {};
    }

})();

(function() {
    angular
        .module('otusjs.player.component')
        .component('otusValidationError', {
            template:'<ng-messages layout=column layout-align="end start" for=$ctrl.$error layout-padding ng-messages-multiple role=alert><ng-message class="md-button md-warn" when=mandatory><md-icon md-font-set=material-icons>info</md-icon>Questão de preenchimento obrigatório</ng-message><ng-message class="md-button md-warn" when=distinct><md-icon md-font-set=material-icons>info</md-icon>Insira um valor diferente de {{ $ctrl.reference(\'distinct\') }}</ng-message><ng-message class="md-button md-warn" when=lowerLimit><md-icon md-font-set=material-icons>info</md-icon>O valor deve ser maior que {{ $ctrl.reference(\'lowerLimit\') }}</ng-message><ng-message class="md-button md-warn" when=upperLimit><md-icon md-font-set=material-icons>info</md-icon>O valor deve ser menor que {{ $ctrl.reference(\'upperLimit\') }}</ng-message><ng-message class="md-button md-warn" when=rangeDate><md-icon md-font-set=material-icons>info</md-icon>O valor deve ser maior que {{ $ctrl.referenceAsDate(\'rangeDate\').initial }} e menor que {{ $ctrl.referenceAsDate(\'rangeDate\').end }}</ng-message><ng-message class="md-button md-warn" when=maxDate><md-icon md-font-set=material-icons>info</md-icon>A data deve ser menor que {{ $ctrl.referenceAsDate(\'maxDate\')}}</ng-message><ng-message class="md-button md-warn" when=minDate><md-icon md-font-set=material-icons>info</md-icon>A data deve ser maior que {{ $ctrl.referenceAsDate(\'minDate\') }}</ng-message><ng-message class="md-button md-warn" when=pastDate><md-icon md-font-set=material-icons>info</md-icon>A data deve ser anterior à data corrente</ng-message><ng-message class="md-button md-warn" when=futureDate><md-icon md-font-set=material-icons>info</md-icon>A data deve ser posterior à data corrente</ng-message><ng-message class="md-button md-warn" when=minLength><md-icon md-font-set=material-icons>info</md-icon>Resposta deve ter mais que {{ $ctrl.reference(\'minLength\') }} caracteres</ng-message><ng-message class="md-button md-warn" when=maxLength><md-icon md-font-set=material-icons>info</md-icon>Resposta deve ter mais que {{ $ctrl.reference(\'maxLength\') }} caracteres</ng-message><ng-message class="md-button md-warn" when=in><md-icon md-font-set=material-icons>info</md-icon>O valor deve ser maior que {{ $ctrl.reference(\'in\').initial }} e menor que {{ $ctrl.reference(\'in\').end }}</ng-message><ng-message class="md-button md-warn" when=precision><md-icon md-font-set=material-icons>info</md-icon>Resposta deve conter exatamente {{ $ctrl.reference(\'precision\') }} dígitos</ng-message><ng-message class="md-button md-warn" when=scale><md-icon md-font-set=material-icons>info</md-icon>Resposta deve conter exatamente {{ $ctrl.reference(\'scale\') }} casas decimais</ng-message><ng-message class="md-button md-warn" when=maxTime><md-icon md-font-set=material-icons>info</md-icon>Hora máxima permitida: {{ $ctrl.referenceAsTime(\'maxTime\') }}</ng-message><ng-message class="md-button md-warn" when=minTime><md-icon md-font-set=material-icons>info</md-icon>Hora mínima permitida: {{ $ctrl.referenceAsTime(\'minTime\') }}</ng-message></ng-messages>',
            controller: otusValidationErrorController,
            bindings: {
                $error: '=error'
            }
        });
    otusValidationErrorController.$inject = [
        'otusjs.player.data.activity.CurrentItemService',
        '$filter'
    ];

    function otusValidationErrorController(CurrentItemService, $filter) {
        var self = this;
        self.$onInit = function() {
          console.log(self.$error);
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
    }
}());

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
    let self = this;
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
    let self = this;

    /* Public methods */
    self.PreAheadActionService = PreAheadActionService;
    self.ExecutionAheadActionService = ExecutionAheadActionService;
    self.PostAheadActionService = PostAheadActionService;
    self.execute = execute;

    function execute() {
      ActionPipeService.flowData.flowDirection = 'ahead';
      let phaseData = PreAheadActionService.execute(ActionPipeService.flowData);
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
    let self = this;
    let _stepChain = ChainFactory.create();

    self.isFlowing = true;

    /* Public methods */
    self.pipe = pipe;
    self.execute = execute;
    self.stopFlow = stopFlow;

    function pipe(step) {
      let link = ChainLinkFactory.create();
      link.catchFlowData(step.catchPreData);
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
    let self = this;
    let _stepChain = ChainFactory.create();

    self.isFlowing = true;

    /* Public methods */
    self.pipe = pipe;
    self.execute = execute;
    self.stopFlow = stopFlow;

    function pipe(step) {
      let link = ChainLinkFactory.create();
      link.catchFlowData(step.catchPreData);
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
    let self = this;
    let _stepChain = ChainFactory.create();

    /* Public methods */
    self.pipe = pipe;
    self.execute = execute;
    self.stopFlow = stopFlow;

    function pipe(step) {
      let link = ChainLinkFactory.create();
      link.catchFlowData(step.catchPreData);
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
    let self = this;

    /* Public methods */
    self.PreBackActionService = PreBackActionService;
    self.ExecutionBackActionService = ExecutionBackActionService;
    self.PostBackActionService = PostBackActionService;
    self.execute = execute;

    function execute() {
      ActionPipeService.flowData.flowDirection = 'back';
      let phaseData = PreBackActionService.execute(ActionPipeService.flowData);
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
    let self = this;
    let _stepChain = ChainFactory.create();

    self.isFlowing = true;

    /* Public methods */
    self.pipe = pipe;
    self.execute = execute;
    self.stopFlow = stopFlow;

    function pipe(step) {
      let link = ChainLinkFactory.create();
      link.catchFlowData(step.catchPreData);
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
    let self = this;
    let _stepChain = ChainFactory.create();

    self.isFlowing = true;

    /* Public methods */
    self.pipe = pipe;
    self.execute = execute;
    self.stopFlow = stopFlow;

    function pipe(step) {
      let link = ChainLinkFactory.create();
      link.catchFlowData(step.catchPreData);
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
    let self = this;
    let _stepChain = ChainFactory.create();

    /* Public methods */
    self.pipe = pipe;
    self.execute = execute;
    self.stopFlow = stopFlow;

    function pipe(step) {
      let link = ChainLinkFactory.create();
      link.catchFlowData(step.catchPreData);
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
    let self = this;

    /* Public methods */
    self.PrePlayActionService = PrePlayActionService;
    self.ExecutionPlayActionService = ExecutionPlayActionService;
    self.PostPlayActionService = PostPlayActionService;
    self.execute = execute;

    function execute() {
      let phaseData = PrePlayActionService.execute(ActionPipeService.flowData);
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
    let self = this;
    let _stepChain = ChainFactory.create();

    self.isFlowing = true;

    /* Public methods */
    self.pipe = pipe;
    self.execute = execute;
    self.stopFlow = stopFlow;

    function pipe(step) {
      let link = ChainLinkFactory.create();
      link.catchFlowData(step.catchPreData);
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
    let self = this;
    let _stepChain = ChainFactory.create();

    self.isFlowing = true;

    /* Public methods */
    self.pipe = pipe;
    self.execute = execute;
    self.stopFlow = stopFlow;

    function pipe(step) {
      let link = ChainLinkFactory.create();
      link.catchFlowData(step.catchPreData);
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
    let self = this;
    let _stepChain = ChainFactory.create();

    self.isFlowing = true;

    /* Public methods */
    self.pipe = pipe;
    self.execute = execute;
    self.stopFlow = stopFlow;

    function pipe(step) {
      let link = ChainLinkFactory.create();
      link.catchFlowData(step.catchPreData);
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
      'otusjs.player.core.step.LoadPreviousItemStepService',
      'otusjs.player.core.step.LoadNextItemStepService',
      'otusjs.player.core.step.ReadValidationErrorStepService',
      'otusjs.player.core.step.RunValidationStepService',
      'otusjs.player.core.step.SetupValidationStepService',
      'otusjs.player.core.step.HandleValidationErrorStepService',
      run
    ]);

    function run(PlayerConfigurationService, ApplyAnswer, InitializeSurveyActivity, LoadPreviousItem, LoadNextItem, ReadValidationError, RunValidation, SetupValidation, HandleValidationError) {
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
      PlayerConfigurationService.onPostBack(LoadPreviousItem);

      /* PostBack Phase */
      PlayerConfigurationService.onPostBack(SetupValidation);
    }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.player')
    .service('otusjs.player.core.player.PlayerConfigurationService', Service);

  Service.$inject = [
    'otusjs.player.core.phase.PlayActionService',
    'otusjs.player.core.phase.AheadActionService',
    'otusjs.player.core.phase.BackActionService'
  ];

  function Service(PlayActionService, AheadActionService, BackActionService) {
    var self = this;

    /* Public methods */
    self.onPrePlay = onPrePlay;
    self.onPlay = onPlay;
    self.onPostPlay = onPostPlay;
    self.onPreAhead = onPreAhead;
    self.onAhead = onAhead;
    self.onPostAhead = onPostAhead;
    self.onPreBack = onPreBack;
    self.onBack = onBack;
    self.onPostBack = onPostBack;

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
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.player')
    .service('otusjs.player.core.player.PlayerService', PlayerService);

  PlayerService.$inject = [
    'otusjs.player.data.activity.ActivityFacadeService',
    'otusjs.player.data.navigation.NavigationService',
    'otusjs.player.core.phase.PlayActionService',
    'otusjs.player.core.phase.AheadActionService',
    'otusjs.player.core.phase.BackActionService',
  ];

  function PlayerService(ActivityFacadeService, NavigationService, PlayActionService, AheadActionService, BackActionService) {
    var self = this;
    var _nextItems = [];

    self.getItem = getItem;
    self.goAhead = goAhead;
    self.goBack = goBack;
    self.play = play;
    self.setup = setup;

    function getItem() {
      return NavigationService.getCurrentItem().getItem();
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
      ActivityFacadeService.setup();
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

  let Inject = {};

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
    let self = this;
    let _next = null;
    let _catchFlowData = null;
    let _preExecute = null;
    let _execute = null;
    let _postExecute = null;
    let _getFlowData = null;

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

      if (_postExecute) _postExecute(pipe, flowData);

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
    .service('otusjs.player.core.step.ApplyAnswerStepService', Service);

  Service.$inject = [
    'otusjs.player.data.navigation.NavigationService',
    'otusjs.player.data.activity.ActivityFacadeService'
  ];

  function Service(NavigationService, ActivityFacadeService) {
    let self = this;
    let _currentItem;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) {
      _currentItem = NavigationService.getCurrentItem();

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
    let self = this;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) {
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
    .service('otusjs.player.core.step.InitializeSurveyActivityStepService', Service);

  Service.$inject = [
    'otusjs.player.data.activity.ActivityFacadeService',
    'otusjs.player.data.navigation.NavigationService'
  ];

  function Service(ActivityFacadeService, NavigationService) {
    let self = this;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) {
    }

    function effect(pipe, flowData) {
      ActivityFacadeService.initialize();
      NavigationService.initialize();
      flowData.answerToEvaluate = {};
      flowData.answerToEvaluate.data = {};
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
    .service('otusjs.player.core.step.LoadNextItemStepService', Service);

  Service.$inject = [
    'otusjs.player.data.navigation.NavigationService'
  ];

  function Service(NavigationService) {
    let self = this;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) {

    }

    function effect(pipe, flowData) {
      NavigationService.loadNextItem();
      flowData.answerToEvaluate = {};
      flowData.answerToEvaluate.data = {};
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
    'otusjs.player.data.navigation.NavigationService'
  ];

  function Service(NavigationService) {
    let self = this;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) {}

    function effect(pipe, flowData) {
      NavigationService.loadPreviousItem();
      flowData.answerToEvaluate = {};
      flowData.answerToEvaluate.data = {};
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
    .service('otusjs.player.core.step.ReadValidationErrorStepService', Service);

  function Service() {
    let self = this;
    let _validationResult = {};

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) {
    }

    function effect(pipe, flowData) {
      _validationResult = {};
      _validationResult.hasError = false;

      flowData.validationResponse.validatorsResponse.map((validator) => {
        _validationResult[validator.name] = !validator.result;
        validator.result = validator.result;
        if (!validator.result) {
          _validationResult.hasError = true
        }
      });

      // delete flowData.validationResponse;
      flowData.validationResult = _validationResult;
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
    .service('otusjs.player.core.step.RunValidationStepService', Service);

  Service.$inject = [
    'otusjs.player.data.navigation.NavigationService',
    'otusjs.player.data.validation.ItemFillingValidatorService',
  ];

  function Service(NavigationService, ValidationService) {
    let self = this;
    let _currentItem;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) {
      _currentItem = NavigationService.getCurrentItem();

      if (_currentItem.shouldIgnoreResponseEvaluation()) {
        pipe.skipStep = true;
      } else {
        pipe.skipStep = false;
      }
    }

    function effect(pipe, flowData) {
      ValidationService.applyValidation(_currentItem.getItem(), (validationResponse) => {
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
    'otusjs.player.data.navigation.NavigationService',
    'otusjs.player.data.validation.ItemFillingValidatorService'
  ];

  function Service(NavigationService, ValidationService) {
    let self = this;
    let _currentItem;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) {
      _currentItem = NavigationService.getCurrentItem();

      if (_currentItem.shouldIgnoreResponseEvaluation()) {
        pipe.skipStep = true;
      } else {
        pipe.skipStep = false;
      }
    }

    function effect(pipe, flowData) {
      ValidationService.setupValidation(_currentItem.getItem(), flowData.answerToEvaluate)
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
    let self = this;

    /* Public Interface */
    self.applyAnswer = applyAnswer;
    self.attachItemValidationError = attachItemValidationError;
    self.fetchItemAnswerByCustomID = fetchItemAnswerByCustomID;
    self.fetchItemByID = fetchItemByID;
    self.getCurrentItem = getCurrentItem;
    self.getCurrentSurvey = getCurrentSurvey;
    self.initialize = initialize;
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
      return CurrentSurveyService.getItemByCustomID(id);
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

    function setupAnswer(answerData) {
      CurrentItemService.fill(answerData);
    }

    function setup() {
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
    let self = this;
    let _item = null;
    let _filling = null;
    let _navigation = null;
    let _previousItem = null;
    let _validationError = null;
    let _observer = null;

    /* Public Interface */
    self.applyFilling = applyFilling;
    self.attachValidationError = attachValidationError;
    self.fill = fill;
    self.getFilling = getFilling;
    self.getFillingRules = getFillingRules;
    self.getPreviousItem = getPreviousItem;
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

    function fill(filling) {
      // if (_item.isQuestion()) {
      //   _filling.answer.value = filling.answer;
      //   _filling.metadata.value = filling.metadata;
      //   _filling.comment = filling.comment;
      // }
      _filling = filling;
    };

    function getFilling() {
      return _filling;
    };

    function getFillingRules() {
      return _item.fillingRules.options;
    };

    function getPreviousItem() {
      return _previousItem;
    }

    function getItem() {
      return _item;
    };

    function getNavigation() {
      return _navigation;
    };

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
      return _item.isQuestion();
    }

    function shouldIgnoreResponseEvaluation() {
      return !_item.isQuestion();
    }

    function observerRegistry(observer) {
      _observer = observer;
      _observer.pushData(_filling);
    };

    function setup(item, navigation, previousItem) {
      _item = item;
      _navigation = navigation;
      _previousItem = previousItem || null;

      if (item.isQuestion()) {
        _filling = ActivityFacadeService.getFillingByQuestionID(item.customID);

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
    let self = this;

    /* Public Interface */
    self.setup = setup;
    self.getSurvey = getSurvey;
    self.getAnswerByItemID = getAnswerByItemID;
    self.getItems = getItems;
    self.getNavigations = getNavigations;
    self.getNavigationByOrigin = getNavigationByOrigin;
    self.getItemByCustomID = getItemByCustomID;
    self.initialize = initialize;

    function setup() {
      ActivityFacadeService.openActivitySurvey();
    }

    function getSurvey() {
      return ActivityFacadeService.surveyActivity;
    }

    function getAnswerByItemID(id) {
      return ActivityFacadeService.getFillingByQuestionID(id);
    }

    function getItems() {
      return ActivityFacadeService.surveyActivity.template.SurveyItemManager.getItemList();
    }

    function getItemByCustomID(customID) {
      let fetchedItem = null;

      getItems().some((item) => {
        if (item.customID === customID) {
          fetchedItem = item;
          return true;
        }
      });

      return fetchedItem;
    }

    function getNavigations() {
      return ActivityFacadeService.surveyActivity.template.NavigationManager.getNavigationList();
    }

    function getNavigationByOrigin(origin) {
      let fetchedNavigation = null;

      getNavigations().some((navigation) => {
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
    'otusjs.model.navigation.NavigationStackItemFactory',
    'otusjs.player.data.activity.ActivityFacadeService',
    'otusjs.player.data.navigation.RouteService'
  ];

  function Service(NavigationStackItemFactory, ActivityFacadeService, RouteService) {
    let self = this;
    let _stack = null;

    /* Public Interface */
    self.getCurrentItem = getCurrentItem;
    self.getCurrentSurvey = getCurrentSurvey;
    self.getNextItems = getNextItems;
    self.getPreviousItem = getPreviousItem;
    self.getStack = getStack;
    self.hasNext = hasNext;
    self.hasPrevious = hasPrevious;
    self.initialize = initialize;
    self.loadNextItem = loadNextItem;
    self.loadPreviousItem = loadPreviousItem;
    self.useItem = useItem;

    function getCurrentItem() {
      return ActivityFacadeService.getCurrentItem();
    }

    function getCurrentSurvey() {
      return ActivityFacadeService.getCurrentSurvey();
    }

    function getNextItems() {
      return getCurrentItem().getNavigation().listRoutes().map((route) => {
        return getCurrentSurvey().getItemByCustomID(route.destination);
      });
    }

    function getPreviousItem() {
      let previousItemID = getCurrentItem().getPreviousItem();

      if (previousItemID) {
        return getCurrentSurvey().getItemByCustomID(previousItemID);
      } else {
        return null;
      }
    }

    function getStack() {
      return _stack;
    }

    function hasNext() {
      if (getCurrentItem().getNavigation().listRoutes().length) {
        return true;
      } else {
        return false;
      }
    }

    function hasPrevious() {
      if (getCurrentItem().getPreviousItem()) {
        return true;
      } else {
        return false;
      }
    }

    function initialize() {
      _stack = getCurrentSurvey().getSurvey().getNavigationStack();

      if (_stack.getSize()) {
        _loadLastVisitedItem();
      } else {
        _loadFirstItem();
      }
    }

    function _loadFirstItem() {
      let item = getCurrentSurvey().getItems()[0];
      let navigation = getCurrentSurvey().getNavigations()[0];
      useItem(item, navigation);
      _stackUpItem();
    }

    function _loadLastVisitedItem() {
      let item = getCurrentSurvey().getItemByCustomID(_stack.getCurrentItem().getID());
      let navigation = getCurrentSurvey().getNavigationByOrigin(_stack.getCurrentItem().getID());

      if (_stack.getCurrentItem().getPrevious()) {
        let previous = _stack.getCurrentItem().getPrevious().getID();
        useItem(item, navigation, previous);
      } else {
        useItem(item, navigation);
      }

      _stackUpItem();
    }

    function loadNextItem() {
      _loadNextItem();
    }

    function _loadNextItem() {
      let currentItemNavigation = getCurrentItem().getNavigation();
      let routeToUse = RouteService.calculateRoute(currentItemNavigation);
      let nextItem = ActivityFacadeService.fetchItemByID(routeToUse.destination);
      let nextNavigation = getCurrentSurvey().getNavigationByOrigin(routeToUse.destination);
      useItem(nextItem, nextNavigation, currentItemNavigation.origin);
      _stackUpItem();
    }

    function loadPreviousItem() {
      if (hasPrevious()) {
        _stack.back();
        let item = getPreviousItem();
        let navigation = getCurrentSurvey().getNavigationByOrigin(item.customID);
        if (_stack.getCurrentItem().getPrevious()) {
          useItem(item, navigation, _stack.getCurrentItem().getPrevious().getID());
        } else {
          useItem(item, navigation);
        }
      }
    }

    function useItem(item, navigation, previous) {
      getCurrentItem().setup(item, navigation, previous);
      RouteService.setup(navigation);
    }

    function _stackUpItem() {
      let options = {};
      options.id = getCurrentItem().getItem().customID;
      options.label = getCurrentItem().getItem().label.ptBR.plainText;
      options.type = getCurrentItem().getItem().objectType;
      // options.answer = ;
      // options.metadata = ;

      _stack.add(NavigationStackItemFactory.create(options));
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
    let _navigation = null;
    let _defaultRoute = null;
    let _alternativeRoutes = [];

    /* Public Interface */
    self.calculateRoute = calculateRoute;
    self.getAlternativeRoutes = getAlternativeRoutes;
    self.getCurrentNavigation = getCurrentNavigation;
    self.getDefaultRoute = getDefaultRoute;
    self.hasNext = hasNext;
    self.hasPrevious = hasPrevious;
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
      let alternativeRoute = _findAlternativeRoute();

      if (alternativeRoute) {
        return alternativeRoute;
      } else {
        return _defaultRoute;
      }
    }

    function _findAlternativeRoute() {
      let alternativeRoute = null;

      _alternativeRoutes.some((route) => {
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

    function hasNext() {
      if (getCurrentItem().getNavigation().listRoutes().length) {
        return true;
      } else {
        return false;
      }
    }

    function hasPrevious() {
      if (getCurrentItem().getPreviousItem()) {
        return true;
      } else {
        return false;
      }
    }

    function setup(navigation) {
      let routeList = navigation.listRoutes();

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
      let whenItem = ActivityFacadeService.fetchItemByID(rule.when);
      let itemAnswer = ActivityFacadeService.fetchItemAnswerByCustomID(rule.when);
      return itemAnswer.answer.eval.run(rule, itemAnswer.answer.value);
      // return RuleTestService.run(rule, itemAnswer.answer.value);
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
    'ValidationService',
  ];

  function Service(ElementRegisterFactory, ValidationService) {
    var self = this;
    var elementRegister;

    /* Public methods */
    self.applyValidation = applyValidation;
    self.finishValidation = finishValidation;
    self.setupValidation = setupValidation;

    function applyValidation(item, callback) {
      ValidationService.validateElement(item.customID, callback);
    }

    function finishValidation() {
      ValidationService.validateAllElements(function(response) {
        //TODO
      });
    }

    function setupValidation(item, answer) {
      let elementRegister = ElementRegisterFactory.create(item.customID, answer);

      Object.keys(item.fillingRules.options).map((validator) => {
        let reference = item.fillingRules.options[validator].data;
        elementRegister.addValidator(validator, reference);
      });

      ValidationService.unregisterElement(elementRegister.id);
      ValidationService.registerElement(elementRegister);
    }
  }
}());
