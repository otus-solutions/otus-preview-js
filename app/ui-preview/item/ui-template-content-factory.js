(function() {
    'use strict';

    angular
        .module('otus.core.preview')
        .factory('UiTemplateContentFactory', UiTemplateContentFactory);

    UiTemplateContentFactory.$inject = [
        '$compile',
        '$templateRequest',
        '$templateCache',
        /* Itens */
        'CalendarQuestionTemplateFactory'
    ];

    function UiTemplateContentFactory($compile, $templateRequest, $templateCache, CalendarQuestionTemplateFactory) {
        var self = this;
        var question = null;

        var templateFactories = {
            'CalendarQuestion': CalendarQuestionTemplateFactory
        };

        /* Public interface */
        self.create = create;

        function create(scope, element, item) {
            question = templateFactories[item.objectType].create(scope, element, item);
            loadItem(question, scope);
            return question;
        }

        function loadItem(question, scope) {
            var questionCompiled = compileTemplate(question.getDirectiveTemplate(), scope);
            $('#survey-preview').append(questionCompiled);
        }

        function compileTemplate(html, scope) {
            return $compile(html)(scope);
        }

        return self;
    }

}());
