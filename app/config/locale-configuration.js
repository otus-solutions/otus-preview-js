(function() {

    angular
        .module('otusjs.player.config')
        .config(['$mdDateLocaleProvider', localeConfiguration]);

    function localeConfiguration($mdDateLocaleProvider) {

        $mdDateLocaleProvider.formatDate = function(date) {
            if (Object.prototype.toString.call(date) !== '[object Date]') {
                return null;
            }
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();

            return day + '/' + (monthIndex + 1) + '/' + year;
        };
    }

}());
