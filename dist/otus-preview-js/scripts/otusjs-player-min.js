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
        self.comment = CurrentItemService.getFilling(self.itemData.templateID).comment;
        self.otusQuestion.comment = self;
    };

    self.update = function() {
      self.onUpdate({
        valueType: 'comment',
        value: self.comment
      });
    };

    self.clear = function() {
      CurrentItemService.getFilling(self.itemData.templateID).comment = "";
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

    self.$onInit = onInit;
    self.update = update;
    self.clear = clear;
    self.blurOnClick = blurOnClick;

    function onInit() {
        self.metadata = CurrentItemService.getFilling(self.itemData.templateID).metadata.value;
        self.otusQuestion.metadata = self;
    }

    function update() {
      self.onUpdate({
        valueType: 'metadata',
        value: self.metadata
      });
    }

    function clear() {
        CurrentItemService.getFilling(self.itemData.templateID).metadata.clear();
        delete self.metadata;
    }

    function blurOnClick() {
      $element.find('#metadataGroupRadioGroup').removeClass('md-focused');
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusPlayer', {
      template:'<otus-survey-cover on-play="$ctrl.play()" on-stop="$ctrl.stop()" soft-blocker="$ctrl.softBlocker" hard-blocker="$ctrl.hardBlocker" ng-show="$ctrl.showCover" layout-align="center center" layout="column" flex class="player-cover"></otus-survey-cover><div layout="column" flex ng-show="$ctrl.showActivity"><otus-survey-header layout="row"></otus-survey-header><div layout="row" flex><otus-static-variable layout="row"></otus-static-variable><md-content layout="row" flex><otus-player-display go-back="$ctrl.goBack()" layout="column" flex style="position: relative !important"></otus-player-display><otus-player-commander class="md-fab-bottom-right md-fling" layout="column" flex="10" layout-align="center center" style="max-height:none!important;" on-go-back="$ctrl.goBack()" on-pause="$ctrl.pause()" on-stop="$ctrl.stop()" on-go-ahead="$ctrl.goAhead()" on-eject="$ctrl.eject()"></otus-player-commander></md-content></div></div><otus-survey-back-cover on-finalize="$ctrl.eject()" on-stop="$ctrl.stop()" ng-show="$ctrl.showBackCover" layout-align="center center" layout="column" flex class="player-back-cover"></otus-survey-back-cover>',
      controller: Controller
    });

  Controller.$inject = [
    'otusjs.player.core.player.PlayerService'
  ];

  function Controller(PlayerService) {
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

      _setupHardBlocker();
      _setupSoftBlocker();

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

    function _setupHardBlocker() {
      self.hardBlocker = PlayerService.getHardBlocker();
    }

    function _setupSoftBlocker() {
      self.softBlocker = PlayerService.getSoftBlocker();
    }

    function _loadItem() {
      if(PlayerService.getItemData()){
        self.playerDisplay.loadItem(PlayerService.getItemData());
      }
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusViewer', {
      template:'<md-content id="activity-viewer"><md-progress-circular ng-if="!$ctrl.ready" class="md-primary" md-diameter="70"></md-progress-circular><div layout="row" ng-if="$ctrl.ready" flex><span flex class="no-print"></span><div layout="column" id="sheet" class="md-whiteframe-1dp" flex><div layout="row" layout-align="center center"><span class="md-title">{{$ctrl.activityData.acronym}} - {{$ctrl.activityData.name}}</span></div><div layout="column" ng-show="$ctrl.filters.participantData"><div layout="row"><span style="margin-right: 5px;">{{$ctrl.activityData.participantData.recruitmentNumber}} -</span> <span>{{$ctrl.activityData.participantData.name}}</span></div></div><md-list><md-list-item class="page-break page-item" layout="row" layout-align="start start" ng-repeat="item in $ctrl.activityData.itemContainer" ng-show="$ctrl.filters.state[item.navigationState]"><div layout-padding layout="row" class="md-whiteframe-1dp" layout-align="center center"><span>{{$index + 1}}</span></div><survey-item-view item="item" filters="$ctrl.filters" flex></survey-item-view></md-list-item></md-list></div><div id="header-viewer" layout-padding layout="column" layout-align="start end" class="no-print" flex><div layout="column" class="viewer-commands"><md-button class="md-fab md-mini" ng-click="$ctrl.print()"><md-icon class="no-print">print</md-icon><md-tooltip md-direction="left">Imprimir</md-tooltip></md-button><md-button class="md-fab md-mini" ng-click="$ctrl.showFilters()"><md-icon>filter_list</md-icon><md-tooltip md-direction="left">Filtros</md-tooltip></md-button><md-button class="md-fab md-mini" ng-click="$ctrl.exit()"><md-icon>arrow_back</md-icon><md-tooltip md-direction="left">Sair</md-tooltip></md-button></div></div></div></md-content>',
      controller: 'otusViewerCtrl as $ctrl'
    }).controller('otusViewerCtrl', Controller);

  Controller.$inject = [
    '$compile',
    '$scope',
    '$mdBottomSheet',
    'otusjs.player.data.viewer.SurveyViewFactory'
  ];

  function Controller(
    $compile, $scope, $mdBottomSheet,
    SurveyViewerFactory) {
    var self = this;

    self.$onInit = onInit;
    self.ready = false;
    $scope.filters = {};
    self.filters = $scope.filters;
    self.showFilters = showFilters;
    self.print = print;

    /* Public methods */
    self.exit = exit;
    $scope.exit = exit;


    function onInit() {
      self.activityData = SurveyViewerFactory.create();
      self.ready = true;
      compileFilters();
    }


    function compileFilters() {
      let template = '<otus-viewer-filters filters=$ctrl.filters></otus-viewer-filters>';
      self.filterComponent = $compile(template)($scope.$new());
    }

    function print() {
      window.print();
    }

    function showFilters() {
      $mdBottomSheet.show({
        template:'<md-bottom-sheet class="md-list md-has-header"><div layout="row" layout-align="start center" ng-cloak><md-subheader ng-cloak>Filtros</md-subheader></div><div ng-cloak layout="row" layout-fill><md-content layout-align="start space-around"><md-checkbox class="md-grid-item-content" ng-model="filters.participantData">Dados do participante</md-checkbox><md-checkbox class="md-grid-item-content" ng-model="filters.customID">Id de questão</md-checkbox><md-checkbox class="md-grid-item-content" ng-model="filters.state.SKIPPED">Questões puladas</md-checkbox><md-checkbox class="md-grid-item-content" ng-model="filters.state.NOT_VISITED">Questões não visitadas</md-checkbox><md-checkbox class="md-grid-item-content" ng-model="filters.displayState">Estado da questão</md-checkbox></md-content></div><div ng-cloak layout-padding layout="row" layout-align="center center"><p class="caption-sheet">Modo de visualização de atividade.</p></div></md-bottom-sheet>',
        locals: {
          filters: self.filters
        },
        parent: angular.element(document.body),
        controller: BottomSheetController
      }).then(function (clickedItem) {
      }).catch(function (error) {
      });
    }


    function exit() {
      window.history.back();
    }


    function BottomSheetController($scope, filters) {
      $scope.filters = filters;
    }


  }
}());

(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusViewerFilters', {
      template:'<md-bottom-sheet class="md-list md-has-header"><div layout="row" layout-align="start center" ng-cloak><md-subheader ng-cloak>Filtros</md-subheader></div><div ng-cloak layout="row" layout-fill><md-content layout-align="start space-around"><md-checkbox class="md-grid-item-content" ng-model="filters.participantData">Dados do participante</md-checkbox><md-checkbox class="md-grid-item-content" ng-model="filters.customID">Id de questão</md-checkbox><md-checkbox class="md-grid-item-content" ng-model="filters.state.SKIPPED">Questões puladas</md-checkbox><md-checkbox class="md-grid-item-content" ng-model="filters.state.NOT_VISITED">Questões não visitadas</md-checkbox><md-checkbox class="md-grid-item-content" ng-model="filters.displayState">Estado da questão</md-checkbox></md-content></div><div ng-cloak layout-padding layout="row" layout-align="center center"><p class="caption-sheet">Modo de visualização de atividade.</p></div></md-bottom-sheet>',
      controller:'otusViewFiltersController as $ctrl',
      bindings: {
        filters: '='
      }
    })
    .controller('otusViewFiltersController', Controller);

  function Controller() {
    var self = this;
    self.$onInit = onInit;

    function onInit() {
      _setInitialFilters();
    }

    function _setInitialFilters() {
      self.filters = {
        participantData: true,
        displayState: false,
        customID: true,
        state: {
          SKIPPED: false,
          NOT_VISITED: false,
          ANSWERED: true,
          IGNORED: true,
          VISITED: true
        },
        fillingBox: true,
        comments: true
      };
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('surveyItemView', {
      template:'<div layout="row" flex><div layout="column" flex="5"></div><div layout="column" layout-align="start start" layout-margin="5" layout-fill><span flex="5"></span><div layout="row" layout-fill><span class="md-subhead" ng-show="$ctrl.filters.customID"><u>{{$ctrl.item.customID}}</u></span> <span flex="5"></span> <span ng-show="$ctrl.filters.displayState && $ctrl.filters.customID">|</span> <span flex="5"></span> <span ng-show="$ctrl.filters.displayState" class="md-caption">{{$ctrl.item.navigationStateLabel}}</span></div><span flex="5"></span><div layout="row" layout-fill><span ng-bind-html="$ctrl.item.label.ptBR.formattedText"></span></div><div id="fillingBox" bind-html-compile="$ctrl.template" layout-fill></div><span flex="5"></span></div></div>',
      controller: Controller,
      bindings: {
        item: '=',
        filters: '='
      }
    });

  Controller.$inject = [
    'otusjs.player.core.renderer.HtmlBuilderService'
  ];

  function Controller(HtmlBuilderService) {
    var self = this;
    self.$onInit = onInit;

    function onInit() {
      let _templateName = HtmlBuilderService.generateTagName(self.item.templateName);
      self.template = '<' + _templateName + ' item="$ctrl.item" filters="$ctrl.filters"/>';
    }

  }
}());
(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('calendarQuestionView', {
      template:'<div id="answer" ng-if="$ctrl.item.hasAnswer" layout-fill><p class="md-caption" style="color: gray;">Resposta</p><p ng-show="$ctrl.filters.fillingBox">{{$ctrl.item.answer.date | date:\'dd/MM/yyyy\'}}</p></div><div id="metadata" ng-if="$ctrl.item.hasMetadata" layout-fill><p class="md-caption" style="color: gray;">Metadado</p><p ng-bind-html="$ctrl.item.metadata.label.ptBR.formattedText"></p></div><div id="comment" ng-if="$ctrl.item.hasComment" layout-fill><p class="md-caption" style="color: gray;">Comentário</p><p ng-bind-html="$ctrl.item.comment"></p></div>',
      controller: Controller,
      bindings: {
        filters: '=',
        item: '='
      }
    });

  function Controller() {
    var self = this;
    self.$onInit = onInit;

    function onInit() {

    }
  }

}());
(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('fileUploadQuestionView', {
      template:'<div id="answer" ng-if="$ctrl.item.hasAnswer" layout-fill><p class="md-caption" style="color: gray;">Resposta</p><p ng-show="$ctrl.filters.fillingBox" ng-repeat="file in $ctrl.item.answer">{{file.name}}</p></div><div id="metadata" ng-if="$ctrl.item.hasMetadata" layout-fill><p class="md-caption" style="color: gray;">Metadado</p><p ng-bind-html="$ctrl.item.metadata.label.ptBR.formattedText"></p></div><div id="comment" ng-if="$ctrl.item.hasComment" layout-fill><p class="md-caption" style="color: gray;">Comentário</p><p ng-bind-html="$ctrl.item.comment"></p></div>',
      controller: Controller,
      bindings: {
        filters: '=',
        item: '='
      }
    });

  function Controller() {}

}());
(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('questionView', {
      template:'<div id="answer" ng-if="$ctrl.item.hasAnswer" layout-fill><p class="md-caption" style="color: gray;">Resposta</p><p ng-show="$ctrl.filters.fillingBox">{{$ctrl.item.answer}}</p><p ng-show="!$ctrl.filters.fillingBox">{{$ctrl.item.answer}}</p></div><div id="metadata" ng-if="$ctrl.item.hasMetadata" layout-fill><p class="md-caption" style="color: gray;">Metadado</p><p ng-show="$ctrl.filters.fillingBox" ng-bind-html="$ctrl.item.metadata.label.ptBR.formattedText"></p></div><div id="comment" ng-if="$ctrl.item.hasComment" ng-show="$ctrl.filters.comments" layout-fill><p class="md-caption" style="color: gray;">Comentário</p><p ng-show="$ctrl.filters.fillingBox" ng-bind-html="$ctrl.item.comment"></p></div>',
      controller: Controller,
      bindings: {
        item: '=',
        filters: '='
      }
    });



  function Controller() {
    var self = this;
    self.$onInit = onInit;


    function onInit() {
    }
  }

}());
(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('checkboxQuestionView', {
      template:'<div id="answer" ng-if="$ctrl.item.hasAnswer" layout-fill><p class="md-caption" style="color: gray;">Resposta</p><div ng-repeat="option in $ctrl.item.answer" layout-align="start, center"><md-icon style="font-size: 23px;" ng-show="option.value">check_box</md-icon><md-icon style="font-size: 23px;" ng-hide="option.value">check_box_outline_blank</md-icon><span ng-bind-html="option.label.ptBR.formattedText"></span></div></div><div id="metadata" ng-if="$ctrl.item.hasMetadata" layout-fill><p class="md-caption" style="color: gray;">Metadado</p><p ng-bind-html="$ctrl.item.metadata.label.ptBR.formattedText"></p></div><div id="comment" ng-if="$ctrl.item.hasComment" layout-fill><p class="md-caption" style="color: gray;">Comentário</p><p ng-bind-html="$ctrl.item.comment"></p></div>',
      controller: Controller,
      bindings: {
        filters: '=',
        item: '='
      }
    });


  function Controller() {}

}());
(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('singleSelectionQuestionView', {
      template:'<div id="answer" ng-if="$ctrl.item.hasAnswer" layout-fill xmlns="http://www.w3.org/1999/html"><p class="md-caption" style="color: gray;">Resposta</p><div ng-repeat="option in $ctrl.item.answer" layout-align="start, center"><md-icon style="font-size: 23px; margin-top: 3px;" ng-show="option.value===1">radio_button_checked</md-icon><md-icon style="font-size: 23px; margin-top: 3px;" ng-hide="option.value===1">radio_button_unchecked</md-icon><span ng-bind-html="option.label.ptBR.formattedText"></span></div></div><div id="metadata" ng-if="$ctrl.item.hasMetadata" layout-fill><p class="md-caption" style="color: gray;">Metadado</p><p ng-bind-html="$ctrl.item.metadata.label.ptBR.formattedText"></p></div><div id="comment" ng-if="$ctrl.item.hasComment" layout-fill><p class="md-caption" style="color: gray;">Comentário</p><p ng-bind-html="$ctrl.item.comment"></p></div>',
      controller: Controller,
      bindings: {
        filters: '=',
        item: '='
      }
    });


  function Controller() {}

}());

