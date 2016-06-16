(function() {
    'use strict';

    angular
        .module('otus.core.preview', ['otus.preview']);

}());

(function() {
    'use strict';

    angular
        .module('otus.preview', []);

}());

(function() {
    'use strict';

    angular
        .module('otus.core.preview')
        .service('CoreSheetContentPreviewService', CoreSheetContentPreviewService);

    CoreSheetContentPreviewService.$inject = [
        'CoreTemplateLoaderService'
    ];

    function CoreSheetContentPreviewService(CoreTemplateLoaderService) {
        var self = this;

        /* Public interface */
        self.startSheet = startSheet;

        function startSheet(scopeReference, elementReference, template) {
            CoreTemplateLoaderService.loadInitForJsonFile(scopeReference, elementReference, template);
        }
    }
}());

(function() {
    'use strict';

    angular
        .module('otus.core.preview')
        .factory('CoreTemplateContentService', CoreTemplateContentService);

    CoreTemplateContentService.$inject = [
        '$compile',
        '$templateRequest',
        '$templateCache',
        /* Itens */
        'CalendarQuestionTemplateFactory'
    ];

    function CoreTemplateContentService($compile, $templateRequest, $templateCache, CalendarQuestionTemplateFactory) {
        var self = this;
        var template = null;

        var templateFactories = {
            'CalendarQuestion': CalendarQuestionTemplateFactory
        };

        /* Public interface */
        self.create = create;

        function create(scope, element, item) {
            template = templateFactories[item.objectType].create(scope, element, item);
            loadItem(template, scope);
        }

        function loadItem(template, scope) {
            var templateCompiled = compileTemplate(template.getDirectiveTemplate(), scope);
            $('#survey-preview').append(templateCompiled);
        }

        function compileTemplate(html, scope) {
            return $compile(html)(scope);
        }

        return self;
    }

}());

(function() {
    'use strict';


    angular
        .module('otus.core.preview')
        .service('CoreTemplateLoaderService', CoreTemplateLoaderService);

    CoreTemplateLoaderService.$inject = [
        '$compile',
        '$templateRequest',
        '$templateCache',
        'CoreTemplateContentService'
    ];


    function CoreTemplateLoaderService($compile, $templateRequest, $templateCache, CoreTemplateContentService) {
        /*
         Json de exemplo:
         var data = '{"activityContainer":{"participant":{"recruitment_number":"123456"},"status":[{"objectType":"Status","name":"INITIALIZED","date":"25/03/1986","user":{"username":"diogo.rosas.ferreira@gmail.com"}}],"category":{"type":"Normal"}},"answerContainer":[{"objectType":"TextQuestion","questionID":"LUAA0","value":"Resposta","metadata":{"objectType":"MetadataGroup","value":""},"comment":""},{"objectType":"TextQuestion","questionID":"LUAA1","value":"Resposta para a questão ","metadata":{"objectType":"MetadataGroup","value":"Não sabe responder"},"comment":""}],"template":{"extents":"StudioObject","objectType":"Survey","oid":"dXNlclVVSUQ6W3VuZGVmaW5lZF1zdXJ2ZXlVVUlEOls2MTkzYTJmMC0xOTEyLTExZTYtYmY2Yi0zMWQ3YzFiZDU3YWFdcmVwb3NpdG9yeVVVSUQ6WyBOb3QgZG9uZSB5ZXQgXQ==","identity":{"extents":"StudioObject","objectType":"SurveyIdentity","name":"LUAA","acronym":"LUAA","recommendedTo":"","description":"","keywords":[]},"metainfo":{"extents":"StudioObject","objectType":"SurveyMetaInfo","creationDatetime":1463157792261,"otusStudioVersion":""},"questionContainer":[{"extents":"SurveyItem","objectType":"CalendarQuestion","templateID":"LUAA0","dataType":"LocalDate","label":{"ptBR":{"extends":"StudioObject","objectType":"Label","oid":"","plainText":"Qual é sua data de nascimento?","formattedText":"Qual é sua data de nascimento?"},"enUS":{"extends":"StudioObject","objectType":"Label","oid":"","plainText":"","formattedText":""},"esES":{"extends":"StudioObject","objectType":"Label","oid":"","plainText":"","formattedText":""}},"metadata":{"extents":"StudioObject","objectType":"MetadataGroup","options":[]}},{"extents":"SurveyItem","objectType":"CalendarQuestion","templateID":"LUAA1","dataType":"LocalDate","label":{"ptBR":{"extends":"StudioObject","objectType":"Label","oid":"","plainText":"Qual é sua data de nascimento?","formattedText":"Qual é sua data de nascimento?"},"enUS":{"extends":"StudioObject","objectType":"Label","oid":"","plainText":"","formattedText":""},"esES":{"extends":"StudioObject","objectType":"Label","oid":"","plainText":"","formattedText":""}},"metadata":{"extents":"StudioObject","objectType":"MetadataGroup","options":[]}}],"navigationList":[{"extents":"StudioObject","objectType":"Navigation","index":0,"origin":"LUAA0","routes":[]},{"extents":"StudioObject","objectType":"Navigation","index":1,"origin":"LUAA1","routes":[]}]}}';
         */
        var self = this;
        var scope = null;
        var element = null;
        var template = null;

        /* Public interface */
        self.loadInitForJsonFile = loadInitForJsonFile;

        function loadInitForJsonFile(scopeReference, elementReference, template) {
            scope = scopeReference;
            element = elementReference;
            template = template;
            buildItemTemplate(template);
        }

        /* Private */
        function buildItemTemplate(template) {
            if (template.itemContainer.length > 0) { // existem questões?
                var questions = template.itemContainer;
                for (var key in questions) {
                    CoreTemplateContentService.create(scope, element, questions[key]);
                }
            }
        }

    }
}());

