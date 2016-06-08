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

/**
  A sheet precisa saber o que ira ser carregado nela, edição ou uma survey preview (nesse ponto aqui, ela já deve saber..)
  A responsibilidade aqui é iniciar e chamar quem irá ler e fabricar as questões
**/
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

/**
  CoreTemplateLoaderService tem como objetivo ler o json e o guardar em um objeto acessivel
**/
(function() {
    'use strict';


    angular
        .module('otus.core.preview')
        .service('CoreTemplateLoaderService', CoreTemplateLoaderService);

    CoreTemplateLoaderService.$inject = [
        '$compile',
        '$templateRequest',
        '$templateCache',
        'TemplateItemFactory'
    ];


    function CoreTemplateLoaderService($compile, $templateRequest, $templateCache, TemplateItemFactory) {
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
            buildItemTemplate();
        }

        /* Private */
        function buildItemTemplate() {
            var object = template.itemContainer;
            console.log(template.itemContainer);
            if (object.length > 0) {
                for (var key in object) {
                    var item = object[key];
                    TemplateItemFactory.create(scope, element, item);
                }
            }
        }

    }
}());

(function() {
    'use strict';

    angular
        .module('otus.core.preview')
        .factory('TemplateItemFactory', TemplateItemFactory);

    TemplateItemFactory.$inject = [
        'CalendarQuestionTemplateFactory'
    ];

    function TemplateItemFactory(CalendarQuestionTemplateFactory) {
        var self = this;
        var itemFactories = {
            'CalendarQuestion': CalendarQuestionTemplateFactory
        };

        /* Public interface */
        self.create = create;

        function create(scope, element, item) {
            return itemFactories[item.objectType].create(scope, element, item);
        }

        function loadItem(item) {
            if (item.objectType === "CalendarQuestion") {
                var templateCompiled = compileTemplate('<question-preview></question-preview>', scope);
                $('#survey-preview').append(templateCompiled);
            }
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
        .module('otus.preview')
        .directive('otusItemContainerPreview', otusItemContainerPreview);

    function otusItemContainerPreview() {
        var ddo = {
            scope: {},
            templateUrl: 'node_modules/otus-preview-js/app/ui-preview/item-container/item-container-preview.html',
            retrict: 'E'
        };
        return ddo;
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
        .directive('questionPreview', calendarQuestionPreview);

    function calendarQuestionPreview() {
        var ddo = {
            scope: {},
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
        .factory('CalendarQuestionTemplateFactory', CalendarQuestionTemplateFactory);

    function CalendarQuestionTemplateFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new CalendarQuestionTemplate(scope, element, item);
        }

        return self;
    }

    function CalendarQuestionTemplate(scope, element, item) {
        selft.extents = item.extents;
        selft.objectType = item.objectType;
        selft.templateID = item.templateID;
        selft.dataType = item.dataType;
        selft.label = item.label.plainText;

        console.log(selft.label);

        // TODO: atribuir o restante dos atributos
    }


}());
