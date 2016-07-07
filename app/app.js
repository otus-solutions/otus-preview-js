(function() {
    'use strict';

    angular
        .module('otus.preview', [
            'otus.allPurpose.component',
            'otus.editor.component',
            'otus.preview.component',
            'ngMaterial',
            'ui.router',
            'angular-bind-html-compile'
        ]);

}());
