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
