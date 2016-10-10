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

    OtusCommentController.$inject = [
        'otusjs.player.data.activity.CurrentItemService'
    ];

    function OtusCommentController(CurrentItemService) {
        var self = this;

        self.$onInit = function() {
          self.comment = CurrentItemService.getFilling().comment;
        };

        self.update = function() {
            self.onUpdate({
                valueType: 'comment',
                value: self.comment
            });
        };
    }

})();
