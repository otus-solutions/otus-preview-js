(function() {
    'use strict';

    angular
        .module('otus.preview')
        .controller('Controller', ['$scope', function($scope) {
            $scope.customer = {
                name: 'Naomi',
                address: '1600 Amphitheatre'
            };
        }])
        .directive('otusPreviewCalendarQuestion', directive);

    function directive() {
        var ddo = {
            scope: {
                label: '@'
            },
            link: function($scope, $elem, $attr) {
                var label = $attr.label;
                //console.log(id, title);
                $attr.$observe('label', function(value) {
                    console.log(value);
                });

            },
            templateUrl: 'node_modules/otus-preview-js/app/ui-preview/item/question/calendar/calendar-question-preview.html',
            retrict: 'E'
        };

        return ddo;
    }

}());
