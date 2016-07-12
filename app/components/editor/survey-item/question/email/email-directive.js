(function() {
    'use strict';

    angular
        .module('otus.component.editor')
        .directive('otusEmailQuestion', directive);

    function directive() {
        var ddo = {
            scope: {},
            templateUrl: 'app/editor/ui/survey-item/question/email/email-question.html',
            retrict: 'E'
        };

        return ddo;
    }

}());