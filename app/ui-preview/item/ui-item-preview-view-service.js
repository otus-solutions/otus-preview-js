(function() {
    'use strict';

    angular
        .module('otus.preview')
        .service('UiItemPreviewViewService', UiItemPreviewViewService);

    function UiItemPreviewViewService() {
        var self = this;
        self.currentQuestionToLoad = {};
        self.listMetadata = {};
    }

}());
