(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusSheet', {
            templateUrl: 'app/otusjs-player-component/sheet/sheet-template.html',
            controller: OtusSheetController,
            bindings: {
                surveyTemplate: '<'
            }
        });

    OtusSheetController.$inject = [
        '$scope',
        '$element',
        '$compile',
        'otusjs.player.core.PlayerService',
        'DataService'
    ];

    function OtusSheetController($scope, $element, $compile, PlayerService, DataService) {
        var self = this;

        var SURVEY_ITEM = '<otus-survey-item item-data="itemData" />';

        /* Public methods */
        self.$onInit = onInit;
        self.$onDestroy = onDestroy;
        self.previousItem = previousItem;
        self.nextItem = nextItem;
        self.catchMouseWheel = catchMouseWheel;

        function onInit() {
            self.isLoading = true;
            PlayerService.play(self.surveyTemplate.itemContainer);
            nextItem();
        }

        function onDestroy() {
            _clearWorspace();
        }

        function previousItem() {
            if (PlayerService.hasPrevious()) {
                if (self.currentChild) {
                    destroyCurrentItem();
                }
                loadItem(PlayerService.getPrevious());
                updateToolbar();
            }
        }

        function nextItem() {
            if (PlayerService.hasNext()) {
                if (self.currentChild) {
                    transferData();
                    destroyCurrentItem();
                }
                loadItem(PlayerService.getNext());
                updateToolbar();
            }
        }

        function loadItem(item) {
            $scope.itemData = item;
            $element.find('section').prepend($compile(SURVEY_ITEM)($scope));
        }

        function updateToolbar() {
            self.isPreviousDisabled = !PlayerService.hasPrevious();
            self.isNextDisabled = !PlayerService.hasNext();
        }

        function transferData() {
            DataService.transferData(self.currentChild.filling);
        }

        function destroyCurrentItem() {
            self.currentChild.destroy();
        }

        function catchMouseWheel($event) {
            if (event.deltaY > 0) {
                nextItem();
            } else {
                previousItem();
            }
        }
    }

}());