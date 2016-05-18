(function() {
    'use strict';

    angular
        .module('preview')
        .directive('surveyPreviewGenerator', surveyPreviewGenerator);

    function surveyPreviewGenerator() {
        var ddo = {
            scope: {},
            templateUrl: 'app/preview/preview-container-template.html',
            retrict: 'E',
            template: 'preview-container-template.html',
        };
        return ddo;
    }
}());
