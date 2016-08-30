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
        'DataService',
        'otusjs.player.core.ValidateService',
        'otusjs.player.core.CurrentQuestion'
    ];

    function OtusSheetController($scope, $element, $compile, PlayerService, DataService, ValidateService, CurrentQuestion) {
        var self = this;

        var SURVEY_ITEM = '<otus-survey-item item-data="itemData" />';

        /* Public methods */
        self.$onInit = onInit;
        self.previousItem = previousItem;
        self.nextItem = nextItem;
        self.catchMouseWheel = catchMouseWheel;
        self.validationBlock = validationBlock;

        function onInit() {
            self.isLoading = true;
            PlayerService.play(self.surveyTemplate.itemContainer);
            nextItem();
        }

        function previousItem() {
            if (PlayerService.canWeGo('back')) {
              console.log(self.currentChild);
                if (self.currentChild) {
                    destroyCurrentItem();
                }
                loadItem(PlayerService.getPrevious());
                updateToolbar();
            }
        }

        function nextItem() {
            if (PlayerService.canWeGo('ahead')) {
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
            CurrentQuestion.setQuestion(item);
            console.log(item);
            ValidateService.applyValidation();
        }

        function updateToolbar() {
            self.isPreviousDisabled = !PlayerService.canWeGo('back');
            self.isNextDisabled = !PlayerService.canWeGo('ahead');
        }

        function transferData() {
            DataService.transferData(self.currentChild.filling);
        }

        function validationBlock() {
            //TODO trava next quando alguma validação não passar
            self.isNextDisabled = true;
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
