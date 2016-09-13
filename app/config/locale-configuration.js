(function() {

    angular
        .module('otusjs.player.config')
        .config(['$mdDateLocaleProvider', localeConfiguration]);

    function localeConfiguration($mdDateLocaleProvider) {

        $mdDateLocaleProvider.formatDate = function(date) {
            if (!date) {
                return '';
            }
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();

            return day + '/' + (monthIndex + 1) + '/' + year;
        };

        $mdDateLocaleProvider.parseDate = function(dateString) {
          console.log('oia');
            // var m = new Date(dateString);
            // m.split('/');
            // return m;
        };


    }

}());
