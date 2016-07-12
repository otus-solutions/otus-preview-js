(function() {
    'use strict';

    angular
        .module('otus.preview.component')
        .component('otusComment', {
            templateUrl: 'app/components/preview/comment/comment-template.html',
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
