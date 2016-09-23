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

    function OtusCommentController() {
        var self = this;

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
                return self.itemLabel.ptBR.formattedText;
            } else {
                return self.itemLabel;
            }
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

    function MetadataGroupController() {
        var self = this;

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
    .component('otusSheet', {
      template:'<otus-survey-header survey-identity=$ctrl.surveyTemplate.identity></otus-survey-header><md-content layout-padding layout=row><md-toolbar style="border-radius: 3px" class=md-whiteframe-2dp><div class=md-toolbar-tools layout-align="space-around center"><md-button class=md-icon-button aria-label=Voltar ng-click=$ctrl.previousItem() ng-disabled=$ctrl.isPreviousDisabled><md-icon md-font-set=material-icons>skip_previous</md-icon></md-button><md-button class=md-icon-button aria-label=Salvar><md-icon md-font-set=material-icons>save</md-icon></md-button><md-button class=md-icon-button aria-label=Avançar ng-click=$ctrl.nextItem() ng-disabled=$ctrl.isNextDisabled><md-icon md-font-set=material-icons>skip_next</md-icon></md-button></div></md-toolbar></md-content><section msd-wheel=$ctrl.catchMouseWheel($event)></section>',
      controller: OtusSheetController,
      bindings: {
        surveyTemplate: '<'
      }
    });

  OtusSheetController.$inject = [
    '$scope',
    '$element',
    '$compile',
    'otusjs.player.core.player.PlayerService',
    'otusjs.player.core.player.DataService',
    'otusjs.player.core.activity.CurrentQuestionService'
  ];

  function OtusSheetController($scope, $element, $compile, PlayerService, DataService, CurrentQuestionService) {
    var self = this;

    var SURVEY_ITEM = '<otus-survey-item item-data="itemData" />';

    /* Public methods */
    self.$onInit = onInit;
    self.previousItem = previousItem;
    self.nextItem = nextItem;
    self.catchMouseWheel = catchMouseWheel;

    function onInit() {
      self.isLoading = true;
      PlayerService.play(self.surveyTemplate);
      _setFirstQuestion();
    }

    function _setFirstQuestion() {
      if (PlayerService.hasNext()) {
        if (self.currentChild) {
          transferData();
          destroyCurrentItem();
        }
        loadItem(PlayerService.getNext());
        updateToolbar();
      }
    }

    function previousItem() {
      if (PlayerService.canWeGo('back')) {
        if (self.currentChild) {
          destroyCurrentItem();
        }
        loadItem(PlayerService.getPrevious());
        updateToolbar();
      }
    }

    function nextItem() {
      if (PlayerService.canWeGo('ahead')) {
        if (self.currentChild) {
          transferData();
          destroyCurrentItem();
        }
        loadItem(PlayerService.getNext());
        updateToolbar();
      }
    }

    function loadItem(item) {
      $scope.itemData = item;
      $element.find('section').prepend($compile(SURVEY_ITEM)($scope));
      CurrentQuestionService.setQuestion(item);
    }

    function updateToolbar() {
      self.isPreviousDisabled = !PlayerService.hasPrevious();
      self.isNextDisabled = !PlayerService.hasNext();
    }

    function transferData() {
      DataService.transferData(self.currentChild.filling);
    }

    function destroyCurrentItem() {
      self.currentChild.destroy();
    }

    function catchMouseWheel($event) {
      if (event.deltaY > 0) {
        nextItem();
      } else {
        previousItem();
      }
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
    'otusjs.player.core.CurrentQuestion',
    '$filter'
  ];

  function OtusSurveyItemController($scope, $element, CurrentQuestion, $filter) {
    var self = this;

    /* Public methods */
    self.isQuestion = isQuestion;
    self.isItem = isItem;
    self.restoreAll = restoreAll;
    self.update = update;
    self.destroy = destroy;
    self.updateValidation = updateValidation;

    self.$onInit = function() {
      self.filling = {};
      self.filling.questionID = self.itemData.templateID;
      $scope.$parent.$ctrl.currentChild = self;
      CurrentQuestion.observerRegistry(self);
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
      self.filling[prop] = value;
      CurrentQuestion.setAnswer(self.filling);
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

    OtusQuestionController.$inject = ['TagComponentBuilderService'];

    function OtusQuestionController(TagComponentBuilderService) {
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
            controller: OtusCalendarQuestionController,
            bindings: {
                itemData: '<',
                onUpdate: '&'
            }
        });

    function OtusCalendarQuestionController() {
        var self = this;

        self.update = function() {
            self.onUpdate({
                valueType: 'answer',
                value: self.answer
            });
        };

    }

})();

(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusIntegerQuestion', {
            template:'<md-content layout-padding><div layout=row><md-input-container md-no-float class=md-block flex-gt-sm=45><input type=number step=1 ng-model=$ctrl.answer ng-change=$ctrl.update() ui-integer placeholder="Insira um valor inteiro"></md-input-container><md-input-container class=md-block flex-gt-sm=45><otus-label item-label=$ctrl.itemData.unit></otus-label></md-input-container></div></md-content>',
            controller: IntegerQuestionController,
            bindings: {
                itemData: '<',
                onUpdate: '&'
            }
        });

    function IntegerQuestionController() {
        var self = this;

        self.update = function() {
            self.onUpdate({
                valueType: 'answer',
                value: self.answer
            });
        };
    }

})();

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
            controller: DecimalQuestionController,
            bindings: {
                itemData: '<',
                onUpdate: '&'
            }
        });


    function DecimalQuestionController() {
        var self = this;

        self.update = function() {
            self.onUpdate({
                valueType: 'answer',
                value: self.answer
            });
        };
    }

})();

