(function() {
    'use strict';

    angular
        .module('otusjs.player.core')
        .service('otusjs.player.core.PlayerService', PlayerService);

    PlayerService.$inject = [
        'otusjs.player.core.ItemManagerService',
        'otusjs.player.core.CurrentQuestion'
    ];

    function PlayerService(ItemManagerService, CurrentQuestion) {
        var self = this;

        self.play = play;
        self.getNext = getNext;
        self.getPrevious = getPrevious;
        self.hasNext = hasNext;
        self.hasPrevious = hasPrevious;
        self.canWeGo = canWeGo;

        function play(items) {
            ItemManagerService.init(items);
        }

        function getNext() {
            if (hasNext()) {
                return ItemManagerService.next();
            }
        }

        function getPrevious() {
            if (hasPrevious()) {
                return ItemManagerService.previous();
            }
        }

        function hasNext() {
            return ItemManagerService.hasNext();
        }

        function hasPrevious() {
            return ItemManagerService.hasPrevious();
        }

        function canWeGo(where) {
            CurrentQuestion.validateQuestion();
            var validationOk = !CurrentQuestion.getValidationError();
            var metadataOk = CurrentQuestion.metadataAcceptance();
            var validationFinal = (validationOk || metadataOk);
            var directions = {
                'ahead': function() {
                    var conditions = [
                        hasNext(),
                        validationFinal,


                    ];
                    return conditions.indexOf(false, conditions) === -1;
                },
                'back': function() {
                    var conditions = [
                        hasPrevious(),
                        validationFinal,


                    ];
                    return conditions.indexOf(false, conditions) === -1;
                }
            };
            return directions[where]();
        }


    }

})();
