(function() {
    'use strict';

    angular
        .module('otus.preview', [
            /* External modules */
            'ui.router',
            'ngMaterial',
            'angular-bind-html-compile',
            /* Otus model module */
            'otusjs',
            /* Components modules */
            'otus.component.allPurpose',
            'otus.component.editor',
            'otus.component.preview'
        ]);

}());
