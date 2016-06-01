(function() {
    'use strict';

    angular.module('otus.preview', []);

}());

(function() {
    'use strict';

    var data = '{"activityContainer":{"participant":{"recruitment_number":"123456"},"status":[{"objectType":"Status","name":"INITIALIZED","date":"25/03/1986","user":{"username":"diogo.rosas.ferreira@gmail.com"}}],"category":{"type":"Normal"}},"answerContainer":[{"objectType":"TextQuestion","questionID":"LUAA0","value":"Resposta","metadata":{"objectType":"MetadataGroup","value":""},"comment":""},{"objectType":"TextQuestion","questionID":"LUAA1","value":"","metadata":{"objectType":"MetadataGroup","value":"Não sabe responder"},"comment":""}],"template":{"extents":"StudioObject","objectType":"Survey","oid":"dXNlclVVSUQ6W3VuZGVmaW5lZF1zdXJ2ZXlVVUlEOls2MTkzYTJmMC0xOTEyLTExZTYtYmY2Yi0zMWQ3YzFiZDU3YWFdcmVwb3NpdG9yeVVVSUQ6WyBOb3QgZG9uZSB5ZXQgXQ==","identity":{"extents":"StudioObject","objectType":"SurveyIdentity","name":"LUAA","acronym":"LUAA","recommendedTo":"","description":"","keywords":[]},"metainfo":{"extents":"StudioObject","objectType":"SurveyMetaInfo","creationDatetime":1463157792261,"otusStudioVersion":""},"questionContainer":{"LUAA0":{"extents":"Question","objectType":"TextQuestion","templateID":"LUAA0","dataType":"String","label":{"ptBR":{"extends":"StudioObject","objectType":"Label","oid":"","plainText":"Qual é o seu nome completo?","formattedText":"Qual é o seu nome completo?"},"enUS":{"extends":"StudioObject","objectType":"Label","oid":"","plainText":"","formattedText":""},"esES":{"extends":"StudioObject","objectType":"Label","oid":"","plainText":"","formattedText":""}},"metadata":{"extents":"StudioObject","objectType":"MetadataGroup","option":[]}},"LUAA1":{"extents":"Question","objectType":"TextQuestion","templateID":"LUAA1","dataType":"String","label":{"ptBR":{"extends":"StudioObject","objectType":"Label","oid":"","plainText":"Qual sua cor de pele?","formattedText":"Qual sua cor de pele?"},"enUS":{"extends":"StudioObject","objectType":"Label","oid":"","plainText":"","formattedText":""},"esES":{"extends":"StudioObject","objectType":"Label","oid":"","plainText":"","formattedText":""}},"metadata":{"extents":"StudioObject","objectType":"MetadataGroup","option":[]}}},"navigationList":[{"extents":"StudioObject","objectType":"Navigation","index":0,"origin":"LUAA0","routes":[]},{"extents":"StudioObject","objectType":"Navigation","index":1,"origin":"LUAA1","routes":[]}]}}';

    angular
        .module('otus.preview')
        .directive('otusItemContainerPreview', otusItemContainerPreview);

    function otusItemContainerPreview() {
        var ddo = {
            scope: {},
            templateUrl: 'node_modules/otus-preview-js/app/preview/item-container/item-container-preview.html',
            retrict: 'E'
        };
        read();
        return ddo;
    }

    function read() {
      var json = JSON.parse(data);
      console.log(json.activityContainer);
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
            templateUrl: 'node_modules/otus-preview-js/app/preview/sheet/sheet-preview-container.html',
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
            templateUrl: 'node_modules/otus-preview-js/app/preview/item/image/image-item-preview.html',
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
            templateUrl: 'node_modules/otus-preview-js/app/preview/item/question/calendar/calendar-question-preview.html',
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
            templateUrl: 'node_modules/otus-preview-js/app/preview/item/text/text-item-preview.html',
            retrict: 'E'
        };
        return ddo;
    }
}());
