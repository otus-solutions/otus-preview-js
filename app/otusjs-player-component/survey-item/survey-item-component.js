(function() {
    'use strict';

    angular
        .module('otusjs.player.component')
        .component('otusSurveyItem', {
            templateUrl: 'app/otusjs-player-component/survey-item/survey-item-template.html',
            controller: OtusSurveyItemController,
            bindings: {
                itemData: '<'
            }
        });

    OtusSurveyItemController.$inject = [
        '$scope',
        '$element',
        'otusjs.player.core.CurrentQuestion',
    ];

    function OtusSurveyItemController($scope, $element, CurrentQuestion) {
        var self = this;

        /* Public methods */
        self.isQuestion = isQuestion;
        self.isItem = isItem;
        self.restoreAll = restoreAll;
        self.update = update;
        self.destroy = destroy;
        self.applyValidator = applyValidator;

        self.$onInit = function() {
            self.filling = {};
            self.filling.questionID = self.itemData.templateID;
            $scope.$parent.$ctrl.currentChild = self;
            self.teste = 'teste';
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

        function update(prop, value) {
            self.filling[prop] = value;
            CurrentQuestion.setAnswer(self.filling);
            console.log(CurrentQuestion);
            applyValidator();
        }

        function destroy() {
            $element.remove();
            $scope.$destroy();
        }

        function applyValidator() {
            self.$error = CurrentQuestion.validations;

            console.log(CurrentQuestion.validations);
            console.dir(self.$error);
            console.log(CurrentQuestion.getFillingRules()['pastDate'].data.reference);
            // console.log(self.$error);
        }

        self.reference = function(type) {
            return CurrentQuestion.getFillingRules()[type].data.reference;
        }

    }

})();
