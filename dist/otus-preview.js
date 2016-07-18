(function() {
    'use strict';

    angular
        .module('otusjs.player.config', []);

}());

(function() {
    'use strict';

    angular
        .module('otusjs.player.component', []);

}());

(function() {
    'use strict';

    angular
        .module('otusjs.player.core', [
            'otusjs.player.service'
        ]);

}());

(function() {
    'use strict';

    angular
        .module('otusjs.player.data', []);

}());

(function() {
    'use strict';

    angular
        .module('otusjs.player.viewer', []);

}());

(function() {
    'use strict';

    angular
        .module('otusjs.player.service', []);

}());

(function() {
    'use strict';

    angular
        .module('otusjs.player.standalone', [
            /* External dependencies */
            'ngMaterial',
            'ngMessages',
            'ngAnimate',
            'ui.router',
            'angular-bind-html-compile',
            'monospaced.mousewheel',
            /* Exportable dependencies */
            'otusjs.player.core',
            'otusjs.player.component',
            /* Standalone dependencies */
            'otusjs.player.config',
            'otusjs.player.data',
            'otusjs.player.viewer',
            'otusjs',
        ]);

}());

(function() {
    'use strict';

    angular
        .module('otusjs.player.config')
        .config(stateConfiguration);

    stateConfiguration.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    function stateConfiguration($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider
            .state('index', {
                url: '/index',
                templateUrl: 'app/otusjs-player-viewer/sheet-view-template.html',
                resolve: {
                    resolvedSurveyTemplate: function prepareWorkEnvironment(FakeDataService, $q) {
                        var deferred = $q.defer();
                        FakeDataService.getSurveyTemplate().then(function(data){
                            deferred.resolve(data);
                        });
                        return deferred.promise;
                    }
                },
                controller: 'SheetViewController as sheetViewCtrl'
            });

        $urlRouterProvider.otherwise('/index');
        $locationProvider.html5Mode(true);
    }

}());

(function() {

    angular
        .module('otusjs.player.config')
        .config(themeConfiguration);

    themeConfiguration.$inject = ['$mdThemingProvider', '$mdIconProvider'];

    function themeConfiguration($mdThemingProvider, $mdIconProvider) {

        $mdThemingProvider.theme('layoutTheme')
            .primaryPalette('blue', {
                'default': 'A200',
                'hue-1': '200',
                'hue-2': '50',
                'hue-3': '700'
            }).accentPalette('blue-grey', {
                'default': '900',
                'hue-1': '50'
            }).warnPalette('red');


        /*Configuration icons*/
        /* 24 is the size default of icons */
        $mdIconProvider.defaultIconSet('app/assets/icons/mdi.svg', 24);
    }

}());

(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusPreview', {
            template: '<survey-item item-data="item" ng-repeat="item in ::$ctrl.itemStack track by $index"></survey-item>',
            controller: OtusPreviewController,
            bindings: {
                surveyTemplate: '<'
            }
        });

    function OtusPreviewController() {
        var self = this;

        self.itemContainer = [];

        self.$onInit = function() {
            self.itemContainer = self.surveyTemplate.itemContainer;
        };
    }

})();