(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusSingleSelectionQuestion', {
            template:'<md-content layout-padding style="margin-left: 10px"><md-radio-group ng-model=$ctrl.answer ng-change=$ctrl.update() layout-padding flex><md-radio-button value={{option.value}} ng-repeat="option in $ctrl.itemData.options" layout=row style="margin: 10px"><otus-label item-label=option.label.ptBR.formattedText></otus-label></md-radio-button></md-radio-group></md-content>',
            controller: SingleSelectionQuestionController,
            bindings: {
                itemData: '<',
                onUpdate: '&'
            }
        });

    function SingleSelectionQuestionController() {
        var self = this;

        self.update = function() {
            self.onUpdate({
                valueType: 'answer',
                value: self.answer
            });
        };
    }

})();

(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusCheckboxQuestion', {
            template:'<md-content layout-padding style="margin-top: 12px"><md-content ng-repeat="option in $ctrl.itemData.options track by $index" flex><md-checkbox value=$index ng-model=$ctrl.answerArray[$index].value.state ng-change=$ctrl.update($index) layout=row style="margin: 7px"><otus-label item-label=option.label.ptBR.formattedText></otus-label></md-checkbox></md-content></md-content>',
            controller: CheckboxQuestionController,
            bindings: {
                itemData: '<',
                onUpdate: '&'
            }
        });

    function CheckboxQuestionController() {
        var self = this;

        self.$onInit = function() {
            self.answerArray = [];
            self.itemData.options.forEach(function(option) {
                self.answerArray.push(_buildAnswerObject(option.value, false));
            });
        };

        self.update = function() {
            self.onUpdate({
                value: self.answerArray
            });
        };

        function _buildAnswerObject(index, value) {
            return {
                valueType: 'answer',
                value: {
                    option: index,
                    state: value
                }
            };
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusTextQuestion', {
            template:'<md-content id=text-question layout-padding><div layout=row><md-input-container md-no-float class=md-block flex><textarea ng-class="{lowercase: $ctrl.hasLowerCase, uppercase: $ctrl.hasUpperCase}" ng-model=$ctrl.answer ng-change=$ctrl.update() placeholder="Digite o texto aqui"></textarea></md-input-container></div></md-content>',
            controller: TextQuestionController,
            bindings: {
                itemData: '<',
                onUpdate: '&'
            }
        });

    TextQuestionController.$inject = [
        '$scope',
        '$element',
        'otusjs.player.core.CurrentQuestion',
        'uiSpecialsService',
        'uiAlphanumericService'
    ];

    function TextQuestionController($scope, $element, CurrentQuestion, uiSpecialsService, uiAlphanumericService) {
        var self = this;

        _init();

        self.hasUpperCase = CurrentQuestion.getFillingRules().upperCase;
        self.hasLowerCase = CurrentQuestion.getFillingRules().lowerCase;

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
            var hasAlphanumeric = CurrentQuestion.getFillingRules().alphanumeric;
            var hasSpecials = CurrentQuestion.getFillingRules().specials;

            if (hasAlphanumeric && hasAlphanumeric.data.reference) {
                uiAlphanumericService.apply($element);
            }
            if (hasSpecials && hasSpecials.data.reference) {
                uiSpecialsService.apply($element);
            }
        }

    }

})();

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
            controller: EmailQuestionController,
            bindings: {
                itemData: '<',
                onUpdate: '&'
            }
        });

    EmailQuestionController.$inject = ['$element'];

    function EmailQuestionController($element) {
        var self = this;

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

})();