(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('gridIntegerQuestionView', {
      template:'<div id="answer" ng-if="$ctrl.item.hasAnswer" layout-fill><p class="md-caption" style="color: gray;">Resposta</p><div ng-repeat="position in $ctrl.item.answer" layout="row"><div ng-repeat="gridInteger in position.positions" layout="column" flex layout-margin><md-input-container flex><label ng-bind-html="gridInteger.label.ptBR.formattedText"></label> <textarea type="text" ng-model="gridInteger.value" scrolling="no" style="overflow:hidden; resize:none;" ng-disabled="true"></textarea><div style="color: gray;" ng-bind-html="gridInteger.unit.ptBR.formattedText"></div></md-input-container></div></div></div><div id="metadata" ng-if="$ctrl.item.hasMetadata" layout-fill><p class="md-caption" style="color: gray;">Metadado</p><p ng-bind-html="$ctrl.item.metadata.label.ptBR.formattedText"></p></div><div id="comment" ng-if="$ctrl.item.hasComment" layout-fill><p class="md-caption" style="color: gray;">Comentário</p><p ng-bind-html="$ctrl.item.comment"></p></div>',
      controller: Controller,
      bindings: {
        filters: '=',
        item: '='
      }
    });


  function Controller() {}

}());
(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('gridTextQuestionView', {
      template:'<div id="answer" ng-if="$ctrl.item.hasAnswer" layout-fill><p class="md-caption" style="color: gray;">Resposta</p><div ng-repeat="position in $ctrl.item.answer" layout="row"><div ng-repeat="gridInteger in position.positions" layout="column" flex layout-margin><md-input-container flex><label ng-bind-html="gridInteger.label.ptBR.formattedText"></label> <textarea type="text" ng-model="gridInteger.value" scrolling="no" style="overflow:hidden; resize:none;" ng-disabled="true"></textarea><div style="color: gray;" ng-bind-html="gridInteger.unit.ptBR.formattedText"></div></md-input-container></div></div></div><div id="metadata" ng-if="$ctrl.item.hasMetadata" layout-fill><p class="md-caption" style="color: gray;">Metadado</p><p ng-bind-html="$ctrl.item.metadata.label.ptBR.formattedText"></p></div><div id="comment" ng-if="$ctrl.item.hasComment" layout-fill><p class="md-caption" style="color: gray;">Comentário</p><p ng-bind-html="$ctrl.item.comment"></p></div>',
      controller: Controller,
      bindings: {
        filters: '=',
        item: '='
      }
    });

//todo: use the same component for both grid questions?
  function Controller() {
    var self = this;
    self.$onInit = onInit;

    function onInit() {

    }
  }

}());

(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('imageItemView', {
      template:'<div layout="row"><md-card><img ng-src="{{$ctrl.item.value}}"><md-card-content><div style="min-height:21px; padding: 3px; margin: 0" flex><span ng-bind-html="$ctrl.item.footer.ptBR.formattedText"></span></div></md-card-content></md-card></div>',
      controller: Controller,
      bindings: {
        filters: '=',
        item: '='
      }
    });


  function Controller() {
    var self = this;
    self.$onInit = onInit;

    function onInit() {

    }
  }

}());
(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('textItemView', {
      template:'<div layout="row"><span ng-bind-html="$ctrl.item.value.ptBR.formattedText"></span></div>',
      controller: Controller,
      bindings: {
        filters: '=',
        item: '='
      }
    });


  function Controller() {
    var self = this;
    self.$onInit = onInit;

    function onInit() {

    }
  }

}());

