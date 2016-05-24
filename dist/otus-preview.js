(function() {
    'use strict';

    angular.module('otus.preview', []);

}());

(function() {
    'use strict';

    angular
        .module('otus.preview')
        .directive('otusItemContainerPreview', otusItemContainerPreview);

    function otusItemContainerPreview() {
        var ddo = {
            scope: {},
            templateUrl: 'node_modules/otus-preview-js/app/preview/item-container/item-container-preview.html',
            retrict: 'E'
        };
        return ddo;
    }
}());

(function() {
    'use strict';

    angular
        .module('otus.preview')
        .directive('otusSheetPreview', otusSheetPreview);

    function otusSheetPreview() {
        var ddo = {
            scope: {},
            templateUrl: 'node_modules/otus-preview-js/app/preview/sheet/sheet-preview-container.html',
            retrict: 'E'
        };
        return ddo;
    }
}());

(function() {
    'use strict';

    angular
        .module('otus.preview')
        .directive('imageItemPreview', imageItemPreview);

    function imageItemPreview() {
        var ddo = {
            scope: {},
            templateUrl: 'node_modules/otus-preview-js/app/preview/item/image/image-item-preview.html',
            retrict: 'E'
        };
        return ddo;
    }
}());

(function() {
    'use strict';

    angular
        .module('otus.preview')
        .directive('questionPreview', calendarQuestionPreview);

    function calendarQuestionPreview() {
        var ddo = {
            scope: {},
            templateUrl: 'node_modules/otus-preview-js/app/preview/item/question/calendar/calendar-question-preview.html',
            retrict: 'E'
        };
        return ddo;
    }
}());

(function() {
    'use strict';

    angular
        .module('otus.preview')
        .directive('textItemPreview', textItemPreview);

    function textItemPreview() {
        var ddo = {
            scope: {},
            templateUrl: 'node_modules/otus-preview-js/app/preview/item/text/text-item-preview.html',
            retrict: 'E'
        };
        return ddo;
    }
}());
