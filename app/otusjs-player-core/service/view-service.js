(function() {
    'use strict';

    angular
        .module('otusjs.player.service')
        .service('ViewService', ViewService);

    function ViewService() {
        var self = this;

        var observers = [];

        self.addObserver = addObserver;
        self.update = update;

        function addObserver(o) {
            observers.push(o);
        }

        function update(data) {
            observers.forEach(function(o) {
                o.updateX(data);
            })
        }
    }

})();