(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('timeQuestionView', {
      template:'<div id="answer" ng-if="$ctrl.item.hasAnswer" layout-fill><p class="md-caption" style="color: gray;">Resposta</p><p>{{$ctrl.item.answer.date | date:\'H:mm\'}}</p></div><div id="metadata" ng-if="$ctrl.item.hasMetadata" layout-fill><p class="md-caption" style="color: gray;">Metadado</p><p ng-bind-html="$ctrl.item.metadata.label.ptBR.formattedText"></p></div><div id="comment" ng-if="$ctrl.item.hasComment" layout-fill><p class="md-caption" style="color: gray;">Comentário</p><p ng-bind-html="$ctrl.item.comment"></p></div>',
      controller: Controller,
      bindings: {
        filters: '=',
        item: '='
      }
    });

  function Controller() {
    var self = this;
    self.$onInit = onInit;

    function onInit() {

    }
  }

}());
(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusStaticVariable', {
      template:'<div class="fab-speed-dial"><md-button id="ButtonIsLockOpenClose" ng-click="$ctrl.isLockOpenClose()" class="md-icon-button md-fab md-mini md-accent" aria-label="button isLockOpenClose"><md-icon md-font-set="material-icons">{{ $ctrl.iconLockOpenClose }}</md-icon><md-tooltip md-direction="bottom">{{ $ctrl.tooltipLockOpenClose }}</md-tooltip></md-button></div><md-sidenav class="md-sidenav-left md-whiteframe-5dp" md-is-locked-open="$ctrl.shouldLockOpenClose && $mdMedia(\'gt-xs\')"><div layout-padding><h3>Informações Auxiliares</h3></div><md-content layout="column"><div layout="column" layout-padding layout-align="start none" ng-repeat="option in $ctrl.variable"><div layout="column" layout-align="center start"><span class="md-caption" style="color: gray;">{{ option.label }}</span> <span class="md-subhead">{{ option.translatedValue }}</span></div><md-divider></md-divider></div></md-content></md-sidenav>',
      controller: 'otusStaticVariableCtrl as $ctrl'
    }).controller('otusStaticVariableCtrl', Controller);

  Controller.$inject = [
    'otusjs.player.data.activity.ActivityFacadeService'
  ];

  function Controller(ActivityFacadeService) {
    var self = this;
    var _variable = null;

    self.shouldLockOpenClose = true;
    self.iconLockOpenClose = 'arrow_left';
    self.tooltipLockOpenClose = 'Fechar';

    self.$onInit = onInit;
    self.isLockOpenClose = isLockOpenClose;

    function onInit() {
      _getWholeStaticVariableList();
    }

    function _getWholeStaticVariableList() {
      _variable = ActivityFacadeService.getWholeTemplateStaticVariableList();

      _variable.forEach(function(variable){
        if(!variable.translatedValue){
          variable.translatedValue = "Não há dados.";
        }
      });

     self.variable = _variable;

      return self.variable;
    }

    function isLockOpenClose(){
      self.shouldLockOpenClose = !self.shouldLockOpenClose;
      self.iconLockOpenClose = self.shouldLockOpenClose ? 'arrow_left' : 'arrow_right';
      self.tooltipLockOpenClose = self.shouldLockOpenClose ? 'Fechar' : 'Abrir';
    }
  }
}());
(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusPlayerCommander', {
      template:'<div layout-padding layout="column" flex layout-align="space-around center" style="position: fixed;"><md-button id="previousQuestion" class="md-fab md-warn md-mini" aria-label="Voltar" ng-click="$ctrl.goBack()" ng-disabled="$ctrl.isGoBackDisabled"><md-icon md-font-set="material-icons">arrow_drop_up</md-icon><md-tooltip md-direction="bottom">Voltar</md-tooltip></md-button><span flex="5"></span><md-button id="cancelActivity" class="md-fab md-raised md-mini" aria-label="Cancelar" ng-click="$ctrl.stop()"><md-icon md-font-set="material-icons">close</md-icon><md-tooltip md-direction="bottom">Cancelar</md-tooltip></md-button><span flex="5"></span><md-button id="saveActivity" class="md-fab md-accent md-mini" aria-label="Salvar" ng-click="$ctrl.pause()"><md-icon md-font-set="material-icons">save</md-icon><md-tooltip md-direction="bottom">Salvar</md-tooltip></md-button><span flex="5"></span><md-button id="nextQuestion" class="md-fab md-warn md-mini" aria-label="Avançar" ng-click="$ctrl.goAhead()" ng-disabled="$ctrl.isGoAheadDisabled"><md-icon md-font-set="material-icons">arrow_drop_down</md-icon><md-tooltip md-direction="bottom">Avançar</md-tooltip></md-button><span flex="5"></span></div>',
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

(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusPlayerDisplay', {
      template:'<span flex="5"></span><div layout="row" flex><span flex="10"></span><div flex layout="column"><answer-view ng-repeat="item in questions" ng-show="questions.length" go-back="$ctrl.goBack()" icon="item.objectType" item-data="item" question="{{item.label.ptBR.formattedText}}"></answer-view><div flex layout="column" id="pagePlayer"></div></div></div>',
      controller: 'otusPlayerDisplayCtrl as $ctrl',
      bindings: {
        goBack: '&'
      }
    }).controller('otusPlayerDisplayCtrl', Controller);

  Controller.$inject = [
    '$scope',
    '$document',
    '$element',
    '$compile',
    '$location',
    '$anchorScroll',
    'otusjs.player.data.activity.ActivityFacadeService',
    'otusjs.player.core.player.PlayerService'
  ];

  function Controller($scope, $document, $element, $compile, $location, $anchorScroll, ActivityFacadeService, PlayerService) {
    var self = this;

    var SURVEY_ITEM = '<otus-survey-item item-data="itemData" id="{{itemData.templateID}}" style="margin: 0;display:block;" class="animate-switch"/>';
    var SURVEY_COVER = '<otus-cover />';

    /* Public methods */
    self.$onInit = onInit;
    self.loadItem = loadItem;
    self.showCover = showCover;
    self.remove = remove;
    self.currentItems = [];


    function onInit() {
      $scope.$parent.$ctrl.playerDisplay = self;
      $scope.itemData = {};
      $scope.itemData.templateID = '';
      $scope.questions = [];
      self.ids = [];
    }


    function _destroyCurrentItems() {
      if (self.currentItems.length) {
        self.currentItems.forEach(item => {
          item.destroy();
        });
      }

      self.currentItems = [];
    }

    function loadItem(itemsData) {
      if (_shouldLoadItem(itemsData[itemsData.length -1])) {
        _saveQuestion();
        _destroyCurrentItems();
        _removeQuestions(itemsData);

        $element.find('#pagePlayer').empty();
        for (let i = 0; i < itemsData.length; i++) {
          (function () {
            $scope = $scope.$new();
            $scope.itemData = itemsData[i];
            _setQuestionId(itemsData[i].templateID);
            let element = $compile(SURVEY_ITEM)($scope);
            $element.find('#pagePlayer').append(element);
          }());
        }
        _focusOnItem(itemsData[0].templateID);
      }

      if (PlayerService.isGoingBack()) {
        if (PlayerService.getGoBackTo() !== itemsData[0].templateID) {
          self.goBack();
        } else {
          PlayerService.setGoBackTo(null);
        }
      }
    }

    function _removeQuestions(itemsData) {
      let id = itemsData[0].templateID;

      var index = _getIndexQuestionId(id);
      if (index > -1) {
        var length = $scope.questions.length;
        $scope.questions.splice(index, length);
        self.ids.splice(index, length);

      }
    }

    function _setQuestionId(id) {
      self.ids.push(id);
    }

    function _getIndexQuestionId(id) {
      return self.ids.indexOf(id);
    }

    function _focusOnItem(idQuestion) {
      $location.hash(idQuestion);
      $anchorScroll();
    }

    function _saveQuestion() {
      if (self.currentItems.length) {
        self.currentItems.forEach(item => {
          var question = angular.copy(item.itemData);
          question.data = ActivityFacadeService.fetchItemAnswerByTemplateID(question.templateID);
          question.data = question.data ? question.data : _setAnswerBlank();
          $scope.questions.push(question);
        });
      }
    }

    function _setAnswerBlank() {
      return {
        metadata: {
          value: null
        },
        answer: {
          value: null
        }
      };
    }

    function showCover() {
      _destroyCurrentItems();
      $element.find('#pagePlayer').empty();
      $element.find('#pagePlayer').append($compile(SURVEY_COVER)($scope));
    }

    function remove() {
      $element.find('#pagePlayer').remove();
    }

    function _shouldLoadItem(itemData) {
      return !self.currentItems.length  || (self.currentItems.length && $scope.itemData.templateID !== itemData.templateID);
    }
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusSurveyBackCover', {
      template:'<md-content class="cover-content" layout-align="center center" layout="row" flex><div layout-align="center center" layout="column" flex><section><h2 class="md-display-1">{{ $ctrl.title }}</h2></section><div layout="row"><md-button class="md-raised md-primary" aria-label="Finalizar" ng-click="$ctrl.finalize()"><md-icon md-font-set="material-icons">assignment_turned_in</md-icon>Finalizar</md-button><md-button class="md-raised md-no-focus" aria-label="Sair" ng-click="$ctrl.stop()"><md-icon md-font-set="material-icons">exit_to_app</md-icon>Sair</md-button></div></div></md-content>',
      controller: Controller,
      bindings: {
        onFinalize: '&',
        onStop: '&'
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
    self.stop = stop;

    /* Public methods */
    self.$onInit = onInit;

    function finalize() {
      self.onFinalize();
    }

    function stop() {
      self.onStop();
    }

    function onInit() {
      $scope.$parent.$ctrl.playerBackCover = self;
      var activity = ActivityFacadeService.getCurrentSurvey().getSurvey();
      self.title = activity.getName();
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusSurveyCover', {
      template:'<md-content class="cover-content" layout-align="center center" layout="row" flex><div layout-align="center center" layout="column" flex><section><h2 class="md-display-1">{{ $ctrl.title }}</h2></section><div ng-if="$ctrl.hardError" layout="row"><md-icon md-font-set="material-icons">warning</md-icon><span class="md-body-2" layout-padding>{{ $ctrl.message }}</span></div><div layout="row"><md-button class="md-raised md-primary" aria-label="Iniciar" ng-click="$ctrl.play()" ng-disabled="$ctrl.hardError"><md-icon md-font-set="material-icons">assignment</md-icon>Iniciar</md-button><md-button class="md-raised md-no-focus" aria-label="Sair" ng-click="$ctrl.stop()"><md-icon md-font-set="material-icons">exit_to_app</md-icon>Sair</md-button></div><md-progress-circular md-primary md-mode="indeterminate" ng-show="$ctrl.softProgress || $ctrl.hardProgress"></md-progress-circular></div></md-content>',
      controller: Controller,
      bindings: {
        onPlay: '&',
        hardBlocker: '&',
        softBlocker: '&',
        onStop: '&'
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
    self.stop = stop;

    function onInit() {
      $scope.$parent.$ctrl.playerCover = self;
      var activity = ActivityFacadeService.getCurrentSurvey().getSurvey();
      self.title = activity.getName();
      _unblock();
    }

    function _unblock() {
      self.hardError = false;
      self.softError = false;
      self.softProgress = false;
      self.hardProgress = false;

      if (self.hardBlocker()) {
        self.hardProgress = true;
        self.hardBlocker()
          .then(function () {
            self.hardProgress = false;
          })
          .catch(function () {
            self.hardProgress = false;
            self.hardError = true;
            self.message = 'Ocorreu um erro ao baixar informações necessárias ao preenchimento da atividade. Clique para sair.';
          });
      }

      if(self.softBlocker()){
        self.softProgress = true;
        self.softBlocker()
          .then(function () {
            self.softProgress = false;
          })
          .catch(function () {
            self.softProgress = false;
            self.softError = true;
          });
      }
    }

    function play() {
      self.onPlay();
    }

    function stop() {
      self.onStop();
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
      template:'<md-toolbar layout="row" class="md-whiteframe-5dp" flex><div layout="row" layout-align="start center" flex="40"><span flex="10"></span><div class="md-padding"><img src="app/static-resource/image/coruja_pesquisadora.png" class="toolbar-icon"></div><span flex="5"></span><md-chips><md-chip>{{ $ctrl.surveyIdentity.acronym }}</md-chip></md-chips><div class="md-body-2"><span>{{ $ctrl.surveyIdentity.name }}</span></div></div><div layout="row" layout-margin layout-align="center center"><md-icon md-svg-icon="file-document-box"></md-icon><div><span>{{ $ctrl.participantData.name }}</span> <span>|</span> <span>{{ $ctrl.participantData.recruitmentNumber }}</span></div></div></md-toolbar>',
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
      template:'<md-card flex><md-card-title layout="row" ng-if="!$ctrl.isItem()"><md-card-title-text layout="column" flex><div layout="row"><otus-label class="md-headline" item-label="$ctrl.itemData.label.ptBR.formattedText" flex layout-padding></otus-label></div></md-card-title-text></md-card-title><md-card-content layout="row" layout-align="space-between" flex><otus-question ng-if="$ctrl.isQuestion()" on-update="$ctrl.update(valueType, value)" item-data="$ctrl.itemData" layout="column" flex></otus-question><otus-misc-item ng-if="$ctrl.isItem()" item-data="$ctrl.itemData" layout="column" flex></otus-misc-item></md-card-content><otus-validation-error error="$ctrl.$error" layout="row"></otus-validation-error></md-card>',
      controller: 'otusSurveyItemCtrl as $ctrl',
      bindings: {
        itemData: '<'
      }
    }).controller('otusSurveyItemCtrl', OtusSurveyItemController);

  OtusSurveyItemController.$inject = [
    '$scope',
    '$element',
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function OtusSurveyItemController($scope, $element, CurrentItemService) {
    var self = this;

    /* Public methods */
    self.$onInit = onInit;
    self.isQuestion = isQuestion;
    self.isItem = isItem;
    self.update = update;
    self.clear = clear;
    self.pushData = pushData;
    self.destroy = destroy;
    self.updateValidation = updateValidation;

    function onInit() {
      self.filling = {};
      self.filling.questionID = self.itemData.templateID;

      $scope.$parent.$ctrl.currentItems.push(self);
      CurrentItemService.observerRegistry(self);

      self.$error = {};
      self.questionComponent = {};
      self.errorComponent = {};
    }

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

    self.$onInit = onInit;
    self.setError = setError;
    self.update = update;
    self.forceAnswer = forceAnswer;
    self.clear = clear;
    self.clearAnswer = clearAnswer;
    self.clearMetadataAnswer = clearMetadataAnswer;
    self.clearCommentAnswer = clearCommentAnswer;
    self.isAccept = isAccept;

    function onInit() {
      self.template = TagComponentBuilderService.createTagElement(self.itemData.objectType);
      self.otusSurveyItem.questionComponent = self;
      self.filling = CurrentItemService.getFilling(self.itemData.templateID) || {};
      self.answer = CurrentItemService.getFilling(self.itemData.templateID).answer || {};
      self.metadata = CurrentItemService.getFilling(self.itemData.templateID).metadata || {};
      self.comment = CurrentItemService.getFilling(self.itemData.templateID).comment || {};
      self.menuComponent = {};
      self.menuComponent.error = false;

      setError();
    }

    function update(prop, value) {
      self.onUpdate({
        valueType: prop,
        value: value
      });
    }

    function forceAnswer(value) {
      self.onUpdate({
        valueType: 'forceAnswer',
        value: value
      });
    }

    function clear(value) {
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

    function clearAnswer() {
      self.answer.clear();
    }

    function clearMetadataAnswer() {
      self.metadata.clear();
    }

    function clearCommentAnswer() {
      self.comment.clear();
    }

    function setError(error) {
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
    }

    function isAccept() {
      return self.itemData.fillingRules.options.accept === undefined ? false : true;
    }

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
      template:'<md-content layout-padding><div layout="row" style="margin-top: 15px"><md-datepicker ng-model="$ctrl.answer.date" ng-blur="$ctrl.update()" md-placeholder="Insira a data" ng-disabled="$ctrl.view"></md-datepicker></div></md-content>',
      controller: "otusCalendarQuestionCtrl as $ctrl",
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    })
    .config(function($mdDateLocaleProvider) {
      /**
       * @param date {Date}
       * @returns {string} string representation of the provided date
       */
      $mdDateLocaleProvider.formatDate = function(date) {
        return date ? moment(date).format('L') : '';
      };

      /**
       * @param dateString {string} string that can be converted to a Date
       * @returns {Date} JavaScript Date object created from the provided dateString
       */
      $mdDateLocaleProvider.parseDate = function(dateString) {
        var m = moment(dateString, 'L', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
      };

      $mdDateLocaleProvider.isDateComplete = function(dateString) {
        dateString = dateString.trim();
        // Look for two chunks of content (either numbers or text) separated by delimiters.
        var re = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
        return re.test(dateString);
      };
    })
    .controller("otusCalendarQuestionCtrl", Controller);

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService',
    'otusjs.utils.ImmutableDate',
  ];

  function Controller(CurrentItemService, ImmutableDate) {
    var self = this;

    self.view = false;

    self.$onInit = function() {
      self.answer = CurrentItemService.getFilling(self.itemData.templateID).answer.value || new ImmutableDate(null);
      self.otusQuestion.answer = self;
    };

    self.update = function() {
      self.onUpdate({
        valueType: 'answer',
        value: (self.answer.date instanceof Date) ? self.answer : null
      });
    };

    self.clear = function() {
      CurrentItemService.getFilling(self.itemData.templateID).answer.clear();
      delete self.answer;
      self.$onInit();
    };
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusCalendarQuestionView', {
      template:'<md-content layout-padding><div layout="row" style="margin-top: 15px"><md-datepicker ng-model="$ctrl.answer.date" ng-blur="$ctrl.update()" md-placeholder="Insira a data" ng-disabled="$ctrl.view"></md-datepicker></div></md-content>',
      controller: "otusCalendarQuestionViewCtrl as $ctrl",
      bindings: {
        itemData: '<'
      }
    }).controller("otusCalendarQuestionViewCtrl", Controller);

  Controller.$inject = [];

  function Controller() {
    var self = this;

    self.view = true;

    self.$onInit = function() {
      self.answer = self.itemData.data.answer.value;
    };
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusIntegerQuestion', {
      template:'<md-content layout-padding><div layout="row"><md-input-container md-no-float class="md-block" flex-gt-sm="45"><input type="number" step="1" ng-model="$ctrl.answer" ng-change="$ctrl.update()" ui-integer placeholder="Insira um valor inteiro" ng-disabled="$ctrl.view"></md-input-container><md-input-container class="md-block" flex-gt-sm="45"><otus-label item-label="$ctrl.itemData.unit"></otus-label></md-input-container></div></md-content>',
      controller: "otusIntegerQuestionCtrl as $ctrl",
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    }).controller("otusIntegerQuestionCtrl", Controller);

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function Controller(CurrentItemService) {
    var self = this;

    self.$onInit = onInit;
    self.update = update;
    self.clear = clear;

    self.view = false;

    function onInit() {
      self.answer = CurrentItemService.getFilling(self.itemData.templateID).answer.value;
      self.otusQuestion.answer = self;
    }

    function update() {
      self.onUpdate({
        valueType: 'answer',
        value: self.answer
      });
    }

    function clear() {
      CurrentItemService.getFilling(self.itemData.templateID).answer.clear();
      delete self.answer;
    }
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusIntegerQuestionView', {
      template:'<md-content layout-padding><div layout="row"><md-input-container md-no-float class="md-block" flex-gt-sm="45"><input type="number" step="1" ng-model="$ctrl.answer" ng-change="$ctrl.update()" ui-integer placeholder="Insira um valor inteiro" ng-disabled="$ctrl.view"></md-input-container><md-input-container class="md-block" flex-gt-sm="45"><otus-label item-label="$ctrl.itemData.unit"></otus-label></md-input-container></div></md-content>',
      controller: "otusIntegerQuestionViewCtrl as $ctrl",
      bindings: {
        itemData: '<'
      }
    }).controller("otusIntegerQuestionViewCtrl", Controller);

  function Controller() {
    var self = this;

    self.view = true;

    self.$onInit = function() {
      self.answer = self.itemData.data.answer.value;
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
      template:'<md-content layout-padding><div layout="row"><md-input-container md-no-float class="md-block" flex-gt-sm="45"><input type="number" step="any" ng-model="$ctrl.answer" ng-change="$ctrl.update()" ui-decimal placeholder="Insira um valor decimal" ng-disabled="$ctrl.view"></md-input-container><md-input-container class="md-block" flex-gt-sm="45"><otus-label item-label="$ctrl.itemData.unit"></otus-label></md-input-container></div></md-content>',
      controller: "otusDecimalQuestionCtrl as $ctrl",
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require : {
        otusQuestion: '^otusQuestion'
      }
    }).controller("otusDecimalQuestionCtrl", Controller);

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function Controller(CurrentItemService) {
    var self = this;

    self.view = false;

    self.$onInit = function() {
      self.answer = CurrentItemService.getFilling(self.itemData.templateID).answer.value;
      self.otusQuestion.answer = self;
    };

    self.update = function() {
      self.onUpdate({
        valueType: 'answer',
        value: self.answer
      });
    };

    self.clear = function() {
      CurrentItemService.getFilling(self.itemData.templateID).answer.clear();
      delete self.answer;
    };
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusDecimalQuestionView', {
      template:'<md-content layout-padding><div layout="row"><md-input-container md-no-float class="md-block" flex-gt-sm="45"><input type="number" step="any" ng-model="$ctrl.answer" ng-change="$ctrl.update()" ui-decimal placeholder="Insira um valor decimal" ng-disabled="$ctrl.view"></md-input-container><md-input-container class="md-block" flex-gt-sm="45"><otus-label item-label="$ctrl.itemData.unit"></otus-label></md-input-container></div></md-content>',
      controller: "otusDecimalQuestionViewCtrl as $ctrl",
      bindings: {
        itemData: '<'
      }
    }).controller("otusDecimalQuestionViewCtrl", Controller);

  Controller.$inject = [];

  function Controller() {
    var self = this;

    self.view = true;

    self.$onInit = function() {
      self.answer = self.itemData.data.answer.value;
    };

  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusSingleSelectionQuestion', {
      template:'<md-content layout-padding style="margin-left: 10px"><md-radio-group id="singleSelectionQuestionRadioGroup" ng-model="$ctrl.answer" ng-change="$ctrl.update()" layout-padding flex><md-radio-button value="{{option.value}}" ng-click="$ctrl.blurOnClick()" ng-repeat="option in $ctrl.itemData.options" layout="row" style="margin: 10px;outline: none;border: 0;" ng-disabled="$ctrl.view"><otus-label item-label="option.label.ptBR.formattedText"></otus-label></md-radio-button></md-radio-group></md-content>',
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

    self.$onInit = onInit;
    self.update = update;
    self.clear = clear;
    self.blurOnClick = blurOnClick;

    self.view = false;

    function onInit() {
      self.answer = CurrentItemService.getFilling(self.itemData.templateID).answer.value;
      self.otusQuestion.answer = self;
    }

    function update() {
      self.onUpdate({
        valueType: 'answer',
        value: self.answer
      });
    }

    function clear() {
      CurrentItemService.getFilling(self.itemData.templateID).answer.clear();
      delete self.answer;
    }

    //OPJ-21 Remove classe md-focused que é adicionada pelo componete radiogroup do angular-material para que
    //não ative os atalhos do teclado nativos do componente
    function blurOnClick() {
      $element.find('#singleSelectionQuestionRadioGroup').removeClass('md-focused');
    }
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusSingleSelectionQuestionView', {
      template:'<md-content layout-padding style="margin-left: 10px"><md-radio-group id="singleSelectionQuestionRadioGroup" ng-model="$ctrl.answer" ng-change="$ctrl.update()" layout-padding flex><md-radio-button value="{{option.value}}" ng-click="$ctrl.blurOnClick()" ng-repeat="option in $ctrl.itemData.options" layout="row" style="margin: 10px;outline: none;border: 0;" ng-disabled="$ctrl.view"><otus-label item-label="option.label.ptBR.formattedText"></otus-label></md-radio-button></md-radio-group></md-content>',
      controller: "otusSingleSelectionQuestionViewCtrl as $ctrl",
      bindings: {
        itemData: '<'
      }
    }).controller("otusSingleSelectionQuestionViewCtrl", Controller);

   function Controller() {
    var self = this;

     self.view = true;

    self.$onInit = function() {
      self.answer = self.itemData.data.answer.value;
    };

  }
}());

