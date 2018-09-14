(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusComment', {
      templateUrl: 'app/otusjs-player-component/comment/comment-template.html',
      controller: OtusCommentController,
      bindings: {
        itemData: '<',
        onUpdate: '&'
      },
      require: {
        otusQuestion: '^otusQuestion'
      }
    });

  OtusCommentController.$inject = [
    'otusjs.player.data.activity.CurrentItemService'
  ];

  function OtusCommentController(CurrentItemService) {
    var self = this;

    self.$onInit = function() {
      self.comment = CurrentItemService.getFilling().comment;
      self.otusQuestion.comment = self;
    };

    self.update = function() {
      self.onUpdate({
        valueType: 'comment',
        value: self.comment
      });
    };

    self.clear = function() {
      CurrentItemService.getFilling().comment = "";
      delete self.comment;
    };
  }

})();