(function() {
    'use strict';

    angular
        .module('otus.preview')
        .service('UiItemPreviewService', UiItemPreviewService);

    function UiItemPreviewService() {
        var self = this;
        self.currentQuestionToLoad = {};
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.preview')
        .directive('otusSheetPreview', otusSheetPreview);

    function otusSheetPreview() {
        var ddo = {
            scope: {},
            templateUrl: 'node_modules/otus-preview-js/app/ui-preview/sheet/sheet-preview-container.html',
            retrict: 'E'
        };
        return ddo;
    }
}());

(function() {
    'use strict';

    angular
        .module('otus.preview')
        .directive('imageItemPreview', imageItemPreview);

    function imageItemPreview() {
        var ddo = {
            scope: {},
            templateUrl: 'node_modules/otus-preview-js/app/ui-preview/item/image/image-item-preview.html',
            retrict: 'E'
        };
        return ddo;
    }
}());

(function() {
    'use strict';

    angular
        .module('otus.preview')
        .directive('textItemPreview', textItemPreview);

    function textItemPreview() {
        var ddo = {
            scope: {},
            templateUrl: 'node_modules/otus-preview-js/app/ui-preview/item/text/text-item-preview.html',
            retrict: 'E'
        };
        return ddo;
    }
}());

(function() {
    'use strict';

    angular
        .module('otus.preview')
        .directive('otusPreviewCalendarQuestion', directive);

    directive.inject = ['UiItemPreviewService'];

    function directive(UiItemPreviewService) {
        var ddo = {
            scope: {},
            link: function(scope) {
                scope.widget = UiItemPreviewService.currentQuestionToLoad;
            },
            templateUrl: 'node_modules/otus-preview-js/app/ui-preview/item/question/calendar/calendar-question-preview.html',
            retrict: 'E'
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.preview')
        .factory('CalendarQuestionTemplateFactory', CalendarQuestionTemplateFactory);

    CalendarQuestionTemplateFactory.$inject = [
        'UiItemPreviewService'
    ];

    function CalendarQuestionTemplateFactory(UiItemPreviewService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element, item) {
            UiItemPreviewService.currentQuestionToLoad = item;
            return new CalendarQuestionTemplate(scope, element, item);
        }
        return self;
    }

    function CalendarQuestionTemplate(scope, element, item) {
        var self = this;
        self.extents = item.extents;
        self.objectType = item.objectType;
        self.templateID = item.templateID;
        self.dataType = item.dataType;
        self.label = item.label.ptBR.formattedText;

        /* Public interface*/
        self.getClassName = getClassName;
        self.getScope = getScope;
        self.getExtents = getExtents;
        self.getObjectType = getObjectType;
        self.getTemplateID = getTemplateID;
        self.getformattedText = getformattedText;
        self.getDirectiveTemplate = getDirectiveTemplate;

        function getClassName() {
            return 'CalendarQuestionTemplate';
        }

        function getScope() {
            return scope.uuid;
        }

        function getExtents() {
            return self.extents;
        }

        function getObjectType() {
            return self.objectType;
        }

        function getTemplateID() {
            return self.templateID;
        }

        function getformattedText() {
            return self.label;
        }

        function getDirectiveTemplate() {
            return '<otus-preview-calendar-question></otus-preview-calendar-question>';
        }
    }
}());
