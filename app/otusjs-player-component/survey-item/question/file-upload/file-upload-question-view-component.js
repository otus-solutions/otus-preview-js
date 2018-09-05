(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusFileUploadQuestionView', {
      templateUrl: 'app/otusjs-player-component/survey-item/question/file-upload/file-upload-question-template.html',
      controller: "otusFileUploadQuestionViewCtrl as $ctrl",
      bindings: {
        itemData: '<'
      }
    }).controller("otusFileUploadQuestionViewCtrl", Controller);

  Controller.$inject = [
    'otusjs.player.data.activity.CurrentItemService',
    'otusjs.utils.FileUploadFactory',
    '$scope',
    'otusjs.surveyItem.customAnswer.FileUploadAnswerFactory',
  ];

  function Controller(CurrentItemService, FileUploadService, $scope, FileUploadAnswerFactory) {
    var self = this;

    var _uploadInterface;
    var _pendingArrayControl;


    /* Public Interface */
    self.$onInit = onInit;
    self.downloadFile = downloadFile;

    function onInit() {
      self.view = true;
      var answerFiles = self.itemData.data.answer.value || [];
      self.sentFiles = FileUploadAnswerFactory.buildFromJson(answerFiles);
      self.pendingList = [];
      self.promise = 0;

      self.uploadConfig = {
        callback: _populatePendingList,
        type: 'any',
        multiple: true
      };
      _uploadInterface = FileUploadService.getUploadInterface();
      _pendingArrayControl = 0;
      self.pendingCounter = 0;
    }

    function downloadFile(idx) {
      var fileInfo = self.sentFiles[idx];
      _uploadInterface.getFile(fileInfo)
        .then(function(responseBlob) {
          var link = document.createElement('a');
          var downloadUrl = URL.createObjectURL(responseBlob);
          link.setAttribute('href', downloadUrl);
          link.download = responseBlob.name;
          document.body.appendChild(link);
          link.click();
        });
    }

    function _populatePendingList(filesArray) {
      self.pendingList = self.pendingList.concat(filesArray.map(function(file) {
        file.status = 'pending';
        file.control = _pendingArrayControl++;
        return file;
      }));
      _updateView();
    }

    function _updateView() {
      var phase = $scope.$root.$$phase;
      if (phase == '$apply' || phase == '$digest') {
        return;
      } else {
        $scope.$apply();
      }
    }

  }
}());
