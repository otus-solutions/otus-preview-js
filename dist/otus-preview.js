(function() {
    'use strict';

    angular
        .module('otus.component.allPurpose', []);

}());

(function() {
    'use strict';

    angular
        .module('otus.component.editor', []);

}());

(function() {
    'use strict';

    angular
        .module('otus.component.preview', []);

}());

(function() {
    'use strict';

    angular
        .module('otus.preview', [
            /* External modules */
            'ngMaterial',
            'ui.router',
            'angular-bind-html-compile',
            /* Otus model module */
            'otusjs',
            /* Components modules */
            'otus.component.allPurpose',
            'otus.component.editor',
            'otus.component.preview'
        ]);

}());

(function() {
    'use strict';

    angular
        .module('otus.preview')
        .config(stateConfiguration);

    stateConfiguration.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    function stateConfiguration($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider
            .state('index', {
                url: '/index',
                templateUrl: 'app/view/sheet-view-template.html',
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
        .module('otus.preview')
        .config(['$mdThemingProvider', '$mdIconProvider', themeConfiguration]);

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
        .module('otus.preview')
        .service('FakeDataService', FakeDataService);

    FakeDataService.$inject = ['$http', '$q'];

    function FakeDataService($http, $q) {
        var self = this;

        self.getSurveyTemplate = getSurveyTemplate;

        function getSurveyTemplate() {
            var defer = $q.defer();
            $http.get('app/fake-data/survey-template.json').success(function(data) {
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
        .module('otus.preview')
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
        .module('otus.component.preview')
        .component('otusPreview', {
            template: '<survey-item item-data="item" ng-repeat="item in ::$ctrl.itemContainer track by $index"></survey-item>',
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
        .module('otus.component.preview')
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
        .module('otus.component.preview')
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
        .module('otus.component.editor')
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
        .module('otus.component.editor')
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
        .module('otus.component.allPurpose')
        .component('otusSheet', {
            templateUrl: 'app/components/all-purpose/sheet/sheet-template.html',
            controller: OtusSheetController,
            bindings: {
                surveyTemplate: '<'
            }
        });

    function OtusSheetController() {
        var self = this;

        /* Public methods */
        self.$onInit = onInit;
        self.$onDestroy = onDestroy;

        function onInit() {
            self.isLoading = true;
            self.itemContainer = self.surveyTemplate.itemContainer;

            // if (EditionPreviewService.isLoadingMode()) {
            //     _loadPreviewMode();
            // } else {
            //     _loadEditorMode();
            // }
        }

        function onDestroy() {
            _clearWorspace();
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
        .module('otus.component.allPurpose')
        .component('otusSurveyHeader', {
            templateUrl: 'app/components/all-purpose/survey-header/survey-header-template.html',
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
        .module('otus.component.editor')
        .factory('SurveyItemWidgetFactory', SurveyItemWidgetFactory);

    SurveyItemWidgetFactory.$inject = [
        /* Question items */
        'CalendarQuestionWidgetFactory',
        'IntegerQuestionWidgetFactory',
        'DecimalQuestionWidgetFactory',
        'SingleSelectionQuestionWidgetFactory',
        'CheckboxQuestionWidgetFactory',
        'TextQuestionWidgetFactory',
        'TimeQuestionWidgetFactory',
        'EmailQuestionWidgetFactory',
        'PhoneQuestionWidgetFactory',
        /* Miscelaneous items */
        'TextItemWidgetFactory',
        'ImageItemWidgetFactory'
    ];

    function SurveyItemWidgetFactory(CalendarQuestionWidgetFactory, IntegerQuestionWidgetFactory, DecimalQuestionWidgetFactory, SingleSelectionQuestionWidgetFactory, CheckboxQuestionWidgetFactory, TextQuestionWidgetFactory, TimeQuestionWidgetFactory, EmailQuestionWidgetFactory, PhoneQuestionWidgetFactory, TextItemWidgetFactory, ImageItemWidgetFactory) {
        var self = this;

        var widgetFactories = {
            'CalendarQuestion': CalendarQuestionWidgetFactory,
            'IntegerQuestion': IntegerQuestionWidgetFactory,
            'DecimalQuestion': DecimalQuestionWidgetFactory,
            'SingleSelectionQuestion': SingleSelectionQuestionWidgetFactory,
            'CheckboxQuestion': CheckboxQuestionWidgetFactory,
            'TextQuestion': TextQuestionWidgetFactory,
            'TimeQuestion': TimeQuestionWidgetFactory,
            'EmailQuestion': EmailQuestionWidgetFactory,
            'PhoneQuestion': PhoneQuestionWidgetFactory,
            'TextItem': TextItemWidgetFactory,
            'ImageItem': ImageItemWidgetFactory
        };

        /* Public interface */
        self.create = create;

        function create(scope, element, item) {
            return widgetFactories[item.objectType].create(scope, element, item);
        }

        return self;
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.component.preview')
        .component('otusComment', {
            templateUrl: 'app/components/preview/comment/comment-template.html',
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
        .module('otus.component.preview')
        .component('metadataGroup', {
            templateUrl: 'app/components/preview/metadata/metadata-group-template.html',
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
        .module('otus.component.preview')
        .component('otusSurveyItem', {
            templateUrl: 'app/components/preview/survey-item/survey-item-template.html',
            controller: OtusSurveyItemController,
            bindings: {
                itemData: '<'
            }
        });

    // OtusSurveyItemController.$inject = ['AnswerFactory'];

    function OtusSurveyItemController() {
        var self = this;

        var filling = {};

        /* Public methods */
        self.isQuestion = isQuestion;
        self.isItem = isItem;
        self.restoreAll = restoreAll;
        self.confirmAnswer = confirmAnswer;
        self.update = update;

        self.$onInit = function() {
            // loadAnswer
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

        function confirmAnswer() {
            console.log(filling);
            // Service.fillQuestion(ID, _answer, meta);
            // self.itemData.answer = _answer;
        }

        function update(prop, value) {
            filling[prop] = value;
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('otus.component.editor')
        .directive('otusButton', directive);

    directive.$inject = ['OtusButtonWidgetFactory'];

    function directive(OtusButtonWidgetFactory) {
        var ddo = {
            scope: {
                click: '='
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
        .module('otus.component.editor')
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
        .module('otus.component.editor')
        .directive('otusInputText', otusInputText);

    otusInputText.$inject = ['OtusInputTextWidgetFactory'];

    function otusInputText(OtusInputTextWidgetFactory) {
        var ddo = {
            scope: {
                model: '=',
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
        .module('otus.component.editor')
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
        .module('otus.component.preview')
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
        .module('otus.component.editor')
        .directive('otusTextEditor', directive);

    directive.$inject = ['OtusTextEditorWidgetFactory'];

    function directive(OtusTextEditorWidgetFactory) {
        var ddo = {
            scope: {
                placeholder: '@',
                label: '=',
                ariaLabel: '@',
                leftIcon: '@',
                ngModel: '='
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
        .module('otus.component.editor')
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
        .module('otus.component.editor')
        .directive('otusMetadataGroup', otusMetadataGroup);

    otusMetadataGroup.$inject = [
        'MetadataGroupWidgetFactory'
    ];

    function otusMetadataGroup(MetadataGroupWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/metadata/group/metadata-group.html',
            link: function(scope, element) {
                scope.widget = MetadataGroupWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.component.editor')
        .factory('MetadataGroupWidgetFactory', MetadataGroupWidgetFactory);

    MetadataGroupWidgetFactory.$inject = [
        'MetadataOptionWidgetFactory',
        'AddMetadataAnswerEventFactory',
        'RemoveMetadataOptionEventFactory'
    ];

    function MetadataGroupWidgetFactory(MetadataOptionWidgetFactory, AddMetadataAnswerEventFactory, RemoveMetadataOptionEventFactory) {
        var self = this;

        /*Public interface*/
        self.create = create;

        function create(scope, element) {
            return new MetadataGroupWidget(scope, element, MetadataOptionWidgetFactory, AddMetadataAnswerEventFactory, RemoveMetadataOptionEventFactory);
        }

        return self;
    }

    function MetadataGroupWidget(scope, element, MetadataOptionWidgetFactory, AddMetadataAnswerEventFactory, RemoveMetadataOptionEventFactory) {
        var self = this;
        self.ngModel = scope.ngModel;
        self.options = [];


        /* Public methods */
        self.getClassName = getClassName;
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.addOption = addOption;
        self.removeLastOption = removeLastOption;

        _init();

        function _init() {
            if(self.getItem().metadata.options.length > 0) {
                _loadOptions();
            }
        }

        function getClassName() {
            return 'MetadataGroupWidget';
        }

        function getUUID() {
            return scope.uuid;
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

        function _loadOptions() {
            self.getItem().metadata.options.forEach(function(option){
                var optionWidget = MetadataOptionWidgetFactory.create(option, self);
                self.options.push(optionWidget);
            });
        }

        function addOption() {
            var newOption = AddMetadataAnswerEventFactory.create().execute(self);
            var optionWidget = MetadataOptionWidgetFactory.create(newOption, self);
            self.options.push(optionWidget);
        }

        function removeLastOption() {
            RemoveMetadataOptionEventFactory.create().execute(self);
            self.options.splice(-1);
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.component.editor')
        .factory('MetadataOptionWidgetFactory', MetadataOptionWidgetFactory);

    function MetadataOptionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(option, parentGroup) {
            return new MetadataAnswerOptionWidget(option, parentGroup);
        }

        return self;
    }

    function MetadataAnswerOptionWidget(option, parentGroup) {
        var self = this;

        self.name = 'MetadataAnswerOption';
        self.parentGroup = parentGroup;
        self.option = option;
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.component.editor')
        .directive('otusMiscItem', directive);

    directive.$inject = [
        'SurveyItemWidgetFactory',
        'SheetContentService'
    ];

    function directive(SurveyItemWidgetFactory, SheetContentService) {
        var ddo = {
            scope: {},
            templateUrl: 'app/editor/ui/survey-item/misc/misc.html',
            retrict: 'E',
            link: function linkFunc(scope, element) {
                scope.widget = SurveyItemWidgetFactory.create(scope, element, SheetContentService.lastLoadedQuestion);
            }
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.component.editor')
        .directive('otusQuestionItem', directive);

    directive.$inject = [
        'SurveyItemWidgetFactory',
        'SheetContentService'
    ];

    function directive(SurveyItemWidgetFactory, SheetContentService) {
        var ddo = {
            scope: {},
            templateUrl: 'app/editor/ui/survey-item/question/question.html',
            retrict: 'E',
            link: function linkFunc(scope, element) {
                scope.widget = SurveyItemWidgetFactory.create(scope, element, SheetContentService.lastLoadedQuestion);
            }
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.component.preview')
        .component('otusMiscItem', {
            templateUrl: 'app/components/preview/survey-item/misc/misc-item-template.html',
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
        .module('otus.component.preview')
        .component('otusQuestion', {
            templateUrl: 'app/components/preview/survey-item/question/question-component-template.html',
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
        .module('otus.component.editor')
        .directive('imageItem', imageItem);

    function imageItem(ImageItemWidgetFactory) {
        var ddo = {
            scope: {},
            templateUrl: 'app/editor/ui/survey-item/misc/image/image-item.html',
            retrict: 'E',
            link: function(scope, element) {
                scope.widget = scope.$parent.widget;
            }
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.component.editor')
        .factory('ImageItemWidgetFactory', ImageItemWidgetFactory);

    function ImageItemWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope) {
            return new ImageItemWidget(scope);
        }

        return self;
    }

    function ImageItemWidget(scope) {
        var self = this;

        self.name = 'ImageItem';
        self.getParent = getParent;
        self.item = getItem();
        self.getTemplate = getTemplate;

        function getParent() {
            return scope.$parent.widget;
        }

        function getItem() {
            return getParent().getItem();
        }

        function getTemplate() {
            return '<image-item></image-item>';
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.component.editor')
        .directive('otusCalendarQuestion', directive);

    function directive() {
        var ddo = {
            scope: {},
            templateUrl: 'app/editor/ui/survey-item/question/calendar/calendar-question.html',
            retrict: 'E'
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.component.editor')
        .factory('CalendarQuestionWidgetFactory', CalendarQuestionWidgetFactory);

    function CalendarQuestionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new CalendarQuestionWidget(scope, element);
        }

        return self;
    }

    function CalendarQuestionWidget(scope, element) {
        var self = this;

        /* Public methods */
        self.getClassName = getClassName;
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.getTemplate = getTemplate;

        function getClassName() {
            return 'CalendarQuestionWidget';
        }

        function getUUID() {
            return scope.uuid;
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

        function getTemplate() {
            return '<otus-calendar-question></otus-calendar-question>';
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.component.editor')
        .directive('textItem', textItem);

    textItem.$inject = ['TextItemWidgetFactory'];

    function textItem(TextItemWidgetFactory) {
        var ddo = {
            scope: {},
            templateUrl: 'app/editor/ui/survey-item/misc/text/text-item.html',
            retrict: 'E',
            link: function(scope, element) {
                scope.widget = scope.$parent.widget;
            }
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.component.editor')
        .factory('TextItemWidgetFactory', TextItemWidgetFactory);

    function TextItemWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope) {
            return new TextItemWidget(scope);
        }

        return self;
    }

    function TextItemWidget(scope) {
        var self = this;

        self.name = 'TextItem';
        self.getParent = getParent;
        self.item = getItem();
        self.getTemplate = getTemplate;

        function getParent() {
            return scope.$parent.widget;
        }

        function getItem() {
            return getParent().getItem();
        }

        function getTemplate() {
            return '<text-item></text-item>';
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.component.editor')
        .directive('otusCheckboxQuestion', otusCheckboxQuestion);

    otusCheckboxQuestion.$inject = [
        'CheckboxQuestionWidgetFactory'
    ];

    function otusCheckboxQuestion(CheckboxQuestionWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/survey-item/question/checkbox/checkbox-question.html',
            link: function(scope, element) {
                scope.widget = CheckboxQuestionWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.component.editor')
        .factory('CheckboxQuestionWidgetFactory', CheckboxQuestionWidgetFactory);

    CheckboxQuestionWidgetFactory.$inject = [
        'AnswerOptionWidgetFactory',
        'AddAnswerOptionEventFactory',
        'RemoveAnswerOptionEventFactory',
    ];

    function CheckboxQuestionWidgetFactory(AnswerOptionWidgetFactory, AddAnswerOptionEventFactory, RemoveAnswerOptionEventFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new CheckboxQuestionWidget(scope, element, AnswerOptionWidgetFactory, AddAnswerOptionEventFactory, RemoveAnswerOptionEventFactory);
        }

        return self;
    }

    function CheckboxQuestionWidget(scope, element, AnswerOptionWidgetFactory, AddAnswerOptionEventFactory, RemoveAnswerOptionEventFactory) {
        var self = this;

        self.options = [];

        /* Public methods */
        self.getClassName = getClassName;
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.getTemplate = getTemplate;
        self.addOption = addOption;
        self.removeLastOption = removeLastOption;

        _init();

        function _init() {
            if (self.getItem().options.length > 0) {
                _loadAnswerOptions();
            }
        }

        function getClassName() {
            return 'CheckboxQuestionWidget';
        }

        function getUUID() {
            return scope.uuid;
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

        function getTemplate() {
            return '<otus-checkbox-question></otus-checkbox-question>';
        }

        function addOption() {
            var newOption = AddAnswerOptionEventFactory.create().execute(self);
            var optionWidget = AnswerOptionWidgetFactory.create(newOption, self);
            self.options.push(optionWidget);
        }

        function _loadAnswerOptions() {
            self.getItem().options.forEach(function(awswerOption) {
                var optionWidget = AnswerOptionWidgetFactory.create(awswerOption, self);
                self.options.push(optionWidget);
            });
        }

        function removeLastOption() {
            RemoveAnswerOptionEventFactory.create().execute(self);
            self.options.splice(-1);
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.component.editor')
        .directive('otusDecimalQuestion', directive);

    directive.$inject = ['DecimalQuestionWidgetFactory'];

    function directive(DecimalQuestionWidgetFactory) {
        var ddo = {
            scope: {
                ngModel: '=',
                ariaLabel: '@'
            },
            templateUrl: 'app/editor/ui/survey-item/question/decimal/decimal-question.html',
            restrict: 'E',
            link: function(scope, element) {
                scope.widget = DecimalQuestionWidgetFactory.create(scope, element);
            }
        };
        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.component.editor')
        .factory('DecimalQuestionWidgetFactory', DecimalQuestionWidgetFactory);

    function DecimalQuestionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new DecimalQuestionWidget(scope, element);
        }

        return self;
    }

    function DecimalQuestionWidget(scope, element) {
        var self = this;

        /* Public methods */
        self.getClassName = getClassName;
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.getTemplate = getTemplate;

        function getClassName() {
            return 'DecimalQuestionWidget';
        }

        function getUUID() {
            return scope.uuid;
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

        function getTemplate() {
            return '<otus-decimal-question></otus-decimal-question>';
        }
    }

}());

(function() {
    'use strict';

    angular.module("otus.component.editor").directive("uiDecimal", function() {
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
                    var commaKey = (keycode === 188);
                    var dotKey = (keycode === 190);
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

                    return (minusKey || commaKey || dotKey || shiftKey || backspaceKey || homeKey || endKey || deleteKey || controlKey || leftKey || rightKey);
                }
            }
        };
    });
}());

(function() {
    'use strict';

    angular
        .module('otus.component.editor')
        .directive('otusEmailQuestion', directive);

    function directive() {
        var ddo = {
            scope: {},
            templateUrl: 'app/editor/ui/survey-item/question/email/email-question.html',
            retrict: 'E'
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.component.editor')
        .factory('EmailQuestionWidgetFactory', EmailQuestionWidgetFactory);

    function EmailQuestionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new EmailQuestionWidget(scope, element);
        }

        return self;
    }

    function EmailQuestionWidget(scope, element) {
        var self = this;

        /* Public methods */
        self.getClassName = getClassName;
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.getTemplate = getTemplate;

        function getClassName() {
            return 'EmailQuestionWidget';
        }

        function getUUID() {
            return scope.uuid;
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

        function getTemplate() {
            return '<otus-email-question></otus-email-question>';
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.component.editor')
        .directive('otusIntegerQuestion', directive);

    directive.$inject = ['IntegerQuestionWidgetFactory'];

    function directive(IntegerQuestionWidgetFactory) {
        var ddo = {
            scope: {
                ngModel: '=',
                ariaLabel: '@'
            },
            templateUrl: 'app/editor/ui/survey-item/question/integer/integer-question.html',
            restrict: 'E',
            link: function(scope, element) {
                scope.widget = IntegerQuestionWidgetFactory.create(scope, element);
            }
        };
        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.component.editor')
        .factory('IntegerQuestionWidgetFactory', IntegerQuestionWidgetFactory);

    function IntegerQuestionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new IntegerQuestionWidget(scope, element);
        }

        return self;
    }

    function IntegerQuestionWidget(scope, element) {
        var self = this;

        /* Public methods */
        self.getClassName = getClassName;
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.getTemplate = getTemplate;

        function getClassName() {
            return 'IntegerQuestionWidget';
        }

        function getUUID() {
            return scope.uuid;
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

        function getTemplate() {
            return '<otus-integer-question></otus-integer-question>';
        }
    }

}());

(function() {
    'use strict';

    angular.module("otus.component.editor").directive("uiInteger", function() {
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
        .module('otus.component.editor')
        .directive('otusPhoneQuestion', directive);

    function directive() {
        var ddo = {
            scope: {
                ngModel: '=',
                ariaLabel: '@'
            },
            templateUrl: 'app/editor/ui/survey-item/question/phone/phone-question.html',
            retrict: 'E'
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.component.editor')
        .factory('PhoneQuestionWidgetFactory', PhoneQuestionWidgetFactory);

    function PhoneQuestionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new PhoneQuestionWidget(scope, element);
        }

        return self;
    }

    function PhoneQuestionWidget(scope, element) {
        var self = this;

        /* Public methods */
        self.getClassName = getClassName;
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.getTemplate = getTemplate;

        function getClassName() {
            return 'PhoneQuestionWidget';
        }

        function getUUID() {
            return scope.uuid;
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

        function getTemplate() {
            return '<otus-phone-question></otus-phone-question>';
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.component.editor')
        .directive('otusTextQuestion', directive);

    function directive() {
        var ddo = {
            scope: {},
            templateUrl: 'app/editor/ui/survey-item/question/text/text-question.html',
            retrict: 'E'
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.component.editor')
        .factory('TextQuestionWidgetFactory', TextQuestionWidgetFactory);

    function TextQuestionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new TextQuestionWidget(scope, element);
        }

        return self;
    }

    function TextQuestionWidget(scope, element) {
        var self = this;

        /* Public methods */
        self.getClassName = getClassName;
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.getTemplate = getTemplate;

        function getClassName() {
            return 'TextQuestionWidget';
        }

        function getUUID() {
            return scope.uuid;
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

        function getTemplate() {
            return '<otus-text-question></otus-text-question>';
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.component.editor')
        .directive('otusTimeQuestion', directive);

    function directive() {
        var ddo = {
            scope: {},
            templateUrl: 'app/editor/ui/survey-item/question/time/time-question.html',
            retrict: 'E'
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.component.editor')
        .factory('TimeQuestionWidgetFactory', TimeQuestionWidgetFactory);

    function TimeQuestionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new TimeQuestionWidget(scope, element);
        }

        return self;
    }

    function TimeQuestionWidget(scope, element) {
        var self = this;

        /* Public methods */
        self.getClassName = getClassName;
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.getTemplate = getTemplate;

        function getClassName() {
            return 'TimeQuestionWidget';
        }

        function getUUID() {
            return scope.uuid;
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

        function getTemplate() {
            return '<otus-time-question></otus-time-question>';
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.component.preview')
        .component('otusImageItem', {
            templateUrl: 'app/components/preview/survey-item/misc/image/image-item-template.html',
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
        .module('otus.component.preview')
        .component('otusTextItem', {
            templateUrl: 'app/components/preview/survey-item/misc/text/text-item-template.html',
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
        .module('otus.component.preview')
        .component('otusCalendarQuestion', {
            templateUrl: 'app/components/preview/survey-item/question/calendar/calendar-question-template.html',
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
        .module('otus.component.preview')
        .component('otusCheckboxQuestion', {
            templateUrl: 'app/components/preview/survey-item/question/checkbox/checkbox-question-template.html',
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
        .module('otus.component.preview')
        .component('otusDecimalQuestion', {
            templateUrl: 'app/components/preview/survey-item/question/decimal/decimal-question-template.html',
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
        .module('otus.component.preview')
        .component('otusEmailQuestion', {
            templateUrl: 'app/components/preview/survey-item/question/email/email-question-template.html',
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
        .module('otus.component.preview')
        .component('otusIntegerQuestion', {
            templateUrl: 'app/components/preview/survey-item/question/integer/integer-question-template.html',
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

    angular.module('otus.component.preview').directive("uiInteger", function() {
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
        .module('otus.component.preview')
        .component('otusPhoneQuestion', {
            templateUrl: 'app/components/preview/survey-item/question/phone/phone-question-template.html',
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
        .module('otus.component.preview')
        .component('otusSingleSelectionQuestion', {
            templateUrl: 'app/components/preview/survey-item/question/single-selection/single-selection-question-template.html',
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
        .module('otus.component.preview')
        .component('otusTextQuestion', {
            templateUrl: 'app/components/preview/survey-item/question/text/text-question-template.html',
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
        .module('otus.component.preview')
        .component('otusTimeQuestion', {
            templateUrl: 'app/components/preview/survey-item/question/time/time-question-template.html',
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
        .module('otus.component.editor')
        .directive('otusSingleSelectionQuestion', directive);

    directive.$inject = [
        'SingleSelectionQuestionWidgetFactory'
    ];

    function directive(SingleSelectionQuestionWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/survey-item/question/single-selection/group/single-selection-question.html',
            link: function linkFunc(scope) {
                scope.widget = scope.$parent.widget;
            }
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.component.editor')
        .factory('SingleSelectionQuestionWidgetFactory', SingleSelectionQuestionWidgetFactory);

    SingleSelectionQuestionWidgetFactory.$inject = [
        'AnswerOptionWidgetFactory',
        'AddAnswerOptionEventFactory',
        'RemoveAnswerOptionEventFactory',
    ];

    function SingleSelectionQuestionWidgetFactory(AnswerOptionWidgetFactory, AddAnswerOptionEventFactory, RemoveAnswerOptionEventFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new SingleSelectionQuestionWidget(scope, element, AnswerOptionWidgetFactory, AddAnswerOptionEventFactory, RemoveAnswerOptionEventFactory);
        }

        return self;
    }

    function SingleSelectionQuestionWidget(scope, element, AnswerOptionWidgetFactory, AddAnswerOptionEventFactory, RemoveAnswerOptionEventFactory) {
        var self = this;

        self.options = [];

        /* Public methods */
        self.getClassName = getClassName;
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.getTemplate = getTemplate;
        self.addOption = addOption;
        self.removeLastOption = removeLastOption;

        _init();

        function _init() {
            if (self.getItem().options.length > 0) {
                _loadAnswerOptions();
            }
        }

        function getClassName() {
            return 'SingleSelectionQuestionWidget';
        }

        function getUUID() {
            return scope.uuid;
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

        function getTemplate() {
            return '<otus-single-selection-question></otus-single-selection-question>';
        }

        function addOption() {
            var newOption = AddAnswerOptionEventFactory.create().execute(self);
            var optionWidget = AnswerOptionWidgetFactory.create(newOption, self);
            self.options.push(optionWidget);
        }

        function _loadAnswerOptions() {
            self.getItem().options.forEach(function(awswerOption) {
                var optionWidget = AnswerOptionWidgetFactory.create(awswerOption, self);
                self.options.push(optionWidget);
            });
        }

        function removeLastOption() {
            RemoveAnswerOptionEventFactory.create().execute(self);
            self.options.splice(-1);
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.component.editor')
        .factory('AnswerOptionWidgetFactory', AnswerOptionWidgetFactory);

    function AnswerOptionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(option, parentGroup) {
            return new AnswerOptionWidget(option, parentGroup);
        }

        return self;
    }

    function AnswerOptionWidget(option, parentGroup) {
        var self = this;

        self.name = 'AnswerOption';
        self.parentGroup = parentGroup;
        self.option = option;
    }

}());
