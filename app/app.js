(function() {
    'use strict';

    angular
        .module('otusjs.player.standalone', [
            /* External dependencies */
            'ngMaterial',
            'ngMessages',
            'ngAnimate',
            'ui.router',
            'monospaced.mousewheel',
            /* Exportable dependencies */
            'otusjs.player.core',
            'otusjs.player.component',
            /* Standalone dependencies */
            'otusjs.player.config',
            'otusjs.player.data',
            'otusjs.player.viewer',
            'otusjs',
        ]);

}());
