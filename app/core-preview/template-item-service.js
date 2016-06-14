(function() {
    'use strict';

    angular
        .module('otus.core.preview')
        .factory('TemplateItemService', TemplateItemService);

    TemplateItemService.$inject = [
        '$compile',
        '$templateRequest',
        '$templateCache',
        'UiItemPreviewService',
        /* Itens */
        'CalendarQuestionTemplateFactory'
    ];

    function TemplateItemService($compile, $templateRequest, $templateCache, UiItemPreviewService, CalendarQuestionTemplateFactory) {
        var self = this;
        var template = null;

        var templateFactories = {
            'CalendarQuestion': CalendarQuestionTemplateFactory
        };

        /* Public interface */
        self.create = create;

        function create(scope, element, item) {
            template = templateFactories[item.objectType].create(scope, element, item);
            UiItemPreviewService.currentQuestionToLoad = item;
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
