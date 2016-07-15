(function() {
    'use strict';

    angular
        .module('otusjs.player.service')
        .service('HtmlBuilderService', HtmlBuilderService);

    function HtmlBuilderService() {
        var self = this;

        self.generateTagName = generateTagName;

        function generateTagName(stringToFormat) {
            var chars = stringToFormat.split('');
            var tagName = '';

            chars.forEach(function(character, index) {
                var lowerChar = '';

                if (character === character.toUpperCase()) {
                    lowerChar = character.toLowerCase();
                    if (index !== 0) {
                        lowerChar = '-' + lowerChar;
                    }
                } else {
                    lowerChar = character;
                }

                tagName = tagName + lowerChar;
            });

            return tagName;
        }
    }

})();
