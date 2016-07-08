(function() {
    'use strict';

    angular
        .module('otus.component.editor')
        .factory('AnswerOptionWidgetFactory', AnswerOptionWidgetFactory);

    function AnswerOptionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(option, parentGroup) {
            return new AnswerOptionWidget(option, parentGroup);
        }

        return self;
    }

    function AnswerOptionWidget(option, parentGroup) {
        var self = this;

        self.name = 'AnswerOption';
        self.parentGroup = parentGroup;
        self.option = option;
    }

}());
