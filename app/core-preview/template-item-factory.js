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
        var template = null;

        var templateFactories = {
            'CalendarQuestion': CalendarQuestionTemplateFactory
        };

        /* Public interface */
        self.create = create;

        function create(scope, element, item) {
            template = templateFactories[item.objectType].create(scope, element, item);
            console.log(template);
            loadItem(template, scope);
        }

        function loadItem(template, scope) {
            var templateCompiled = compileTemplate(template.getDirectiveTemplate(template.label), scope);
            $('#survey-preview').append(templateCompiled);
        }

        function compileTemplate(html, scope) {
            return $compile(html)(scope);
        }

        return self;
    }

}());
