(function() {
    'use strict';

    angular
        .module('otus.component.editor')
        .directive('otusPhoneQuestion', directive);

    function directive() {
        var ddo = {
            scope: {
                ngModel: '=',
                ariaLabel: '@'
            },
            templateUrl: 'app/editor/ui/survey-item/question/phone/phone-question.html',
            retrict: 'E'
        };

        return ddo;
    }

}());