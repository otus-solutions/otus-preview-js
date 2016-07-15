(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusSurveyItem', {
            templateUrl: 'app/otusjs-player-component/survey-item/survey-item-template.html',
            controller: OtusSurveyItemController,
            require: {
                otusSheet: '^'
            },
            bindings: {
                itemData: '<'
            }
        });

    OtusSurveyItemController.$inject = ['DataService', '$scope', '$element'];

    function OtusSurveyItemController(DataService, $scope, $element) {
        var self = this;

        var filling = {};

        /* Public methods */
        self.isQuestion = isQuestion;
        self.isItem = isItem;
        self.restoreAll = restoreAll;
        self.previous = previous;
        self.next = next;
        self.update = update;

        self.$onInit = function() {
            self.showPrevious = self.otusSheet.hasPreviousItem();
            self.showNext = self.otusSheet.hasNextItem();
        };

        function isQuestion() {
            return (self.itemData.objectType === 'ImageItem') || (self.itemData.objectType === 'TextItem') ? false : true;
        }

        function isItem() {
            return (self.itemData.objectType === 'ImageItem') || (self.itemData.objectType === 'TextItem') ? true : false;
        }

        function restoreAll() {
            console.log(self.itemData);
        }

        function previous() {
            if (self.otusSheet.hasPreviousItem()) {
                self.otusSheet.previousItem();
                $element.remove();
                $scope.$destroy();
            }
        }

        function next() {
            if (self.otusSheet.hasNextItem()) {
                filling.questionID = self.itemData.templateID;
                DataService.transferData(filling);
                self.otusSheet.nextItem();
                $element.remove();
                $scope.$destroy();
            }
        }

        function update(prop, value) {
            filling[prop] = value;
        }
    }

})();
