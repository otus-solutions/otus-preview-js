(function() {
    'use strict';

    angular
        .module('otus.preview')
        .service('UiItemPreviewService', UiItemPreviewService);

    function UiItemPreviewService() {
        var self = this;
        self.currentQuestionToLoad = {};
    }

}());
