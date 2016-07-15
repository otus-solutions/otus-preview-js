(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusComment', {
            templateUrl: 'app/otusjs-player-component/comment/comment-template.html',
            controller: OtusCommentController,
            bindings: {
                itemData : '<',
                onUpdate: '&'
            }
        });

    function OtusCommentController() {
        var self = this;

        self.update = function() {
            self.onUpdate({
                valueType: 'comment',
                value: self.comment
            });
        };
    }

})();
