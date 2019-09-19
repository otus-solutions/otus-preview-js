describe('surveyItem Component Test unit', function() {
  var controller;
  var Injections = [];
  var Mock = {};

  beforeEach(function() {
    angular.mock.module('otusjs.player');
    angular.mock.inject(function (_$controller_, $rootScope, _$injector_) {
      mock($rootScope);
      Injections.$scope = Mock.$scope;
      Injections.$element = Mock.$element;
      Injections.CurrentItemService = _$injector_.get('otusjs.player.data.activity.CurrentItemService');

      controller = _$controller_('otusSurveyItemCtrl', Injections);
      controller.itemData = {templateID:"TST1"}
    });
     controller.$onInit();
  });

  it('controller method should have a defined controller', function () {
    expect(controller).toBeDefined();
  });

  it('Methods should defined controller', function () {
    expect(controller.$onInit).toBeDefined();
    expect(controller.isQuestion).toBeDefined();
    expect(controller.isItem).toBeDefined();
    expect(controller.update).toBeDefined();
    expect(controller.clear).toBeDefined();
    expect(controller.pushData).toBeDefined();
    expect(controller.destroy).toBeDefined();
    expect(controller.updateValidation).toBeDefined();
  });

  it('Methods should $onInit execute', function () {
    expect(Injections.$scope.$parent.$ctrl.currentItems[0]).toEqual(controller);
  });

  function mock($rootScope) {
    Mock.$scope = $rootScope.$new();
    Mock.$scope.$parent.$ctrl = {};
    Mock.$scope.$parent.$ctrl.currentItems = [];
  }
});