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
        'otusjs.player.core.CurrentQuestion'
    ];

    function OtusSurveyItemController($scope, $element, CurrentQuestion) {
        var self = this;

        /* Public methods */
        self.isQuestion = isQuestion;
        self.isItem = isItem;
        self.restoreAll = restoreAll;
        self.update = update;
        self.destroy = destroy;
        self.updateValidation = updateValidation;

        self.$onInit = function() {
            self.filling = {};
            self.filling.questionID = self.itemData.templateID;
            $scope.$parent.$ctrl.currentChild = self;
            CurrentQuestion.observerRegistry(self);
        };

        function updateValidation(answerMap) {
            self.$error = answerMap;
        }

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
            CurrentQuestion.setAnswer(self.filling.answer);
        }

        function destroy() {
            $element.remove();
            $scope.$destroy();
        }

        self.referenceAsDate = function(type) {
            var reference = CurrentQuestion.getFillingRules()[type].data.reference;
            var date = new Date(reference).toLocaleDateString();
            if (type === 'rangeDate'){
              date = {'initial':new Date(reference.initial).toLocaleDateString(), 'end': new Date(reference.end).toLocaleDateString()};
            }
            return date;
        };

        self.referenceAsTime = function(type) {
            var reference = CurrentQuestion.getFillingRules()[type].data.reference;
            return self.reference;
        };

        self.reference = function(type) {
            var reference = CurrentQuestion.getFillingRules()[type].data.reference;
            return reference;
        };

    }

})();
