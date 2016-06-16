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