(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusTimeQuestion', {
            template:'<md-content layout-padding><div layout=row><md-input-container class=md-block flex-gt-sm=45><md-icon class=material-icons>access_time</md-icon><input type=time ng-model=$ctrl.answer ng-change=$ctrl.update() aria-label=Tempo min=0 max=4999></md-input-container></div></md-content>',
            controller: TimeQuestionController,
            bindings: {
                itemData: '<',
                onUpdate: '&'
            }
        });

    function TimeQuestionController() {
        var self = this;

        self.update = function() {
            self.onUpdate({
                valueType: 'answer',
                value: self.answer
            });
        };
    }

})();

(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusPhoneQuestion', {
            template:'<md-content layout-padding><div><md-input-container md-no-float class=md-block flex-gt-sm=45><md-icon class=material-icons>phone</md-icon><input type=text ng-model=$ctrl.answer ng-change=$ctrl.update() placeholder="(XX) XXXXX-XXXX" ui-br-phone-number></md-input-container></div></md-content>',
            controller: PhoneQuestionController,
            bindings: {
                itemData: '<',
                onUpdate: '&'
            }
        });

    function PhoneQuestionController() {
        var self = this;

        self.update = function() {
            self.onUpdate({
                valueType: 'answer',
                value: self.answer
            });
        };
    }

})();

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
        'otusjs.player.core.CurrentQuestion',
        '$filter'
    ];

    function otusValidationErrorController(CurrentQuestion, $filter) {
        var self = this;
        self.$onInit = function() {

        };

        self.referenceAsDate = function(type) {
            var reference = CurrentQuestion.getFillingRules()[type].data.reference;
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
            var reference = CurrentQuestion.getFillingRules()[type].data.reference;
            return $filter('date')(new Date(reference), 'hh:mm:ss');
        };

        self.reference = function(type) {
            var reference = CurrentQuestion.getFillingRules()[type].data.reference;
            return reference;
        };
    }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.core', [
      'otusjs',
      'otusjs.player.core.activity',
      'otusjs.player.core.navigation',
      'otusjs.player.core.player',
      'otusjs.player.core.validation'
    ]);

}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.activity', []);

}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.activity')
    .service('otusjs.player.core.activity.CurrentQuestionService', Service);

  Service.$inject = [
    'otusjs.player.core.validation.ValidationService'
  ];

  function Service(ValidationService) {
    var self = this;
    var question;
    var validationError;
    var observer;

    /* Public Interface */
    self.getValidationError = getValidationError;
    self.ignoreValidation = ignoreValidation;
    self.validateQuestion = validateQuestion;
    self.answer = {
      'data': {}
    };

    self.setQuestion = function(item) {
      self.answer = {
        'data': {}
      };
      question = item;
      _startValidation();
      validationError = false;
      self.validationAnswer = {};
    };

    self.observerRegistry = function(obs) {
      observer = obs;
    };

    self.setAnswer = function(ans) {
      self.filling = ans;
      self.answer.data = self.filling.answer;
    };

    self.getAnswer = function() {
      return self.answer.data;
    };

    self.getFillingRules = function() {
      return question.fillingRules.options;
    };

    self.getQuestion = function() {
      return question;
    };

    function _startValidation() {
      ValidationService.setValidation(self.getQuestion(), self.answer);
    }

    function validateQuestion() {
      ValidationService.applyValidation(question, validationCallback);
    }

    function validationCallback(response) {
      self.validationAnswer = {};
      validationError = false;
      var validationResult;
      response[0].validatorsResponse.map(function(ValidatorResponse) {
        validationResult = !ValidatorResponse.result;
        self.validationAnswer[ValidatorResponse.name] = validationResult;
        if (!ValidatorResponse.result) {
          validationError = true;
        }
      });
      notifyObserver(self.validationAnswer);
    }

    function notifyObserver(validationMap) {
      observer.updateValidation(validationMap);
    }

    function getValidationError() {
      return validationError;
    }

    function ignoreValidation() {
      return false;
    }
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.activity')
    .service('otusjs.player.core.activity.CurrentSurveyService', Service);

  Service.$inject = [
    'otusjs.player.core.navigation.NavigationService'
  ];

  function Service() {
    var self = this;
    var _survey;

    /* Public Interface */
    self.getSurvey = getSurvey;
    self.setSurvey = setSurvey;
    self.getQuestions = getQuestions;
    self.getNavigations = getNavigations;
    self.getNavigationFrom = getNavigationFrom;
    self.getNextItemsFrom = getNextItemsFrom;
    self.getNextItem = getNextItem;

    function getSurvey() {
      return _survey;
    }

    function setSurvey(survey) {
      _survey = survey;
    }

    function getQuestions() {
      return _survey.SurveyItemManager.getItemList();
    }

    function getNavigations() {
      return _survey.NavigationManager.getNavigationList();
    }

    function getNavigationFrom(origin) {
      return _survey.NavigationManager.selectNavigationByOrigin(origin);
    }

    function getNextItemsFrom(origin) {
      var items = [];

      var rootNavigation = _selectNavigationByOrigin(origin);
      items = rootNavigation.routes.map(function(route) {
        return _getItemByTemplateID(route.destination);
      });

      return items;
    }

    function getNextItem(currentQuestion) {

    }

    function _selectNavigationByOrigin(origin) {
      var filter = _survey.navigationList.filter(function(navigation) {
        return navigation.origin === origin;
      });

      return filter[0];
    }

    function _getItemByTemplateID(templateID) {
      var fetchedItem = {};

      _survey.itemContainer.some(function(item) {
        if (item.templateID.toLowerCase() === templateID.toLowerCase()) {
          fetchedItem = item;
          return true;
        }
      });

      return fetchedItem;
    }
  }
}());

