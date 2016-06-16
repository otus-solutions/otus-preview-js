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
