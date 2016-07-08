(function() {
    'use strict';

    angular
        .module('otus.component.editor')
        .directive('otusTextQuestion', directive);

    function directive() {
        var ddo = {
            scope: {},
            templateUrl: 'app/editor/ui/survey-item/question/text/text-question.html',
            retrict: 'E'
        };

        return ddo;
    }

}());