(function() {
    'use strict';

    angular
        .module('otusjs.player.core.activity')
        .service('otusjs.player.core.activity.ItemManagerService', ItemManagerService);

    function ItemManagerService() {
        var self = this;

        var _items = [];
        var _currentItemIndex = null;
        var _currentItem = null;
        var _hasNext = null;
        var _hasPrevious = null;

        /* Public methods */
        self.init = init;
        self.getItems = getItems;
        self.getCurrentItem = getCurrentItem;
        self.hasNext = hasNext;
        self.hasPrevious = hasPrevious;
        self.next = next;
        self.previous = previous;

        function init(items) {
            _items = items;
            _currentItemIndex = -1;
            _updateIterator();
        }

        function getItems() {
            return _items;
        }

        function getCurrentItem() {
            return _currentItem;
        }

        function hasNext() {
            return (_hasNext) ? true : false;
        }

        function hasPrevious() {
            return (_hasPrevious) ? true : false;
        }

        function next() {
            ++_currentItemIndex;
            _updateIterator();
            return _currentItem;
        }

        function previous() {
            --_currentItemIndex;
            _updateIterator();
            return _currentItem;
        }

        function _updateIterator() {
            _hasNext = _items[_currentItemIndex + 1];
            _hasPrevious = _items[_currentItemIndex - 1];
            _currentItem = _items[_currentItemIndex];
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('otusjs.player.core.player', []);

}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.player')
    .service('otusjs.player.core.player.HtmlBuilderService', HtmlBuilderService);

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
    .module('otusjs.player.core.player')
    .service('otusjs.player.core.player.TagComponentBuilderService', TagComponentBuilderService);

  TagComponentBuilderService.$inject = [
    'otusjs.player.core.player.HtmlBuilderService'
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
    .module('otusjs.player.core.player')
    .service('otusjs.player.core.player.DataService', DataService);

  DataService.$inject = [
    'ActivityFacadeService',
    'ActivityUserFactory',
    'ElementRegisterFactory'
  ];

  function DataService(ActivityFacadeService, ActivityUserFactory, ElementRegisterFactory) {
    var self = this;

    self.transferData = transferData;

    function transferData(data) {
      var user = ActivityUserFactory.create('User Name', 'user@email.com');

      ActivityFacadeService.createActivity('category', 'group', 'FOR123', user);
      ActivityFacadeService.createQuestionFill(data.questionID, data.answer, data.metadata, data.comment);
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.player')
    .service('otusjs.player.core.player.PlayerService', PlayerService);

  PlayerService.$inject = [
    'otusjs.player.core.activity.ItemManagerService',
    'otusjs.player.core.activity.CurrentQuestionService',
    'otusjs.player.core.activity.CurrentSurveyService'
  ];

  function PlayerService(ItemManagerService, CurrentQuestionService, CurrentSurveyService) {
    var self = this;
    var _nextItems = [];

    self.play = play;
    self.getNext = getNext;
    self.getPrevious = getPrevious;
    self.hasNext = hasNext;
    self.hasPrevious = hasPrevious;
    self.canWeGo = canWeGo;

    function play(survey) {
      ItemManagerService.init(survey.itemContainer);
      CurrentSurveyService.setSurvey(survey);
      CurrentQuestionService.setQuestion(survey.itemContainer[0]);
    }

    function getNext() {
      if (hasNext()) {
        return ItemManagerService.next();
      }
    }

    function getPrevious() {
      if (hasPrevious()) {
        return ItemManagerService.previous();
      }
    }

    function hasNext() {
      _nextItems = CurrentSurveyService.getNextItemsFrom(CurrentQuestionService.getQuestion().templateID);
      return _nextItems.length;
    }

    function hasPrevious() {
      return ItemManagerService.hasPrevious();
    }

    function canWeGo(where) {
      var ignoreValidation = CurrentQuestionService.ignoreValidation();
      var directions = {
        'ahead': function() {
          CurrentQuestionService.validateQuestion(); //updates getValidationError
          var validationOk = !CurrentQuestionService.getValidationError();
          var conditions = [
            hasNext(),
            (validationOk || ignoreValidation)
          ];
          return conditions.indexOf(false, conditions) === -1;
        },
        'back': function() {
          var conditions = [
            hasPrevious(),
          ];
          return conditions.indexOf(false, conditions) === -1;
        }
      };
      return directions[where]();
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.validation', [
      'otus.validation'
    ]);

}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.validation')
    .service('otusjs.player.core.validation.ValidationService', Service);

  Service.$inject = [
    'ElementRegisterFactory',
    'ValidationService',
  ];

  function Service(ElementRegisterFactory, ValidationService) {
    var self = this;
    var elementRegister;

    self.setValidation = setValidation;
    self.applyValidation = applyValidation;
    self.finishValidation = finishValidation;

    function setValidation(question, answer) {
      var fillingRules = question.fillingRules.options;
      elementRegister = ElementRegisterFactory.create(question.customID, answer);
      Object.keys(fillingRules).map(function(validator) {
        var reference = fillingRules[validator].data;
        elementRegister.addValidator(validator, reference);
      });
      ValidationService.registerElement(elementRegister);
    }

    function finishValidation() {
      ValidationService.validateAllElements(function(response) {
        //TODO
      });
    }

    function applyValidation(question, callback) {
      ValidationService.validateElement(question.customID, callback);
    }
  }
}());

(function() {
    'use strict';

    angular
        .module('otusjs.player.core.navigation', [
          'otusjs'
        ]);

}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.core.navigation')
    .service('otusjs.player.core.navigation.NavigationService', Service);

  // Service.$inject = [
  //   'otusjs.model.navigation.NavigationApiService'
  // ];

  function Service() {
    var self = this;
    // console.log(NavigationApiService);
    /* Public Interface */
    self.getSurvey = getSurvey;

    function getSurvey() {
      return _survey;
    }
  }
}());