(function() {
    'use strict';

    angular
        .module('otusjs.player.data')
        .service('FakeDataService', FakeDataService);

    FakeDataService.$inject = ['$http', '$q'];

    function FakeDataService($http, $q) {
        var self = this;

        self.getSurveyTemplate = getSurveyTemplate;

        function getSurveyTemplate() {
            var defer = $q.defer();
            $http.get('app/otusjs-player-data/survey-template.json').success(function(data) {
                defer.resolve(data);
            }).error(function(error) {
                console.log('Cannot GET a fake survey template.');
            });
            return defer.promise;
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('otusjs.player.viewer')
        .controller('SheetViewController', SheetViewController);

    SheetViewController.$inject = ['resolvedSurveyTemplate'];

    function SheetViewController(resolvedSurveyTemplate) {
        var self = this;

        self.surveyTemplate = resolvedSurveyTemplate;
        
    }

})();

(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .directive('otusButton', directive);

    directive.$inject = ['OtusButtonWidgetFactory'];

    function directive(OtusButtonWidgetFactory) {
        var ddo = {
            scope: {
                click: '<'
            },
            templateUrl: 'app/editor/ui/base/button/button.html',
            retrict: 'E',
            link: function linkFunc(scope, element, attrs) {
                scope.widget = OtusButtonWidgetFactory.create(scope, attrs, scope.$parent.widget);
            }
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .factory('OtusButtonWidgetFactory', OtusButtonWidgetFactory);

    function OtusButtonWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(templateData, templateConfig, parentWidget) {
            return new OtusButtonWidget(templateData, templateConfig, parentWidget);
        }

        return self;
    }

    function OtusButtonWidget(templateData, templateConfig, parentWidget) {
        var self = this;

        /* Valid values */
        var validTooltipDirections = ['top', 'bottom', 'left', 'right'];

        /* Type definitions */
        self.className = self.constructor.name;
        self.css = {};
        self.template = {};
        self.event = {};

        /* Template definitions */
        self.template.ariaLabel = templateConfig.ariaLabel || templateConfig.label;
        self.template.label = templateConfig.label;
        self.template.tooltip = templateConfig.tooltip || templateConfig.label;
        self.template.tooltipDirection = (templateConfig.tooltipDirection !== undefined && (validTooltipDirections.indexOf(templateConfig.tooltipDirection) !== -1)) ? templateConfig.tooltipDirection : 'top';
        self.template.leftIcon = templateConfig.iconButton || templateConfig.leftIcon;
        self.template.rightIcon = templateConfig.rightIcon;

        self.template.hasLeftIcon = self.template.leftIcon !== undefined;
        self.template.hasRightIcon = (templateConfig.iconButton === undefined && self.template.rightIcon !== undefined);

        /* CSS definitions */
        self.css.iconButton = (templateConfig.iconButton !== undefined) ? 'md-icon-button' : '';

        /* Instance definitions */
        self.parent = parentWidget;

        /* Event definitions */
        self.event.click = templateData.click;
    }

}());

(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusComment', {
            templateUrl: 'app/otusjs-player-component/comment/comment-template.html',
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
        .directive('otusInputText', otusInputText);

    otusInputText.$inject = ['OtusInputTextWidgetFactory'];

    function otusInputText(OtusInputTextWidgetFactory) {
        var ddo = {
            scope: {
                model: '<',
                disabled: '@'
            },
            templateUrl: 'app/editor/ui/base/input-text/input-text.html',
            retrict: 'E',
            link: function linkFunc(scope, element, attrs) {
                scope.widget = OtusInputTextWidgetFactory.create(scope, attrs, element, scope.$parent.widget || scope.$parent.$parent.childWidget);
            }
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .factory('OtusInputTextWidgetFactory', OtusInputTextWidgetFactory);

    function OtusInputTextWidgetFactory() {
        var self = this;

        self.create = create;

        function create(templateData, templateConfig, element, parentWidget) {
            return new OtusInputTextWidget(templateData, templateConfig, element, parentWidget);
        }

        return self;
    }

    function OtusInputTextWidget(templateData, templateConfig, element, parentWidget) {
        var self = this;

        /* Type definitions */
        self.className = self.constructor.name;
        self.css = {};
        self.template = {};
        self.event = {};

        /* Template definitions */
        self.template.ariaLabel = templateConfig.ariaLabel || templateConfig.label;
        self.template.label = templateConfig.label;
        self.template.leftIcon = templateConfig.iconButton || templateConfig.leftIcon;
        self.template.rightIcon = templateConfig.rightIcon;

        self.template.hasLeftIcon = self.template.leftIcon !== undefined;
        self.template.hasRightIcon = (templateConfig.iconButton === undefined && self.template.rightIcon !== undefined);

        /* Instance definitions */
        self.parent = parentWidget;
        self.modelReference = templateData.model;

        /* CSS definitions */
        self.style = templateData.style;

        if (templateData.model instanceof Function)
            self.model = templateData.model();
        else
            self.model = templateData.model;

        element.on('change', function() {
            if (self.modelReference instanceof Function)
                self.modelReference(self.model);
            else
                self.modelReference = self.model;
        });
    }

}());

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
            templateUrl: 'app/otusjs-player-component/metadata/metadata-group-template.html',
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
        .component('otusPageAnchor', {
            templateUrl: 'app/editor/ui/page-anchor-item/page-anchor-template.html',
            controller: AnchorController,
            bindings: {
                id: '<'
            }
        });

    AnchorController.$inject = [
        '$element',
        'PageAnchorService'
    ];

    function AnchorController($element, PageAnchorService) {
        var self = this;

        self.$onInit = function() {
            $element.attr('tabindex', -1);
            PageAnchorService.anchorRegistry($element);
        };
    }

}());

(function() {
    angular
        .module('otusjs.player.component')
        .service('PageAnchorService', PageAnchorService);

    function PageAnchorService() {
        var self = this;
        var anchorList = {};

        // public interface
        self.sheetAutoFocus = sheetAutoFocus;
        self.anchorRegistry = anchorRegistry;


        function anchorRegistry(anchorElement) {
            anchorList[anchorElement[0].id] = anchorElement;
        }

        function sheetAutoFocus(sheet) {
            var childrenNb = sheet.children().length;
            if (childrenNb > 6) {
                _focusOnBottom();
            } else {
                _focusOnTop();
            }
        }

        function _focusOnTop() {
            anchorList['top-anchor'].focus();
        }

        function _focusOnBottom() {
            anchorList['bottom-anchor'].focus();
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusSheet', {
            templateUrl: 'app/otusjs-player-component/sheet/sheet-template.html',
            controller: OtusSheetController,
            bindings: {
                surveyTemplate: '<'
            }
        });

    OtusSheetController.$inject = [
        '$scope',
        '$element',
        '$compile',
        'otusjs.player.core.PlayerService',
        'DataService'
    ];

    function OtusSheetController($scope, $element, $compile, PlayerService, DataService) {
        var self = this;

        var SURVEY_ITEM = '<otus-survey-item item-data="itemData" />';

        /* Public methods */
        self.$onInit = onInit;
        self.$onDestroy = onDestroy;
        self.previousItem = previousItem;
        self.nextItem = nextItem;
        self.catchMouseWheel = catchMouseWheel;

        function onInit() {
            self.isLoading = true;
            PlayerService.play(self.surveyTemplate.itemContainer);
            nextItem();
        }

        function onDestroy() {
            _clearWorspace();
        }

        function previousItem() {
            if (PlayerService.hasPrevious()) {
                loadItem(PlayerService.getPrevious());
                updateToolbar();

                if (self.currentChild) {
                    destroyCurrentItem();
                }
            }
        }

        function nextItem() {
            if (PlayerService.hasNext()) {
                loadItem(PlayerService.getNext());
                updateToolbar();

                if (self.currentChild) {
                    transferData();
                    destroyCurrentItem();
                }
            }
        }

        function loadItem(item) {
            $scope.itemData = item;
            $element.find('section').prepend($compile(SURVEY_ITEM)($scope));
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

        function _loadPreviewMode() {
            EditionPreviewService.setScope($scope);
            EditionPreviewService.loadSurveyTemplate();
        }

        function _loadEditorMode() {
            $window.sessionStorage.setItem('surveyTemplate_OID', WorkspaceService.getSurvey().oid);
        }

        function _clearWorspace() {
            WorkspaceService.closeWork();
            $window.sessionStorage.removeItem('surveyTemplate_OID');
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusSurveyHeader', {
            templateUrl: 'app/otusjs-player-component/survey-header/survey-header-template.html',
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
            templateUrl: 'app/otusjs-player-component/survey-item/survey-item-template.html',
            controller: OtusSurveyItemController,
            require: {
                otusSheet: '^'
            },
            bindings: {
                itemData: '<'
            }
        });

    OtusSurveyItemController.$inject = [
        '$scope',
        '$element'
    ];

    function OtusSurveyItemController($scope, $element) {
        var self = this;

        /* Public methods */
        self.isQuestion = isQuestion;
        self.isItem = isItem;
        self.restoreAll = restoreAll;
        self.update = update;
        self.destroy = destroy;

        self.$onInit = function() {
            self.filling = {};
            self.filling.questionID = self.itemData.templateID;
            self.otusSheet.currentChild = self;
        };

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
        .directive('otusTextEditor', directive);

    directive.$inject = ['OtusTextEditorWidgetFactory'];

    function directive(OtusTextEditorWidgetFactory) {
        var ddo = {
            scope: {
                placeholder: '@',
                label: '<',
                ariaLabel: '@',
                leftIcon: '@',
                ngModel: '<'
            },
            templateUrl: 'app/editor/ui/base/text-editor/text-editor.html',
            retrict: 'E',
            link: function linkFunc(scope, element) {
                scope.widget = OtusTextEditorWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .factory('OtusTextEditorWidgetFactory', OtusTextEditorWidgetFactory);

    OtusTextEditorWidgetFactory.$inject = [
        'UpdateQuestionEventFactory'
    ];

    function OtusTextEditorWidgetFactory(UpdateQuestionEventFactory) {
        var self = this;

        self.create = create;

        function create(scope, element) {
            return new OtusTextEditorWidget(scope, element, UpdateQuestionEventFactory);
        }
        return self;
    }

    function OtusTextEditorWidget(scope, element, UpdateQuestionEventFactory) {
        var self = this;

        self.input = angular.element(element.children()[0]);
        self.ngModel = scope.ngModel;
        self.placeholder = scope.placeholder;

        /* Public methods */
        self.getClassName = getClassName;
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.getLabel = getLabel;

        _init();

        function _init() {
            if (self.ngModel) {
                _loadLabel();
            }
        }

        function getClassName() {
            return 'OtusTextEditorWidget';
        }

        function getUUID() {
            return scope.uuid;
        }

        function getLabel() {
            return self.ngModel.ptBR.formattedText;
        }

        function getElement() {
            return element;
        }

        function getParent() {
            return scope.$parent.widget;
        }

        function getItem() {
            return getParent().getItem();
        }


        element.on('focusout', function(event) {
            _saveLabel();
            UpdateQuestionEventFactory.create().execute(self);
        });

        function _saveLabel() {
            self.ngModel.ptBR.formattedText = _removeSpecialCharacters(event.target.innerHTML);
            self.ngModel.ptBR.plainText = event.target.innerText;
        }

        function _removeSpecialCharacters(value) {
            return value.replace(/"/g, '\'');
        }

        function _loadLabel() {
            self.getElement().children()[0].innerHTML = self.getLabel();
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('otusjs.player.core')
        .service('otusjs.player.core.ItemManagerService', ItemManagerService);

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
        .module('otusjs.player.core')
        .service('otusjs.player.core.PlayerService', PlayerService);

    PlayerService.$inject = [
        'otusjs.player.core.ItemManagerService'
    ];

    function PlayerService(ItemManagerService) {
        var self = this;

        self.play = play;
        self.getNext = getNext;
        self.getPrevious = getPrevious;
        self.hasNext = hasNext;
        self.hasPrevious = hasPrevious;

        function play(items) {
            ItemManagerService.init(items);
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
            return ItemManagerService.hasNext();
        }

        function hasPrevious() {
            return ItemManagerService.hasPrevious();
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('otusjs.player.service')
        .service('DataService', DataService);

    DataService.$inject = ['ActivityFacadeService', 'ActivityUserFactory'];

    function DataService(ActivityFacadeService, ActivityUserFactory) {
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
        .module('otusjs.player.service')
        .service('HtmlBuilderService', HtmlBuilderService);

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
        .module('otusjs.player.service')
        .service('TagComponentBuilderService', TagComponentBuilderService);

    TagComponentBuilderService.$inject = ['HtmlBuilderService'];

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
        .module('otusjs.player.component')
        .component('otusMiscItem', {
            templateUrl: 'app/otusjs-player-component/survey-item/misc/misc-item-template.html',
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
        .component('otusQuestion', {
            templateUrl: 'app/otusjs-player-component/survey-item/question/question-component-template.html',
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
        .component('otusImageItem', {
            templateUrl: 'app/otusjs-player-component/survey-item/misc/image/image-item-template.html',
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
            templateUrl: 'app/otusjs-player-component/survey-item/misc/text/text-item-template.html',
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
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusCalendarQuestion', {
            templateUrl: 'app/otusjs-player-component/survey-item/question/calendar/calendar-question-template.html',
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
        .component('otusCheckboxQuestion', {
            templateUrl: 'app/otusjs-player-component/survey-item/question/checkbox/checkbox-question-template.html',
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
        .component('otusDecimalQuestion', {
            templateUrl: 'app/otusjs-player-component/survey-item/question/decimal/decimal-question-template.html',
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
        .component('otusEmailQuestion', {
            templateUrl: 'app/otusjs-player-component/survey-item/question/email/email-question-template.html',
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
        .component('otusIntegerQuestion', {
            templateUrl: 'app/otusjs-player-component/survey-item/question/integer/integer-question-template.html',
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
        .component('otusPhoneQuestion', {
            templateUrl: 'app/otusjs-player-component/survey-item/question/phone/phone-question-template.html',
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
        .component('otusSingleSelectionQuestion', {
            templateUrl: 'app/otusjs-player-component/survey-item/question/single-selection/single-selection-question-template.html',
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
        .component('otusTextQuestion', {
            templateUrl: 'app/otusjs-player-component/survey-item/question/text/text-question-template.html',
            controller: TextQuestionController,
            bindings: {
                itemData: '<',
                onUpdate: '&'
            }
        });

    function TextQuestionController() {
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
        .component('otusTimeQuestion', {
            templateUrl: 'app/otusjs-player-component/survey-item/question/time/time-question-template.html',
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