(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusCheckboxQuestion', {
      template:'<md-content layout-padding style="margin-top: 12px"><md-content ng-repeat="option in $ctrl.itemData.options track by $index" flex><md-checkbox ng-model="$ctrl.answerArray[$index].state" ng-change="$ctrl.update($index)" layout="row" style="margin: 7px" ng-disabled="$ctrl.view"><otus-label item-label="option.label.ptBR.formattedText"></otus-label></md-checkbox></md-content></md-content>',
      controller: 'otusjs.player.component.CheckboxQuestionController as $ctrl',
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    })
    .controller('otusjs.player.component.CheckboxQuestionController', Controller);


  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService'
  ];


  function Controller(CurrentItemService) {
    var self = this;

    self.view = false;

    self.$onInit = function () {
      self.answerArray = CurrentItemService.getFilling(self.itemData.templateID).answer.value;
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
      CurrentItemService.getFilling(self.itemData.templateID).answer.clear();
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
    .component('otusCheckboxQuestionView', {
      template:'<md-content layout-padding style="margin-top: 12px"><md-content ng-repeat="option in $ctrl.itemData.options track by $index" flex><md-checkbox ng-model="$ctrl.answerArray[$index].state" ng-change="$ctrl.update($index)" layout="row" style="margin: 7px" ng-disabled="$ctrl.view"><otus-label item-label="option.label.ptBR.formattedText"></otus-label></md-checkbox></md-content></md-content>',
      controller: "otusCheckboxQuestionViewCtrl as $ctrl",
      bindings: {
        itemData: '<'
      }
    }).controller("otusCheckboxQuestionViewCtrl", Controller);

  function Controller() {
    var self = this;

    self.view = true;

    self.$onInit = function () {
      self.answerArray = self.itemData.data.answer.value;
    };
  }
}());

(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusTextQuestion', {
      template:'<md-content id="text-question" layout-padding><div layout="row"><md-input-container md-no-float class="md-block" flex><textarea id="textQuestion" ng-class="{lowercase: $ctrl.hasLowerCase, uppercase: $ctrl.hasUpperCase}" ng-model="$ctrl.answer" ng-disabled="$ctrl.view" ng-change="$ctrl.update()" placeholder="Digite o texto aqui"></textarea></md-input-container></div></md-content>',
      controller: "otusTextQuestionCtrl as $ctrl",
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    }).controller("otusTextQuestionCtrl", Controller);

  Controller.$inject = [
    '$element',
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function Controller($element, CurrentItemService) {
    var self = this;

    self.$onInit = onInit;
    self.update = update;
    self.clear = clear;

    self.view = false;

    function onInit() {
      self.answer = CurrentItemService.getFilling(self.itemData.templateID).answer.value;
      self.hasAlphanumeric = CurrentItemService.getFillingRules(self.itemData.templateID).alphanumeric;
      self.hasSpecials = CurrentItemService.getFillingRules(self.itemData.templateID).specials;
      self.hasUpperCase = CurrentItemService.getFillingRules(self.itemData.templateID).upperCase;
      self.hasLowerCase = CurrentItemService.getFillingRules(self.itemData.templateID).lowerCase;
      self.otusQuestion.answer = self;
    }

    function update() {
      _runValidationSteps();

      self.onUpdate({
        valueType: 'answer',
        value: self.answer
      });
    }

    function clear() {
      CurrentItemService.getFilling(self.itemData.templateID).answer.clear();
      delete self.answer;
    }

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

(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusTextQuestionView', {
      template:'<md-content id="text-question" layout-padding><div layout="row"><md-input-container md-no-float class="md-block" flex><textarea id="textQuestion" ng-class="{lowercase: $ctrl.hasLowerCase, uppercase: $ctrl.hasUpperCase}" ng-model="$ctrl.answer" ng-disabled="$ctrl.view" ng-change="$ctrl.update()" placeholder="Digite o texto aqui"></textarea></md-input-container></div></md-content>',
      controller: "otusTextQuestionViewCtrl as $ctrl",
      bindings: {
        itemData: '<'
      }
    }).controller("otusTextQuestionViewCtrl", Controller);

  Controller.$inject = [];

  function Controller() {
    var self = this;

    self.view = true;

    self.$onInit = function () {
      self.answer = self.itemData.data.answer.value;
    };

  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusEmailQuestion', {
      template:'<md-content layout-padding><div layout="row"><md-input-container md-no-float class="md-block" flex-gt-sm="45"><md-icon class="material-icons">email</md-icon><input name="email" type="email" ng-model="$ctrl.answer" ng-change="$ctrl.update()" placeholder="email@email.com" aria-label="{{$ctrl.ariaLabel()}}" ng-disabled="$ctrl.view"></md-input-container></div></md-content>',
      controller: "otusEmailQuestionCtrl as $ctrl",
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require : {
        otusQuestion: '^otusQuestion'
      }
    }).controller("otusEmailQuestionCtrl", Controller);

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function Controller(CurrentItemService) {
    var self = this;

    self.view = false;

    self.$onInit = function() {
      self.answer = CurrentItemService.getFilling(self.itemData.templateID).answer.value;
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
      CurrentItemService.getFilling(self.itemData.templateID).answer.clear();
      delete self.answer;
    };
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusEmailQuestionView', {
      template:'<md-content layout-padding><div layout="row"><md-input-container md-no-float class="md-block" flex-gt-sm="45"><md-icon class="material-icons">email</md-icon><input name="email" type="email" ng-model="$ctrl.answer" ng-change="$ctrl.update()" placeholder="email@email.com" aria-label="{{$ctrl.ariaLabel()}}" ng-disabled="$ctrl.view"></md-input-container></div></md-content>',
      controller: "otusEmailQuestionViewCtrl as $ctrl",
      bindings: {
        itemData: '<'
      }
    }).controller("otusEmailQuestionViewCtrl", Controller);

  Controller.$inject = [];

  function Controller() {
    var self = this;

    self.view = true;

    self.$onInit = function() {
      self.answer = self.itemData.data.answer.value;
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
      template:'<md-content layout-padding><div layout="row"><md-button ng-click="$ctrl.currentTime()" class="md-fab md-raised md-mini" aria-label="Hora Atual" ng-disabled="$ctrl.itemData.options.data.disabledButton.value || $ctrl.view"><md-icon>access_time</md-icon><md-tooltip md-direction="down">Hora Atual</md-tooltip></md-button><md-input-container class="md-block" flex-gt-sm="45"><input id="inputtime" type="time" ng-model="$ctrl.answer.date" ng-blur="$ctrl.update($event)" ng-disabled="$ctrl.view" aria-label="Tempo"></md-input-container></div></md-content>',
      controller: "otusTimeQuestionCtrl as $ctrl",
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    }).controller("otusTimeQuestionCtrl", Controller);

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService',
    'otusjs.utils.ImmutableDate',
    '$element'
  ];

  function Controller(CurrentItemService, ImmutableDate, $element) {
    var self = this;

    self.$onInit = onInit;
    self.update = update;
    self.clear = clear;
    self.currentTime = currentTime;

    self.view = false;

    function onInit() {
      self.answer = CurrentItemService.getFilling(self.itemData.templateID).answer.value || new ImmutableDate(null);
      self.otusQuestion.answer = self;
    }

    function update(e) {
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
    }

    function clear() {
      CurrentItemService.getFilling(self.itemData.templateID).answer.clear();
      delete self.answer;
    }

    function currentTime(e) {
      var imuDate = new ImmutableDate()

      imuDate.setSeconds(0);
      imuDate.setMilliseconds(0);

      self.answer = imuDate;

      $element.find('#inputtime').blur();
    }
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusTimeQuestionView', {
      template:'<md-content layout-padding><div layout="row"><md-button ng-click="$ctrl.currentTime()" class="md-fab md-raised md-mini" aria-label="Hora Atual" ng-disabled="$ctrl.itemData.options.data.disabledButton.value || $ctrl.view"><md-icon>access_time</md-icon><md-tooltip md-direction="down">Hora Atual</md-tooltip></md-button><md-input-container class="md-block" flex-gt-sm="45"><input id="inputtime" type="time" ng-model="$ctrl.answer.date" ng-blur="$ctrl.update($event)" ng-disabled="$ctrl.view" aria-label="Tempo"></md-input-container></div></md-content>',
      controller: "otusTimeQuestionViewCtrl as $ctrl",
      bindings: {
        itemData: '<'
      }
    }).controller("otusTimeQuestionViewCtrl", Controller);

  Controller.$inject = [];

  function Controller() {
    var self = this;

    self.view = true;

    self.$onInit = function() {
      self.answer = self.itemData.data.answer.value;
    };

  }

}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusPhoneQuestion', {
      template:'<md-content layout-padding><div><md-input-container md-no-float class="md-block" flex-gt-sm="45"><md-icon class="material-icons">phone</md-icon><input type="text" ng-model="$ctrl.answer" ng-change="$ctrl.update()" placeholder="(XX) XXXXX-XXXX" ui-br-phone-number ng-disabled="$ctrl.view"></md-input-container></div></md-content>',
      controller: "otusPhoneQuestionCtrl as $ctrl",
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require : {
        otusQuestion: '^otusQuestion'
      }
    }).controller("otusPhoneQuestionCtrl", Controller);

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function Controller(CurrentItemService) {
    var self = this;

    self.$onInit = onInit;
    self.update = update;
    self.clear = clear;

    self.view = false;

    function onInit() {
      self.answer = CurrentItemService.getFilling(self.itemData.templateID).answer.value;
      self.otusQuestion.answer = self;
    }

    function update() {
      self.onUpdate({
        valueType: 'answer',
        value: self.answer
      });
    }

    function clear() {
      CurrentItemService.getFilling(self.itemData.templateID).answer.clear();
      delete self.answer;
    }
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusPhoneQuestionView', {
      template:'<md-content layout-padding><div><md-input-container md-no-float class="md-block" flex-gt-sm="45"><md-icon class="material-icons">phone</md-icon><input type="text" ng-model="$ctrl.answer" ng-change="$ctrl.update()" placeholder="(XX) XXXXX-XXXX" ui-br-phone-number ng-disabled="$ctrl.view"></md-input-container></div></md-content>',
      controller: "otusPhoneQuestionViewCtrl as $ctrl",
      bindings: {
        itemData: '<'
      }
    }).controller("otusPhoneQuestionViewCtrl", Controller);

  Controller.$inject = [];

  function Controller() {
    var self = this;

    self.view = true;

    self.$onInit = function() {
      self.answer = self.itemData.data.answer.value;
    };

  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusFileUploadQuestion', {
      template:'<md-content layout-padding><div layout="row"><md-button class="md-primary md-raised" upload-tool="$ctrl.uploadConfig" ng-disabled="$ctrl.view"><md-icon md-font-set="material-icons">attach_file</md-icon>Adicionar Arquivos</md-button><md-button class="md-primary md-raised" ng-show="$ctrl.pendingList.length != 0" ng-click="$ctrl.uploadMultiple()" ng-disabled="$ctrl.pendingCounter > 0"><md-icon md-font-set="material-icons">attach_file</md-icon>Enviar Todos</md-button></div><div md-whiteframe="3" layout="column" md-padding><md-list layout="column" class="md-dense" flex><md-subheader class="md-no-sticky">Arquivos a Enviar</md-subheader><md-list-item ng-hide="$ctrl.pendingList.length != 0"><p>Nenhum arquivo selecionado</p><md-divider></md-divider></md-list-item><md-content ng-show="$ctrl.pendingList.length != 0" style="max-height: 300px;"><md-list-item ng-repeat="file in $ctrl.pendingList track by $index"><span class="md-subhead md-truncate">{{ file.name }}</span><div class="uploading-panel" ng-if="file.status == \'uploading\'"><md-progress-circular class="md-secondary" md-mode="indeterminate" md-diameter="20px" ng-if="file.status == \'uploading\'"></md-progress-circular></div><div class="action-panel" flex="20" ng-if="!$ctrl.view"><md-button class="md-icon-button md-secondary" aria-label="Enviar Arquivo" ng-click="$ctrl.uploadFile($index)" ng-hide="file.status == \'uploading\'" ng-disabled="$ctrl.pendingCounter >= 5"><md-icon md-font-set="material-icons">file_upload</md-icon><md-tooltip md-direction="bottom">Enviar Arquivo</md-tooltip></md-button><md-button class="md-icon-button md-secondary" aria-label="Excluir" ng-click="$ctrl.popFromPending($index)" ng-hide="file.status == \'uploading\'"><md-icon md-font-set="material-icons">delete</md-icon><md-tooltip md-direction="bottom">Excluir</md-tooltip></md-button></div></md-list-item></md-content><md-divider></md-divider><md-divider></md-divider><md-content ng-show="$ctrl.sentFiles.length != 0" style="background-color:#ebebeb; margin-top: 25px;"><md-subheader class="md-no-sticky">Arquivos Enviados</md-subheader><md-list-item class="md-2-line" ng-repeat="file in $ctrl.sentFiles track by $index"><div class="md-list-item-text" layout="column"><span class="md-subhead md-truncate">{{ file.name }}</span><p>Tamanho: {{ file.printableSize }}</p></div><div class="action-panel" flex="20"><md-button class="md-icon-button md-secondary" aria-label="Download" ng-click="$ctrl.downloadFile($index)"><md-icon md-font-set="material-icons">file_download</md-icon><md-tooltip md-direction="bottom">Download</md-tooltip></md-button><md-button class="md-icon-button md-secondary" aria-label="Delete" ng-if="!$ctrl.view" ng-click="$ctrl.deleteFile($index, $event)"><md-icon md-font-set="material-icons">delete_forever</md-icon><md-tooltip md-direction="bottom">Apagar Arquivo</md-tooltip></md-button></div></md-list-item><md-divider></md-divider></md-content></md-list></div></md-content>',
      controller: "otusFileUploadQuestionCtrl as $ctrl",
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    }).controller("otusFileUploadQuestionCtrl", Controller);

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
    self.view = false;

    function onInit() {
      var answerFiles = CurrentItemService.getFilling(self.itemData.templateID).answer.value || [];
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
      _questionID = CurrentItemService.getItemsByTemplateID(self.itemData.templateID);
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
    .component('otusFileUploadQuestionView', {
      template:'<md-content layout-padding><div layout="row"><md-button class="md-primary md-raised" upload-tool="$ctrl.uploadConfig" ng-disabled="$ctrl.view"><md-icon md-font-set="material-icons">attach_file</md-icon>Adicionar Arquivos</md-button><md-button class="md-primary md-raised" ng-show="$ctrl.pendingList.length != 0" ng-click="$ctrl.uploadMultiple()" ng-disabled="$ctrl.pendingCounter > 0"><md-icon md-font-set="material-icons">attach_file</md-icon>Enviar Todos</md-button></div><div md-whiteframe="3" layout="column" md-padding><md-list layout="column" class="md-dense" flex><md-subheader class="md-no-sticky">Arquivos a Enviar</md-subheader><md-list-item ng-hide="$ctrl.pendingList.length != 0"><p>Nenhum arquivo selecionado</p><md-divider></md-divider></md-list-item><md-content ng-show="$ctrl.pendingList.length != 0" style="max-height: 300px;"><md-list-item ng-repeat="file in $ctrl.pendingList track by $index"><span class="md-subhead md-truncate">{{ file.name }}</span><div class="uploading-panel" ng-if="file.status == \'uploading\'"><md-progress-circular class="md-secondary" md-mode="indeterminate" md-diameter="20px" ng-if="file.status == \'uploading\'"></md-progress-circular></div><div class="action-panel" flex="20" ng-if="!$ctrl.view"><md-button class="md-icon-button md-secondary" aria-label="Enviar Arquivo" ng-click="$ctrl.uploadFile($index)" ng-hide="file.status == \'uploading\'" ng-disabled="$ctrl.pendingCounter >= 5"><md-icon md-font-set="material-icons">file_upload</md-icon><md-tooltip md-direction="bottom">Enviar Arquivo</md-tooltip></md-button><md-button class="md-icon-button md-secondary" aria-label="Excluir" ng-click="$ctrl.popFromPending($index)" ng-hide="file.status == \'uploading\'"><md-icon md-font-set="material-icons">delete</md-icon><md-tooltip md-direction="bottom">Excluir</md-tooltip></md-button></div></md-list-item></md-content><md-divider></md-divider><md-divider></md-divider><md-content ng-show="$ctrl.sentFiles.length != 0" style="background-color:#ebebeb; margin-top: 25px;"><md-subheader class="md-no-sticky">Arquivos Enviados</md-subheader><md-list-item class="md-2-line" ng-repeat="file in $ctrl.sentFiles track by $index"><div class="md-list-item-text" layout="column"><span class="md-subhead md-truncate">{{ file.name }}</span><p>Tamanho: {{ file.printableSize }}</p></div><div class="action-panel" flex="20"><md-button class="md-icon-button md-secondary" aria-label="Download" ng-click="$ctrl.downloadFile($index)"><md-icon md-font-set="material-icons">file_download</md-icon><md-tooltip md-direction="bottom">Download</md-tooltip></md-button><md-button class="md-icon-button md-secondary" aria-label="Delete" ng-if="!$ctrl.view" ng-click="$ctrl.deleteFile($index, $event)"><md-icon md-font-set="material-icons">delete_forever</md-icon><md-tooltip md-direction="bottom">Apagar Arquivo</md-tooltip></md-button></div></md-list-item><md-divider></md-divider></md-content></md-list></div></md-content>',
      controller: "otusFileUploadQuestionViewCtrl as $ctrl",
      bindings: {
        itemData: '<'
      }
    }).controller("otusFileUploadQuestionViewCtrl", Controller);

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService',
    'otusjs.utils.FileUploadFactory',
    '$scope',
    'otusjs.surveyItem.customAnswer.FileUploadAnswerFactory',
  ];

  function Controller(CurrentItemService, FileUploadService, $scope, FileUploadAnswerFactory) {
    var self = this;

    var _uploadInterface;
    var _pendingArrayControl;


    /* Public Interface */
    self.$onInit = onInit;
    self.downloadFile = downloadFile;
    self.view = true;

    function onInit() {

      var answerFiles = self.itemData.data.answer.value || [];
      self.sentFiles = FileUploadAnswerFactory.buildFromJson(answerFiles);
      self.pendingList = [];
      self.promise = 0;

      self.uploadConfig = {
        callback: _populatePendingList,
        type: 'any',
        multiple: true
      };
      _uploadInterface = FileUploadService.getUploadInterface();
      _pendingArrayControl = 0;
      self.pendingCounter = 0;
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
        });
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

  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusAutocompleteQuestion', {
      template:'<md-content layout-padding><div layout="row" style="margin-top: 15px" layout-fill><div layout="column" flex><p layout="row" ng-hide="$ctrl.dataReady || $ctrl.dataError">Aguarde. Preparando lista de opções.</p><p layout="row" md-warn ng-show="$ctrl.dataError">Erro ao carregar opções.</p><md-autocomplete flex ng-disabled="!$ctrl.dataReady || $ctrl.answer" md-search-text="$ctrl.autoCompleteSettings.searchText" md-selected-item="$ctrl.answer" md-selected-item-change="$ctrl.update()" md-items="meds in $ctrl.searchQuery($ctrl.autoCompleteSettings.searchText)" md-item-text="meds.value" md-min-length="3" placeholder="Inicie a digitação"><md-item-template layout-fill flex><span md-highlight-text="$ctrl.autoCompleteSettings.searchText" md-highlight-flags="gi">{{meds.value}}</span></md-item-template><md-not-found><span ng-click="$ctrl.setOther()">"{{$ctrl.autoCompleteSettings.searchText}}" não encontrado. Clique para responder com "Outro"</span></md-not-found></md-autocomplete></div></div></md-content>',
      controller: "otusAutocompleteQuestionCtrl as $ctrl",
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    })
    .controller("otusAutocompleteQuestionCtrl", Controller);

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService',
    'otusjs.utils.DatasourceService',
    'otusjs.utils.SearchQueryFactory'
  ];

  function Controller(CurrentItemService, DatasourceService, SearchQueryFactory) {
    var self = this;
    var _datasource = [];

    self.view = false;

    /* Question Methods */
    self.$onInit = function() {
      self.dataReady = false;
      self.answer = CurrentItemService.getFilling(self.itemData.templateID).answer.value;
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
      CurrentItemService.getFilling(self.itemData.templateID).answer.clear();
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

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusAutocompleteQuestionView', {
      template:'<md-content layout-padding><div layout="row" style="margin-top: 15px" layout-fill><div layout="column" flex><p layout="row" ng-hide="$ctrl.dataReady || $ctrl.dataError">Aguarde. Preparando lista de opções.</p><p layout="row" md-warn ng-show="$ctrl.dataError">Erro ao carregar opções.</p><md-autocomplete flex ng-disabled="!$ctrl.dataReady || $ctrl.answer" md-search-text="$ctrl.autoCompleteSettings.searchText" md-selected-item="$ctrl.answer" md-selected-item-change="$ctrl.update()" md-items="meds in $ctrl.searchQuery($ctrl.autoCompleteSettings.searchText)" md-item-text="meds.value" md-min-length="3" placeholder="Inicie a digitação"><md-item-template layout-fill flex><span md-highlight-text="$ctrl.autoCompleteSettings.searchText" md-highlight-flags="gi">{{meds.value}}</span></md-item-template><md-not-found><span ng-click="$ctrl.setOther()">"{{$ctrl.autoCompleteSettings.searchText}}" não encontrado. Clique para responder com "Outro"</span></md-not-found></md-autocomplete></div></div></md-content>',
      controller: "otusAutocompleteViewCtrl as $ctrl",
      bindings: {
        itemData: '<'
      }
    })
    .controller("otusAutocompleteViewCtrl", Controller);

  Controller.$inject = [];

  function Controller() {
    var self = this;

    self.view = true;

    /* Question Methods */
    self.$onInit = function() {
      self.answer = self.itemData.data.answer.value;
    };

  }
}());

