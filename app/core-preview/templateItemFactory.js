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
