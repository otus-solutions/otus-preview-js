(function() {
    'use strict';

    angular
        .module('otus.component.editor')
        .directive('otusTimeQuestion', directive);

    function directive() {
        var ddo = {
            scope: {},
            templateUrl: 'app/editor/ui/survey-item/question/time/time-question.html',
            retrict: 'E'
        };

        return ddo;
    }

}());