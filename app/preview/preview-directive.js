(function() {
    'use strict';

    angular
        .module('otus.preview')
        .directive('otusSurveyPreview', otusSurveyPreview);

    function otusSurveyPreview() {
        var ddo = {
            scope: {},
            templateUrl: 'node_modules/otus-preview-js/app/preview/preview-container-template.html',
            retrict: 'E'
        };
        return ddo;
    }
}());
