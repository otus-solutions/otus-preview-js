(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusFileUploadQuestion', {
      templateUrl: 'app/otusjs-player-component/survey-item/question/file-upload/file-upload-question-template.html',
      controller: "otusFileUploadQuestionCtrl as $ctrl",
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    }).controller("otusFileUploadQuestionCtrl", Controller);

  Controller.$inject = [
    '$mdToast',
    '$q',
    '$mdDialog',
    'otusjs.player.data.activity.CurrentItemService',
    'otusjs.utils.FileUploadFactory',
    '$scope',
    'otusjs.surveyItem.customAnswer.FileUploadAnswerFactory',
  ];

  function Controller($mdToast, $q, $mdDialog, CurrentItemService, FileUploadService, $scope, FileUploadAnswerFactory) {
    var self = this;

    var _uploadInterface;
    var _questionID;
    var _pendingArrayControl;
    var _deleteDialog;
    var _deleteError;

    /* Public Interface */
    self.$onInit = onInit;
    self.popFromPending = popFromPending;
    self.uploadFile = uploadFile;
    self.uploadMultiple = uploadMultiple;
    self.downloadFile = downloadFile;
    self.deleteFile = deleteFile;
    self.clear = clear;
    self.cancelUpload = cancelUpload;
    self.view = false;

    function onInit() {
      var answerFiles = CurrentItemService.getFilling(self.itemData.templateID).answer.value || [];
      self.sentFiles = FileUploadAnswerFactory.buildFromJson(answerFiles);
      self.pendingList = [];
      self.promise = 0;
      self.uploadConfig = {
        callback: _populatePendingList,
        type: 'any',
        multiple: true
      };
      self.otusQuestion.answer = self;

      _uploadInterface = FileUploadService.getUploadInterface();
      _questionID = CurrentItemService.getItems().templateID;
      _deleteDialog = _createDeleteDialog();
      _pendingArrayControl = 0;
      self.pendingCounter = 0;
    }


    function popFromPending(idx) {
      return self.pendingList.splice(idx, 1);
    }

    function cancelUpload(controlIndex) {
      _uploadInterface.cancelRequest(controlIndex);
      _updateView();
    }

    function uploadMultiple() {
      for (var i = 0; i < self.pendingList.length; i++) {
        uploadFile(i);
      }
    }

    function uploadFile(idx) {
      var file = self.pendingList[idx];
      file.status = 'uploading';

      self.pendingCounter++;

      _uploadInterface.uploadFile(file, _questionID)
      .then(function(response) {
        var _oid = response.data.data;
        self.pendingCounter--;
        var fileInfo = _removeFile(file);
        fileInfo.oid = _oid;
        self.sentFiles.push(FileUploadAnswerFactory.buildAnswer(fileInfo));
        _updateView();
        _updateAnswer();
      }, function(err) {
        _toastError('enviar');
        file.status = 'pending';
        self.pendingCounter--;
      });
    }

    function _removeFile(file) {
      var idx = self.pendingList.indexOf(file);
      return self.pendingList.splice(idx, 1)[0];
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
        }, function(err) {
          _toastError('transferir');
        });
    }

    function deleteFile(idx) {
      var file = self.sentFiles[idx];
      _showConfirm(event).then(function() {
        _uploadInterface.deleteFile(file.oid)
          .then(function(response) {
            self.sentFiles.splice(idx, 1);
            _updateAnswer();
          }, function(err) {
            _toastError('excluir');
          });
      }, function() {});
    }

    var _toastLocker = {
      enviar: false,
      transferir: false,
      excluir: false
   };

    function _toastError(action) {
      if (!_toastLocker[action]) {
        _toastLocker[action] = true;
        var toast = $mdToast.show($mdToast.simple()
          .textContent('Erro ao ' + action + ' um ou mais arquivos!')
          .hideDelay(3000));
        toast.then(function(log) {
          _toastLocker[action] = false;
        });
      }
    }

    function _showConfirm() {
      return $mdDialog.show(_deleteDialog);
    }

    function _createDeleteDialog() {
      return $mdDialog.confirm()
        .title('Exclusão de Arquivo')
        .textContent('O arquivo será excluído permanentemente da base de dados.')
        .ariaLabel('Confirmar exclusão')
        .ok('Excluir Arquivo')
        .cancel('Cancelar');
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

    function _updateAnswer() {
      if (self.sentFiles.length) {
        self.onUpdate({
          questionID: self.itemData.templateID,
          valueType: 'answer',
          value: self.sentFiles
        });
      } else {
        self.onUpdate({
          questionID: self.itemData.templateID,
          valueType: 'answer',
          value: {}
        });
      }
    }

    function clear() {
      self.pendingList = [];
      _pendingArrayControl = 0;
    }

  }
}());
