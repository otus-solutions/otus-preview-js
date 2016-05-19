(function() {
    'use strict';

    angular
        .module('otus.preview')
        .directive('otusSurveyPreview', otusSurveyPreview);

    function otusSurveyPreview() {
        var ddo = {
            scope: {},
            template: 'preview-container-template.html',
            retrict: 'E'
        };
        return ddo;
    }
}());
