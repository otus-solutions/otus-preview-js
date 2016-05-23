(function() {
    'use strict';

    angular.module('otus.preview', []);

}());

(function() {
    'use strict';

    angular
        .module('otus.preview')
        .directive('otusItemPreview', otusItemPreview);

    function otusItemPreview() {
        var ddo = {
            scope: {},
            templateUrl: 'node_modules/otus-preview-js/app/preview/container-item/preview-container-item.html',
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
            templateUrl: 'node_modules/otus-preview-js/app/preview/container-sheet/preview-container-sheet.html',
            retrict: 'E'
        };
        return ddo;
    }
}());

(function() {
    'use strict';

    angular
        .module('otus.preview')
        .service('TemplateLoaderService', TemplateLoaderService);

    TemplateLoaderService.$inject = [
        '$compile',
        '$templateRequest',
        '$templateCache'
    ];

    function TemplateLoaderService($compile, $templateRequest, $templateCache) {
        var self = this;

        /* Public interface */
        self.load = load;
        self.loadDirective = loadDirective;

        function load(templateUrl, scope, callback) {
            $templateRequest(templateUrl).then(function(html) {
                var compiledTemplate = compileTemplate(html, scope);
                if (callback) callback(compiledTemplate);
            });
        }

        function loadDirective(html, scope) {
            return $compile(html)(scope);
        }

    }

}());
