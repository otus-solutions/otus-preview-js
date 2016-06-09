(function() {
    'use strict';

    angular
        .module('otus.core.preview')
        .factory('TemplateItemFactory', TemplateItemFactory);

    TemplateItemFactory.$inject = [
        /* Question items */

        '$compile',
        '$templateRequest',
        '$templateCache',
        'CalendarQuestionTemplateFactory'
    ];

    function TemplateItemFactory($compile, $templateRequest, $templateCache, CalendarQuestionTemplateFactory) {
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
        }

        function loadItem(question, scope) {
            var templateCompiled = compileTemplate(question.getTemplate(), scope);
            $('#survey-preview').append(templateCompiled);

        }

        function compileTemplate(html, scope) {
            return $compile(html)(scope);
        }

        return self;
    }

}());