(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusGridTextQuestion', {
      template:'<div ng-repeat="line in ::$ctrl.itemData.getLinesList()" ng-init="outerIndex=$index" layout="row" flex><div ng-repeat="gridText in ::line.getGridTextList()" ng-init="innerIndex=$index" layout-padding layout="row" flex><md-input-container flex><label ng-bind-html="::gridText.label.ptBR.formattedText"></label><div><textarea ng-model="$ctrl.answerArray[outerIndex][innerIndex].value" ng-blur="$ctrl.update(outerIndex, innerIndex)" ng-disabled="$ctrl.view"></textarea></div><div style="color: gray;" ng-bind-html="::gridText.unit.ptBR.plainText"></div></md-input-container></div></div>',
      controller: "otusGridTextQuestionCtrl as $ctrl",
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    }).controller("otusGridTextQuestionCtrl", Controller);

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function Controller(CurrentItemService) {
    var self = this;

    /* Public Interface */
    self.$onInit = onInit;
    self.update = update;
    self.clear = clear;

    self.view = false;

    function onInit() {
      self.answerArray = CurrentItemService.getFilling(self.itemData.templateID).answer.value;
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
      CurrentItemService.getFilling(self.itemData.templateID).answer.clear();
      delete self.answerArray;
      _fixArray();
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusGridTextQuestionView', {
      template:'<div ng-repeat="line in ::$ctrl.itemData.getLinesList()" ng-init="outerIndex=$index" layout="row" flex><div ng-repeat="gridText in ::line.getGridTextList()" ng-init="innerIndex=$index" layout-padding layout="row" flex><md-input-container flex><label ng-bind-html="::gridText.label.ptBR.formattedText"></label><div><textarea ng-model="$ctrl.answerArray[outerIndex][innerIndex].value" ng-blur="$ctrl.update(outerIndex, innerIndex)" ng-disabled="$ctrl.view"></textarea></div><div style="color: gray;" ng-bind-html="::gridText.unit.ptBR.plainText"></div></md-input-container></div></div>',
      controller: "otusGridTextQuestionViewCtrl as $ctrl",
      bindings: {
        itemData: '<'
      }
    }).controller("otusGridTextQuestionViewCtrl", Controller);

  Controller.$inject = [];

  function Controller() {
    var self = this;

    /* Public Interface */
    self.$onInit = onInit;

    function onInit() {
      self.answerArray = self.itemData.data.answer.value;
      self.view = true;
    }
   }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusGridIntegerQuestion', {
      template:'<div ng-repeat="line in ::$ctrl.itemData.getLinesList()" ng-init="outerIndex=$index" layout="row" flex><div ng-repeat="gridNumber in ::line.getGridIntegerList()" ng-init="innerIndex=$index" layout-padding layout="row" flex><md-input-container flex><label ng-bind-html="::gridNumber.label.ptBR.formattedText"></label><div><input type="text" numbers-only ng-model="$ctrl.answerArray[outerIndex][innerIndex].value" ng-blur="$ctrl.update(outerIndex, innerIndex)" ng-disabled="$ctrl.view"></div><div style="color: gray;" ng-bind-html="::gridNumber.unit.ptBR.plainText"></div></md-input-container></div></div>',
      controller: "otusGridIntegerQuestionCtrl as $ctrl",
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    }).controller("otusGridIntegerQuestionCtrl", Controller);

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function Controller(CurrentItemService) {
    var self = this;

    /* Public Interface */
    self.$onInit = onInit;
    self.update = update;
    self.clear = clear;
    self.view = false;

    function onInit() {
      self.answerArray = CurrentItemService.getFilling(self.itemData.templateID).answer.value;
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
      CurrentItemService.getFilling(self.itemData.templateID).answer.clear();
      delete self.answerArray;
      _fixArray();
    }
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusGridIntegerQuestionView', {
      template:'<div ng-repeat="line in ::$ctrl.itemData.getLinesList()" ng-init="outerIndex=$index" layout="row" flex><div ng-repeat="gridNumber in ::line.getGridIntegerList()" ng-init="innerIndex=$index" layout-padding layout="row" flex><md-input-container flex><label ng-bind-html="::gridNumber.label.ptBR.formattedText"></label><div><input type="text" numbers-only ng-model="$ctrl.answerArray[outerIndex][innerIndex].value" ng-blur="$ctrl.update(outerIndex, innerIndex)" ng-disabled="$ctrl.view"></div><div style="color: gray;" ng-bind-html="::gridNumber.unit.ptBR.plainText"></div></md-input-container></div></div>',
      controller: "otusGridIntegerQuestionViewCtrl as $ctrl",
      bindings: {
        itemData: '<'
      }
    }).controller("otusGridIntegerQuestionViewCtrl", Controller);

  Controller.$inject = [];

  function Controller() {
    var self = this;

    /* Public Interface */
    self.$onInit = onInit;

    function onInit() {
      self.answerArray = self.itemData.data.answer.value;
      self.view = true;
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
    var templateID = null;

    self.$onInit = onInit;
    self.referenceAsDate = referenceAsDate;
    self.referenceAsTime = referenceAsTime;
    self.reference = reference;
    self.focus = focus;

    function onInit() {
      self.otusSurveyItem.errorComponent = self;
      templateID = self.otusSurveyItem.errorComponent.otusSurveyItem.itemData.templateID;
    }

    function referenceAsDate(type) {
      var reference = CurrentItemService.getFillingRules(templateID)[type].data.reference;
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
    }

    function referenceAsTime(type) {
      var reference = CurrentItemService.getFillingRules(templateID)[type].data.reference.value;
      return $filter('date')(new Date(reference), 'hh:mm a');
    }

    function reference (type) {
      var reference = CurrentItemService.getFillingRules(templateID)[type].data.reference;
      return reference;
    }

    function focus() {
      $element.focus();
    }
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
    '$mdDialog'
  ];

  function OtusSurveyMenuController($mdDialog) {
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
            _enableForwardSuccessfulExecution
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
    .component('answerView', {
      template:'<md-card flex layout="column"><md-toolbar layout="row" layout-align="start center" ng-class="$ctrl.hueClass"><md-button class="md-icon-button md-whiteframe-3dp" ng-click="$ctrl.goingBack()" ng-if="!$ctrl.isItem() && $ctrl.view"><md-icon md-font-set="material-icons" class="material-icons ng-binding md-layoutTheme-theme">edit</md-icon><md-tooltip md-direction="down">Editar questão</md-tooltip></md-button><md-button class="md-icon-button md-whiteframe-3dp" ng-if="!$ctrl.isItem() && !$ctrl.view"><md-icon md-font-set="material-icons" class="material-icons ng-binding md-layoutTheme-theme">question_answer</md-icon><md-tooltip md-direction="down">Questão respondida</md-tooltip></md-button><md-card-header-text ng-if="!$ctrl.view" layout-align="start center" layout="column" style="display: flex" layout-fill class="truncate" flex="50"><otus-label class="md-title truncate" item-label="$ctrl.label" style="width: 95%"></otus-label><span class="md-caption truncate" ng-if="$ctrl.answer" style="margin-top:-5px; width: 95%">{{$ctrl.answer}}</span> <span class="md-caption truncate" ng-if="$ctrl.comment" style="margin-top:-5px; width: 95%">{{$ctrl.comment}}</span></md-card-header-text><div class="md-toolbar-tools" layout="row" flex layout-align="center center"><h4 flex ng-if="$ctrl.view" style="margin: 0 !important;text-align: center">Modo de visualização</h4><span flex ng-if="!$ctrl.view"></span><md-button class="md-icon-button" ng-click="$ctrl.viewQuestion()"><md-icon md-font-set="material-icons" class="material-icons ng-binding md-layoutTheme-theme">{{$ctrl.iconEye}}</md-icon><md-tooltip md-direction="down">{{$ctrl.iconTooltip}}</md-tooltip></md-button></div></md-toolbar><div ng-if="$ctrl.view"><md-card-header layout="row" flex><md-card-header-text layout-align="center start" ng-if="$ctrl.view" layout-padding layout-margin><otus-label class="md-title md-headline" layout-padding item-label="$ctrl.labelFormatted"></otus-label></md-card-header-text></md-card-header><md-card-content layout="row" layout-align="space-between" flex><otus-misc-item ng-if="$ctrl.isItem() && ($ctrl.itemData.objectType === \'ImageItem\')" item-data="$ctrl.itemData" layout="column" flex></otus-misc-item><md-content ng-if="!$ctrl.isItem()" layout="column" layout-fill flex><div layout="row" flex><md-tabs md-dynamic-height layout="column" flex="95"><md-tab label="Resposta"><md-content class="md-padding" bind-html-compile="$ctrl.template"></md-content></md-tab><md-tab label="Metadado"><md-content class="md-padding"><md-content layout-padding style="margin-left: 10px"><md-radio-group id="metadataGroupRadioGroup" ng-model="$ctrl.itemData.data.metadata.value" layout-padding flex><md-content value="{{option.value}}" ng-repeat="option in $ctrl.itemData.metadata.options" layout="row" style="margin: 10px"><md-radio-button aria-label="{{option.label}}" value="{{option.value}}" style="outline: none;border: 0;" flex ng-disabled="true"><otus-label item-label="option.label.ptBR.formattedText"></otus-label></md-radio-button></md-content></md-radio-group></md-content></md-content></md-tab><md-tab label="Comentário"><md-content class="md-padding"><md-content layout-padding><div layout="row"><md-input-container md-no-float class="md-block" flex><textarea ng-model="$ctrl.itemData.data.comment" ng-disabled="true" aria-label="Comentário"></textarea></md-input-container></div></md-content></md-content></md-tab></md-tabs></div></md-content></md-card-content></div></md-card>',
      controller: "answerViewCtrl as $ctrl",
      bindings: {
        icon: '<',
        question: '@',
        itemData: '<',
        goBack: "&"
      }
    }).controller("answerViewCtrl", Controller);

  Controller.$inject = [
    'ICON',
    '$filter',
    'otusjs.player.core.player.PlayerService',
    'otusjs.player.core.renderer.TagComponentBuilderService'
  ];

  function Controller(ICON, $filter, PlayerService, TagComponentBuilderService) {
    var self = this;

    self.$onInit = onInit;
    self.goingBack = goingBack;
    self.viewQuestion = viewQuestion;
    self.isQuestion = isQuestion;
    self.isItem = isItem;


    function onInit() {
      self.hueClass='md-primary';
      self.iconEye = 'remove_red_eye';
      self.iconTooltip = 'Visualizar questão';
      self.view = false;
      self.itemData = angular.copy(self.itemData);
      _constructor();
    }

    function _constructor() {
      self.template = TagComponentBuilderService.createTagElement(self.itemData.objectType, true);
      self.itemData = angular.copy(self.itemData);
      self.icon = ICON[self.icon];
      if(self.itemData.isQuestion()){
        _metadadaBuilder();

          self.answer = _containMetadada() ? 'Metadado: '+  self.METADADA[self.itemData.data.metadata.value - 1] : 'Resposta: '+_formatAnswer();
          self.comment = self.itemData.data.comment ? 'Contém comentário(s)': '';

        self.label = self.itemData.label.ptBR.plainText;
        self.labelFormatted = self.itemData.label.ptBR.formattedText;
      } else if(self.itemData.objectType === "TextItem"){
        self.txtqst = "txtqst"
        self.label = self.itemData.value.ptBR.plainText;
        self.labelFormatted = self.itemData.value.ptBR.formattedText;
      } else if(self.itemData.objectType === "ImageItem"){
        self.label = "[IMAGEM]";
      }

    }



    function _containMetadada() {
      return self.itemData.data.metadata.value !== null ? true : false;
    }

    function _metadadaBuilder() {
      self.METADADA = [];
      self.itemData.metadata.options.forEach(function(option) {
        self.METADADA.push(option.label.ptBR.plainText);
      })
    }

    function goingBack() {
      PlayerService.setGoBackTo(self.itemData.templateID);
      self.goBack();
    }

    function viewQuestion() {
      self.view = !self.view;
      if(self.view){
        self.iconTooltip = 'Ocultar questão';
        self.hueClass = 'md-accent';
        self.iconEye = 'visibility_off';
      } else {
        self.iconTooltip = 'Visualizar questão';
        self.hueClass = 'md-primary'
        self.iconEye = 'remove_red_eye';
      }
    }

    function formatDate(value) {
      var format = 'dd/MM/yyyy'
      return value ? $filter('date')(new Date(value), format): "";
    }

    function formatTime(value) {
      var format = 'HH:mm';
      return value ? $filter('date')(new Date(value), format) : "";
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
      if(self.itemData.data.answer.value){
        self.itemData.data.answer.value.forEach(function(value){
          _answer = _answer + angular.copy(value.name) + "; ";
        });
      }
      return  _answer;
    }

    function isQuestion() {
      return (self.itemData.objectType === 'ImageItem') || (self.itemData.objectType === 'TextItem') ? false : true;
    }

    function isItem() {
      return (self.itemData.objectType === 'ImageItem') || (self.itemData.objectType === 'TextItem') ? true : false;
    }

    function _formatAnswer() {
      var answer = "";
        switch (self.icon){
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
            answer = self.itemData.data.answer.value !== null ? self.itemData.data.answer.value : '';
        }

      return answer;

    }
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
    var _hardBlocker = null;
    var _softBlocker = null;

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
    self.registerHardBlocker = registerHardBlocker;
    self.registerSoftBlocker = registerSoftBlocker;
    self.getHardBlocker = getHardBlocker;
    self.getSoftBlocker = getSoftBlocker;
    self.clearHardBlocker = clearHardBlocker;

    function registerHardBlocker(blocker) {
      _hardBlocker = blocker;
    }

    function registerSoftBlocker(blocker) {
      _softBlocker = blocker;
    }

    function getHardBlocker(){
      return _hardBlocker;
    }

    function getSoftBlocker(){
      return _softBlocker;
    }

    function clearHardBlocker(){
      _hardBlocker = null;
   }

    /**/

    function bindComponent(component) {
      _component = component;
    }

    function getItemData() {
      return ActivityFacadeService.getCurrentItem().getItems();
    }

    function goAhead() {
      AheadActionService.execute();
    }

    function goBack() {
      BackActionService.execute();
    }

    function setGoBackTo(templateID) {
      _goingBack = templateID !== null;
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

    function createTagElement(elementType, onlyView) {
      return _replace(HtmlBuilderService.generateTagName(elementType), onlyView);
    }

    function _replace(tagName, onlyView) {
      if(onlyView){

        return '<otus-' + tagName + '-view item-data="$ctrl.itemData" />';
      }else {

        return '<otus-' + tagName + ' item-data="$ctrl.itemData" on-update="$ctrl.update(valueType, value)" />';
      }
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
        flowData.metadataToEvaluate = {};

        CurrentItemService.getItems().forEach(item => {
          if(item.isQuestion()){
            let templateID = item.templateID;
            flowData.answerToEvaluate[templateID] = {};
            flowData.answerToEvaluate[templateID].data = {};

            flowData.metadataToEvaluate[templateID] = {};
            flowData.metadataToEvaluate[templateID].data = {};
          }
        });
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
        flowData.metadataToEvaluate = {};

        CurrentItemService.getItems().forEach(item => {
          if(item.isQuestion()) {
            let templateID = item.templateID;
            flowData.answerToEvaluate[templateID] = {};
            flowData.answerToEvaluate[templateID].data = {};

            flowData.metadataToEvaluate[templateID] = {};
            flowData.metadataToEvaluate[templateID].data = {};
          }
        });
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

  function Service(NavigationService) {
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

(function () {
  'use strict';

  angular
    .module('otusjs.player.core.step')
    .service('otusjs.player.core.step.ApplyAnswerStepService', Service);

  Service.$inject = [
    'otusjs.player.data.activity.ActivityFacadeService'
  ];

  function Service(ActivityFacadeService) {
    var self = this;
    var _currentItemService;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) {
      _currentItemService = ActivityFacadeService.getCurrentItem();

      if (!_currentItemService.shouldApplyAnswer()) {
        pipe.skipStep = true;
      } else {
        pipe.skipStep = false;
      }

      pipe.isFlowing = true;
    }

    function effect(pipe, flowData) {
      let fillingContainer = _currentItemService.getFillingContainer();

      ActivityFacadeService.applyAnswer();

      Object.keys(fillingContainer).forEach(templateID => {
        flowData.answerToEvaluate[templateID].data = _ensureTestableValue(fillingContainer[templateID].answer);
        flowData.metadataToEvaluate[templateID].data = _ensureTestableValue(fillingContainer[templateID].metadata);
      });
    }

    function afterEffect(pipe, flowData) {
    }

    function getEffectResult(pipe, flowData) {
      return flowData;
    }

    function _isTestableValue(value) {
      return value !== null && value !== undefined;
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
    var _currentItemService;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) {
      _currentItemService = ActivityFacadeService.getCurrentItem();

      if (_currentItemService.shouldIgnoreResponseEvaluation()) {
        pipe.skipStep = true;
      } else {
        pipe.skipStep = false;
      }
    }

    function effect(pipe, flowData) {
      ActivityFacadeService.attachItemValidationError(flowData.validationResult);
    }

    function afterEffect(pipe, flowData) {
      for (var itemID in flowData.validationResult){
        if (flowData.validationResult[itemID].hasError) {
          pipe.isFlowing = false;
        }
      }
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
    var _currentItemService;
    var _validationResult = {};

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) {
      _currentItemService = ActivityFacadeService.getCurrentItem();

      if (_currentItemService.shouldIgnoreResponseEvaluation()) {
        pipe.skipStep = true;
      } else {
        pipe.skipStep = false;
      }
    }

    function effect(pipe, flowData) {
      flowData.validationResult = {};
      _currentItemService.getItems().forEach(function (surveyItem) {
        let templateID = surveyItem.templateID;

        if (surveyItem.isQuestion()) {
          flowData.validationResult[templateID] = {};
          flowData.validationResponse[templateID].validatorsResponse.forEach(function(validator) {
            if (validator.name === 'mandatory' || validator.data.reference) {
              flowData.validationResult[templateID][validator.name] = !validator.result && (angular.equals(flowData.metadataToEvaluate[templateID].data, {}));
            } else {
              flowData.validationResult[templateID][validator.name] = !validator.result;
            }
          });
          flowData.validationResult[templateID].hasError = _hasError(flowData, templateID);
        }
      });
    }

    function afterEffect(pipe, flowData) {}

    function getEffectResult(pipe, flowData) {
      return flowData;
    }

    function _hasError(flowData, templateID) {
      return Object.keys(flowData.validationResult[templateID]).some(function(validator) {
        return flowData.validationResult[templateID][validator];
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
    var _currentItemService;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) {
      _currentItemService = ActivityFacadeService.getCurrentItem();

      if (_currentItemService.shouldIgnoreResponseEvaluation()) {
        pipe.skipStep = true;
      } else {
        pipe.skipStep = false;
      }
    }

    function effect(pipe, flowData) {
      flowData.validationResponse = {};
      ItemFillingValidatorService.applyValidation(_currentItemService, function(validationResponse) {
        let response = validationResponse[0];
        flowData.validationResponse[response.elementID] = response;
      });
    }

    function afterEffect(pipe, flowData) {}

    function getEffectResult(pipe, flowData) {
      return flowData;
    }
  }
})();

(function () {
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
    var _currentItemService;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) {
      _currentItemService = ActivityFacadeService.getCurrentItem();

      if (_currentItemService.shouldIgnoreResponseEvaluation()) {
        pipe.skipStep = true;
      } else {
        pipe.skipStep = false;
      }
    }

    function effect(pipe, flowData) {
      ItemFillingValidatorService.setupValidation(_currentItemService, flowData.answerToEvaluate);
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
      'otusjs.player.data.viewer',
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
    self.fetchItemGroupByID = fetchItemGroupByID;
    self.fetchNavigationByOrigin = fetchNavigationByOrigin;
    self.getCurrentItem = getCurrentItem;
    self.getCurrentSurvey = getCurrentSurvey;
    self.getWholeTemplateStaticVariableList = getWholeTemplateStaticVariableList;
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

    function fetchItemGroupByID(id) {
      return CurrentSurveyService.getGroupItemsByMemberID(id);
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

    function getWholeTemplateStaticVariableList() {
      return CurrentSurveyService.getWholeTemplateStaticVariableList();
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
    }

    function clearSkippedAnswers() {
      CurrentSurveyService.clearSkippedAnswers();
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('otusjs.player.data.activity')
    .service('otusjs.player.data.activity.CurrentItemService', Service);

  Service.$inject = [
    'otusjs.model.activity.ActivityFacadeService'
  ];

  function Service(ActivityFacadeService) {
    var self = this;
    var _surveyItemGroup = [];
    var _fillingContainer = {};
    var _navigation = null;
    var _validationError = {};
    var _observerArray = [];

    /* Public Interface */
    self.applyFilling = applyFilling;
    self.attachValidationError = attachValidationError;
    self.clearData = clearData;
    self.fill = fill;
    self.getFilling = getFilling;
    self.getFillingContainer = getFillingContainer;
    self.getFillingRules = getFillingRules;
    self.getItems = getItems;
    self.getItemsByTemplateID = getItemsByTemplateID;
    self.getNavigation = getNavigation;
    self.getValidationError = getValidationError;
    self.hasItems = hasItems;
    self.shouldIgnoreResponseEvaluation = shouldIgnoreResponseEvaluation;
    self.shouldApplyAnswer = shouldApplyAnswer;
    self.observerRegistry = observerRegistry;
    self.setup = setup;

    function applyFilling() {
      Object.values(_fillingContainer).forEach(filling => {
        if (filling) {
          ActivityFacadeService.fillQuestion(filling);
        }
      });
    }

    function attachValidationError(validationError) {
      _validationError = validationError;
      _observerArray.forEach(observer => {
        if(validationError[observer.itemData.templateID]){
           observer.updateValidation(validationError[observer.itemData.templateID]);
        }
      })
    }

    function clearData() {
      _surveyItemGroup = [];
      _fillingContainer = {};
      _navigation = null;
      _validationError = {};
      _observerArray = [];
    }

    function fill(filling) {
      _fillingContainer[filling.questionID] = filling;
    }

    function getFilling(questionID) {
      return _fillingContainer[questionID];
    }

    function getFillingContainer() {
      return _fillingContainer;
    }

    function getFillingRules(templateID) {
      var options = null;
      _surveyItemGroup.forEach(item => {
        if (item.templateID === templateID) {
          options = item.fillingRules.options;
        }
      });

      return options;
    }

    function getItems() {
      return _surveyItemGroup;
    }

    function getItemsByTemplateID(templateID) {
      return _surveyItemGroup.find(item => {
        return item.templateID === templateID
      });
    }

    function getNavigation() {
      return _navigation;
    }

    function getValidationError() {
      return _validationError;
    }

    function hasItems() {
      return !!(_surveyItemGroup && _surveyItemGroup.length);
    }

    function shouldApplyAnswer() {
      return _surveyItemGroup.some(function (surveyItem) {
        return surveyItem && surveyItem.isQuestion();
      });
    }

    function shouldIgnoreResponseEvaluation() {
      return _surveyItemGroup.every(function (surveyItem) {
        return !surveyItem || !surveyItem.isQuestion();
      });
    }

    function observerRegistry(observer) {
      observer.pushData(_fillingContainer[observer.itemData.templateID]);
      _observerArray.push(observer);
    }

    function setup(data) {
      clearData();
      _surveyItemGroup = data.items;
      _navigation = data.navigation;

      _surveyItemGroup.forEach(function (surveyItem) {
        if (surveyItem.isQuestion()) {
          let filling;
          if (surveyItem.isQuestion()) {
            filling = ActivityFacadeService.getFillingByQuestionID(surveyItem.templateID);
            if (!filling) {
              filling = ActivityFacadeService.createQuestionFill(surveyItem);
              filling.answerType = surveyItem.objectType;
            }
          } else {
            filling = null;
          }
          _fillingContainer[surveyItem.templateID] = filling;
        }
      });
    }
  }
}());

(function () {
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
    self.getGroupItemsByMemberID = getGroupItemsByMemberID;
    self.getSurveyDatasources = getSurveyDatasources;
    self.getStaticVariableList = getStaticVariableList;
    self.initialize = initialize;
    self.finalize = finalize;
    self.save = save;
    self.clearSkippedAnswers = clearSkippedAnswers;
    self.getNavigationTracker = getNavigationTracker;
    self.getWholeTemplateStaticVariableList = getWholeTemplateStaticVariableList;

    function getSurvey() {
      return ActivityFacadeService.surveyActivity;
    }

    function getSurveyDatasources() { //question datasources
      return getSurvey().getDataSources();
    }

    function getStaticVariableList() {
      return getSurvey().getStaticVariableList();
    }

    function getAnswerByItemID(id) {
      return ActivityFacadeService.getFillingByQuestionID(id);
    }

    function getItems() {
      return ActivityFacadeService.surveyActivity.getItems();
    }

    function getItemByCustomID(customID) {
      var fetchedItem = null;

      getItems().some(function (item) {
        if (item.customID === customID) {
          fetchedItem = item;
          return true;
        }
      });

      return fetchedItem;
    }

    function getItemByTemplateID(templateID) {
      return getItems().find(function (item) {
        return item.templateID === templateID;
      });
    }

    function getGroupItemsByMemberID(id) {
      return getSurvey().getGroupItemsByItemID(id);
    }

    function getNavigations() {
      return ActivityFacadeService.surveyActivity.getNavigations();
    }

    function getNavigationByOrigin(origin) {
      var fetchedNavigation = null;

      getNavigations().some(function (navigation) {
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

    function clearSkippedAnswers() {
      ActivityFacadeService.clearSkippedAnswers();
    }

    function getNavigationTracker() {
      return ActivityFacadeService.getNavigationTracker();
    }

    function getWholeTemplateStaticVariableList() {
      return ActivityFacadeService.getWholeTemplateVariableList();
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

(function () {
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
      return ActivityFacadeService.getCurrentItem().getNavigation().listRoutes().map(function (route) {
        return ActivityFacadeService.getCurrentSurvey().getItemByTemplateID(route.destination);
      });
    }

    function getPreviousItem() {
      if (hasPrevious()) {
        var previousID = _navigationTracker.getCurrentItemGroup()[0].getPrevious();
        return ActivityFacadeService.getCurrentSurvey().getItemByTemplateID(previousID);
      } else {
        return null;
      }
    }

    function hasNext() {
      return !!ActivityFacadeService.getCurrentItem().getNavigation().listRoutes().length;
    }

    function hasPrevious() {
      return !!_navigationTracker.hasPreviousItem();
    }

    function initialize() {
      _navigationTracker = ActivityFacadeService.getCurrentSurvey().getSurvey().getNavigationTracker();
    }

    function loadNextItem() {
      if (ActivityFacadeService.getCurrentItem().hasItems()) {
        return _loadNextItem();
      } else if (_navigationTracker.getCurrentIndex()) {
        return _loadLastVisitedItem();
      } else {
        return _loadFirstItem();
      }
    }

    function loadPreviousItem() {
      if (hasPrevious()) {
        var itemsPreviousArray = [];
        var items = getPreviousItem();
        var navigation = null;

        itemsPreviousArray = ActivityFacadeService.fetchItemGroupByID(items.templateID);
        navigation = ActivityFacadeService.getCurrentSurvey().getNavigationByOrigin(itemsPreviousArray[itemsPreviousArray.length - 1].templateID);

        RouteService.setup(navigation);
        _navigationTracker.visitGroup(itemsPreviousArray.map(item=>item.templateID));

        return {
          items: itemsPreviousArray,
          navigation: navigation
        };
      }
    }

    function updateItemTracking() {
      var currentItemFillingContainer = ActivityFacadeService.getCurrentItem().getFillingContainer();
      _navigationTracker.updateCurrentGroup(currentItemFillingContainer);
    }

    function _loadFirstItem() {
      return _loadItem();
    }

    function _loadLastVisitedItem() {
      return _loadItem(_navigationTracker.getCurrentItemGroup()[0].getID());
    }

    function _loadNextItem() {
      var currentItemNavigation = ActivityFacadeService.getCurrentItem().getNavigation();

      if (currentItemNavigation) {
        var routeToUse = RouteService.calculateRoute();
        return _loadItem(routeToUse.destination);
      }
    }

    function _loadItem(id) {
      var itemsToLoad = null;
      var navigation = null;

      if (!id) {
        let firstItem = ActivityFacadeService.getCurrentSurvey().getItems()[0];
        itemsToLoad = ActivityFacadeService.fetchItemGroupByID(firstItem.templateID);
        navigation = ActivityFacadeService.fetchNavigationByOrigin(itemsToLoad[itemsToLoad.length - 1].templateID);
        _navigationTracker.visitGroup(itemsToLoad.map(item=>item.templateID));

      } else if (id !== 'END NODE') {
        itemsToLoad = ActivityFacadeService.fetchItemGroupByID(id);
        navigation = ActivityFacadeService.fetchNavigationByOrigin(itemsToLoad[itemsToLoad.length - 1].templateID);
        _navigationTracker.visitGroup(itemsToLoad.map(item=>item.templateID));

      } else {
         navigation = ActivityFacadeService.fetchNavigationByOrigin(id);
      }

      if (navigation) {
        RouteService.setup(navigation);
      }

      if (id === 'END NODE') {
        _navigationTracker.visitGroup([id]);
        return id;
      }

      return {
        items: itemsToLoad,
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
    .module('otusjs.player.data.viewer', []);

}());

(function () {
  'use strict';

  angular
    .module('otusjs.player.data.viewer')
    .factory('otusjs.player.data.viewer.SurveyViewFactory', Factory);

  Factory.$inject = [
    'otusjs.model.activity.ActivityFacadeService'
  ];

  function Factory(ActivityFacadeService) {
    var self = this;

    self.create = create;

    function create() {
      return new ActivityView(ActivityFacadeService);
    }

    function ActivityView(ActivityFacadeService) {
      var self = this;

      let activity = ActivityFacadeService.surveyActivity;
      self.acronym = activity.surveyForm.acronym;
      self.name = activity.surveyForm.name;
      self.participantData = activity.participantData;
      self.lastStatus = activity.statusHistory.getLastStatus();
      self.mode = activity.mode;


      let items = ActivityFacadeService.surveyActivity.getItems();
      let navigationTrackerItems = ActivityFacadeService.getNavigationTracker().getItems();

      self.itemContainer = items.map(item => {
        let trackingItem = navigationTrackerItems[item.templateID];
        let filling = ActivityFacadeService.getFillingByQuestionID(item.templateID);

        return SurveyItemMapper(item, trackingItem, filling);
      });

      self.itemsCount = self.itemContainer.length;

      return self;
    }

    function SurveyItemMapper(item, trackingItem, filling) {
      let objectType = item.objectType;

      switch (objectType) {

        case 'TextItem':
          return new TextItemView(item, trackingItem, filling);

        case 'ImageItem':
          return new ImageItemView(item, trackingItem, filling);

        case 'CheckboxQuestion':
          return new CheckboxQuestionView(item, trackingItem, filling);

        case 'FileUploadQuestion':
          return new FileUploadQuestionView(item, trackingItem, filling);

        case 'SingleSelectionQuestion':
          return new SingleSelectionQuestionView(item, trackingItem, filling);

        case 'CalendarQuestion':
          return new CalendarQuestionView(item, trackingItem, filling);

        case 'TimeQuestion':
          return new TimeQuestionView(item, trackingItem, filling);

        case 'GridIntegerQuestion':
          return new GridIntegerQuestionView(item, trackingItem, filling);

        case 'GridTextQuestion':
          return new GridTextQuestionView(item, trackingItem, filling);

        default:
          return new QuestionView(item, trackingItem, filling);
      }
    }

    function TextItemView(item, navigationTrackingItem, filling) {
      var self = new SurveyItemView(item, navigationTrackingItem, filling);

      self.templateName = 'textItemView';

      self.value = item.value;
      return self;
    }

    function ImageItemView(item, navigationTrackingItem, filling) {
      var self = new SurveyItemView(item, navigationTrackingItem, filling);

      self.templateName = 'imageItemView';

      self.value = item.url;
      self.footer = item.footer;
      return self;
    }

    function CalendarQuestionView(item, navigationTrackingItem, filling) {
      var self = new QuestionView(item, navigationTrackingItem, filling);

      self.templateName = 'calendarQuestionView';

      return self;
    }

    function FileUploadQuestionView(item, navigationTrackingItem, filling) {
      var self = new QuestionView(item, navigationTrackingItem, filling);

      self.templateName = 'fileUploadQuestionView';

      return self;
    }

    function TimeQuestionView(item, navigationTrackingItem, filling) {
      var self = new QuestionView(item, navigationTrackingItem, filling);

      self.templateName = 'TimeQuestionView';

      return self;
    }

    function CheckboxQuestionView(item, navigationTrackingItem, filling) {
      var self = new QuestionView(item, navigationTrackingItem, filling);

      self.templateName = 'checkboxQuestionView';

      self.answer = item.options.map(item => {
        if (filling && filling.answer.value) {
          item.value = filling.answer.value.find(value => value.option === item.customOptionID).state;
        }
        return item;
      });

      return self;
    }

    function SingleSelectionQuestionView(item, navigationTrackingItem, filling) {
      var self = new QuestionView(item, navigationTrackingItem, filling);

      self.templateName = 'singleSelectionQuestionView';
      self.trueValue = 1;

      if (filling && filling.answer.value) {
        self.answer = item.options.map(options => {
          if (options.value.toString() === filling.answer.value.toString()) {
            options.value = 1;
          } else {
            options.value = 0;
          }
          return options;
        });
      } else {
        self.answer = item.options.map(options => {
          options.value = 0;
          return options;
        });
      }


      return self;
    }

    function GridIntegerQuestionView(item, navigationTrackingItem, filling) {
      var self = new QuestionView(item, navigationTrackingItem, filling);

      self.templateName = 'gridIntegerQuestionView';

      self.answer = item.getLinesList().map((line, lineIx) => {
        if (filling && filling.answer.value) {
          filling.answer.value[lineIx].forEach((pos, posIx) => {
            line.getGridIntegerList()[posIx].value = pos.value || ' ';
          });
        }

        return {positions: line.getGridIntegerList()};
      });

      return self;
    }

    function GridTextQuestionView(item, navigationTrackingItem, filling) {
      var self = new QuestionView(item, navigationTrackingItem, filling);

      self.templateName = 'gridTextQuestionView';

      self.answer = item.getLinesList().map((line, lineIx) => {
        if (filling && filling.answer.value) {
          filling.answer.value[lineIx].forEach((pos, posIx) => {
            line.getGridTextList()[posIx].value = pos.value || ' ';
          });
        }

        return {positions: line.getGridTextList()};
      });

      return self;
    }


    function QuestionView(item, navigationTrackingItem, filling) {
      var self = new SurveyItemView(item, navigationTrackingItem, filling);

      self.dataType = item.dataType;
      self.templateName = 'questionView';

      self.forceAnswer = undefined;
      self.answer = undefined;
      self.hasAnswer = undefined;
      self.hasMetadata = undefined;
      self.metadata = undefined;
      self.comment = undefined;
      self.hasComment = undefined;

      self.isAnswered = !!filling; //answer, metadata or comment

      if (self.isAnswered) {
        self.forceAnswer = filling.forceAnswer;
        self.answer = filling.answer.value;
        self.hasAnswer = filling.answer.isFilled();
        self.hasMetadata = filling.metadata.isFilled();
        if (self.hasMetadata) {
          self.metadata = item.metadata.options.find(metadata => metadata.value.toString() === filling.metadata.value.toString());
        }

        self.comment = filling.comment;
        self.hasComment = !!self.comment;
      }
      return self;
    }

    function SurveyItemView(item, navigationTrackingItem) {
      var self = this;

      self.objectType = item.objectType;
      self.templateID = item.templateID;
      self.customID = item.customID;
      self.label = item.label;
      self.isQuestion = item.isQuestion();

      self.navigationState = navigationTrackingItem.getState();
      self.navigationStateLabel = _translateStateLabel(self.navigationState);
      self.index = navigationTrackingItem.getIndex();
      self.isIgnored = navigationTrackingItem.isIgnored();
      self.isSkipped = navigationTrackingItem.isSkipped();

      function _translateStateLabel(state) {
        switch (state) {
          case 'ANSWERED':
            return "Respondida";
          case 'SKIPPED':
            return "Pulada";
          case 'NOT_VISITED':
            return "Não respondida";
          case 'VISITED':
            return "Visitada";
          case 'IGNORED':
            return "Ignorada";
        }
      }

      return self;
    }

    return self;

  }

}());

(function() {
  'use strict';

  angular
    .module('otusjs.player.data.validation', [
      'otus.validation'
    ]);

}());

(function () {
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
    var _elementRegisters = {};
    var _answers = [];

    /* Public methods */
    self.applyValidation = applyValidation;
    self.setupValidation = setupValidation;

    function applyValidation(currentItemService, callback) {
      // ValidationService.unregisterElement(_elementRegisters.id);
      setupValidation(currentItemService, _answers);
      Object.keys(_answers).forEach(templateID => {
        ValidationService.validateElement(templateID, callback);
      });
    }

    function setupValidation(currentItemService, answerObject) {
      _answers = answerObject;

      currentItemService.getItems().forEach(function (surveyItem) {
        if (surveyItem.isQuestion()) {
          let templateID = surveyItem.templateID;
          let answer = answerObject[templateID];

          let elementRegister = ElementRegisterFactory.create(templateID, answer);

          if (currentItemService.getFilling(templateID).forceAnswer) {
            Object.keys(surveyItem.fillingRules.options).filter(function (validator) {
              if (!surveyItem.fillingRules.options[validator].data.canBeIgnored) {
                _addValidator(elementRegister, validator, surveyItem);
              }
            });
          } else {
            Object.keys(surveyItem.fillingRules.options).map(function (validator) {
              _addValidator(elementRegister, validator, surveyItem);
            });
            _setupImmutableDateValidation(elementRegister, surveyItem);
          }
          _elementRegisters[templateID] = elementRegister;

          ValidationService.unregisterElement(elementRegister.id);
          ValidationService.registerElement(elementRegister);
        }
      });
    }

    function _addValidator(elementRegister, validator, surveyItem) {
      var reference = surveyItem.fillingRules.options[validator].data;
      elementRegister.addValidator(validator, reference);
    }

    function _setupImmutableDateValidation(elementRegister, surveyItem) {
      var currentItemItemType = surveyItem.objectType;
      if (currentItemItemType === "TimeQuestion" || currentItemItemType === "CalendarQuestion") {
        elementRegister.addValidator("ImmutableDate", surveyItem);
      }
    }
  }
}());

angular.module("trail",["ngMaterial","nsPopover"]),function(e,t,n){"use strict";var o=t.module("nsPopover",[]),i=t.element,r=t.isDefined,c=[],a=0;o.provider("nsPopover",function(){var e={template:"",theme:"ns-popover-list-theme",plain:"false",trigger:"click",triggerPrevent:!0,angularEvent:"",scopeEvent:"",container:"body",placement:"bottom|left",timeout:1.5,hideOnInsideClick:!1,hideOnOutsideClick:!0,hideOnButtonClick:!0,mouseRelative:"",popupDelay:0};this.setDefaults=function(n){t.extend(e,n)},this.$get=function(){return{getDefaults:function(){return e}}}}),o.controller("clientCtrl",function(){var e=this;e.tracks=[{id:"TST1",icon:"date_range",text:"TST1",time:"",styleClass:"md-warn",click:function(){}},{id:"",icon:"looks_one",text:"Segundo nodo da lista",time:"",styleClass:"md-warn",click:function(){e.add()}},{id:"",icon:"exposure_zero",text:"Terceira opção",time:"",styleClass:"md-warn"},{id:"",icon:"radio_button_checked",text:"Ultima.",time:"",styleClass:"md-warn"}],e.add=function(){var t={id:"",icon:"looks_one",text:"Segundo nodo da lista",time:"",styleClass:"md-warn",click:function(){console.log("oi")}};e.tracks.push(t)}}),o.directive("nsPopover",["nsPopover","$rootScope","$timeout","$templateCache","$q","$http","$compile","$document","$parse",function(n,o,l,s,p,d,u,m,v){return{restrict:"A",scope:!0,link:function(g,h,f){function y(e,t,n,o,i){var r,c,a=P(e[0]),l=function(){return"center"===n?Math.round(o.left+o.width/2-a.width/2):"right"===n?o.right-a.width:o.left},s=function(){return"center"===n?Math.round(o.top+o.height/2-a.height/2):"bottom"===n?o.bottom-a.height:o.top};"top"===t?(r=o.top-a.height,c=l()):"right"===t?(r=s(),c=o.right):"bottom"===t?(r=o.bottom,c=l()):"left"===t&&(r=s(),c=o.left-a.width),e.css("top",r.toString()+"px").css("left",c.toString()+"px"),i&&("top"===t||"bottom"===t?(c=o.left+o.width/2-c,i.css("left",c.toString()+"px")):(r=o.top+o.height/2-r,i.css("top",r.toString()+"px")))}function k(e,t,n,o){var i={bottom:e.bottom,height:e.height,left:e.left,right:e.right,top:e.top,width:e.width};return t&&(i.left=o.pageX,i.right=o.pageX,i.width=0),n&&(i.top=o.pageY,i.bottom=o.pageY,i.height=0),i}function P(t){var n=e,o=document.documentElement||document.body.parentNode||document.body,i=r(n.pageXOffset)?n.pageXOffset:o.scrollLeft,c=r(n.pageYOffset)?n.pageYOffset:o.scrollTop,a=t.getBoundingClientRect();return i||c?{bottom:a.bottom+c,left:a.left+i,right:a.right+i,top:a.top+c,height:a.height,width:a.width}:a}function O(e){return e=!(!e||0===e.length)&&"true"==(""+e).toLowerCase()}function b(){B.isOpen&&_.hide(0)}function C(e){function n(e){if(e.id===o)return!0;var i=t.element(e).parent()[0];return!!i&&(i.id===o||n(i))}if(B.isOpen&&e.target!==h[0]){var o=B[0].id;n(e.target)||_.hide(0)}}function w(){B.isOpen&&_.hide(0)}var x=n.getDefaults(),$={template:f.nsPopoverTemplate||x.template,theme:f.nsPopoverTheme||x.theme,plain:O(f.nsPopoverPlain||x.plain),trigger:f.nsPopoverTrigger||x.trigger,triggerPrevent:f.nsPopoverTriggerPrevent||x.triggerPrevent,angularEvent:f.nsPopoverAngularEvent||x.angularEvent,scopeEvent:f.nsPopoverScopeEvent||x.scopeEvent,container:f.nsPopoverContainer||x.container,placement:f.nsPopoverPlacement||x.placement,timeout:f.nsPopoverTimeout||x.timeout,hideOnInsideClick:O(f.nsPopoverHideOnInsideClick||x.hideOnInsideClick),hideOnOutsideClick:O(f.nsPopoverHideOnOutsideClick||x.hideOnOutsideClick),hideOnButtonClick:O(f.nsPopoverHideOnButtonClick||x.hideOnButtonClick),mouseRelative:f.nsPopoverMouseRelative,popupDelay:f.nsPopoverPopupDelay||x.popupDelay,group:f.nsPopoverGroup};$.mouseRelative&&($.mouseRelativeX=-1!==$.mouseRelative.indexOf("x"),$.mouseRelativeY=-1!==$.mouseRelative.indexOf("y"));var E={id_:void 0,display:function(e,t){!1!==v(f.nsPopover)(g)&&(l.cancel(E.id_),r(e)||(e=0),$.group&&o.$broadcast("ns:popover:hide",$.group),E.id_=l(function(){B.isOpen=!0,B.css("display","block");var e=P(h[0]);$.mouseRelative&&(e=k(e,$.mouseRelativeX,$.mouseRelativeY,t)),y(B,R,T,e,D),$.hideOnInsideClick&&B.on("click",b),$.hideOnOutsideClick&&m.on("click",C),$.hideOnButtonClick&&h.on("click",w)},1e3*e))},cancel:function(){l.cancel(E.id_)}},_={id_:void 0,hide:function(e){l.cancel(_.id_),"-1"!==e&&(r(e)||(e=1.5),_.id_=l(function(){B.off("click",b),m.off("click",C),h.off("click",w),B.isOpen=!1,E.cancel(),B.css("display","none")},1e3*e))},cancel:function(){l.cancel(_.id_)}},S=m.find($.container);S.length||(S=m.find("body"));var D,R,T;a+=1;var B=i('<div id="nspopover-'+a+'"></div>');c.push(B);var X=$.placement.match(/^(top|bottom|left|right)$|((top|bottom)\|(center|left|right)+)|((left|right)\|(center|top|bottom)+)/);if(!X)throw new Error('"'+$.placement+'" is not a valid placement or has a invalid combination of placements.');R=X[6]||X[3]||X[1],T=X[7]||X[4]||X[2]||"center",p.when(function(e,n){return e?t.isString(e)&&n?e:s.get(e)||d.get(e,{cache:!0}):""}($.template,$.plain)).then(function(e){e=t.isString(e)?e:e.data&&t.isString(e.data)?e.data:"",B.html(e),$.theme&&B.addClass($.theme),B.addClass("ns-popover-"+R+"-placement").addClass("ns-popover-"+T+"-align"),u(B)(g),g.$on("$destroy",function(){B.remove()}),g.hidePopover=function(){_.hide(0)},g.$on("ns:popover:hide",function(e,t){$.group===t&&g.hidePopover()}),B.css("position","absolute").css("display","none"),D=B[0].querySelectorAll(".triangle"),D.length&&(D=i(D)),S.append(B)}),$.angularEvent?o.$on($.angularEvent,function(){_.cancel(),E.display($.popupDelay)}):$.scopeEvent?g.$on($.scopeEvent,function(){_.cancel(),E.display(B,$.popupDelay)}):h.on($.trigger,function(e){!1!==$.triggerPrevent&&e.preventDefault(),_.cancel(),E.display($.popupDelay,e)}),h.on("mouseout",function(){_.hide($.timeout)}).on("mouseover",function(){_.cancel()}),B.on("mouseout",function(e){_.hide($.timeout)}).on("mouseover",function(){_.cancel()})}}}])}(window,window.angular),angular.module("trail").directive("otusTrail",function(){return{template:'<div layout-align="center center" layout="column"><md-button class="md-fab md-primary"><md-icon >question_answer</md-icon></md-button><div layout-align="center" ng-repeat="content in nodes"><section flex class="timeLine"></section><div layout="row" layout-align="center center"><div id="stepButtons"><md-button ng-click="content.click(content)" ns-popover ns-popover-template="tooltip" ns-popover-trigger="mouseover"ns-popover-theme="ns-popover-tooltip-theme" ns-popover-timeout="0.1"ns-popover-placement="right" ng-class="content.styleClass" class="md-fab md-mini"><md-icon>{{content.icon}}</md-icon></md-button></div><div><span>{{content.time}}</span></div></div><script type="text/ng-template" id="tooltip"><div class="triangle"></div><div class="md-body-2 ns-popover-tooltip">{{content.text+i}}</div></script></div></div',restrict:"E",scope:{nodes:"="}}});