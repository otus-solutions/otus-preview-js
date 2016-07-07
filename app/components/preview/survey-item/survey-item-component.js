(function() {
    'use strict';

    angular
        .module('otus.preview.component')
        .component('otusSurveyItem', {
            template:
            `<md-card>
                <md-card-title>
                    <md-card-title-text layout="row">
                        <otus-label class="md-headline" item-label="$ctrl.itemData.templateID.concat('&nbsp;&nbsp;')"></otus-label>
                        <otus-label class="md-headline" item-label="$ctrl.itemData.label.ptBR.formattedText"></span>
                    </md-card-title-text>
                </md-card-title>

                <md-card-content layout="row" layout-align="space-between">
                    <otus-question ng-if="$ctrl.isQuestion()" on-update="$ctrl.update('answer', answer)" item-data="$ctrl.itemData" layout="column" flex="90"></otus-question>
                    <otus-misc-item ng-if="$ctrl.isItem()" item-data="$ctrl.itemData" layout="column" flex="90"></otus-misc-item>

                    <md-card-actions layout="column" flex="5" layout-align="center center">
                        <md-button class="md-icon-button" aria-label="Apagar resposta" ng-click="$ctrl.restoreAll()">
                            <md-icon md-svg-icon="eraser"></md-icon>
                        </md-button>
                        <md-button class="md-icon-button" aria-label="Confirmar resposta" ng-click="$ctrl.confirmAnswer()">
                            <md-icon md-svg-icon="check"></md-icon>
                        </md-button>
                    </md-card-actions>
                </md-card-content>
            </md-card>
            `,
            controller: OtusSurveyItemController,
            bindings: {
                itemData: '<'
            }
        });

    function OtusSurveyItemController() {
        var self = this;

        var _answer;

        /* Public methods */
        self.isQuestion = isQuestion;
        self.isItem = isItem;
        self.restoreAll = restoreAll;
        self.confirmAnswer = confirmAnswer;
        self.update = update;

        self.$onInit = function() {
            // loadAnswer
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

        function confirmAnswer() {
            // Service.fillQuestion(ID, _answer, meta);
            self.itemData.answer = _answer;
            console.log(self.itemData);
        }

        function update(prop, value) {
            _answer = value;
        }
    }

})();
