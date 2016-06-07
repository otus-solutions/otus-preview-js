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
