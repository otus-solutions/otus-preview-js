xdescribe('ApplyAnswerStepService', function() {

  var Mock = {};
  var Injections = {};
  var service = {};

  beforeEach(function() {
    module('otusjs.player.core');

    inject(function(_$injector_) {
      mockExecutionPipe();
      mockFlowData();
      mockNavigationService(_$injector_);
      mockActivityFacadeService(_$injector_);
      service = _$injector_.get('otusjs.player.core.step.ApplyAnswerStepService', Injections);
    });
  });

  describe('effect method', function() {

    beforeEach(function() {
      service.beforeEffect(Mock.pipe, Mock.flowData);
    })

    it('should call ActivityFacadeService.applyAnswer', function() {
      spyOn(Mock.ActivityFacadeService, 'applyAnswer');

      service.effect(Mock.pipe, Mock.flowData);

      expect(Mock.ActivityFacadeService.applyAnswer).toHaveBeenCalled();
    });

  });

  function mockExecutionPipe() {
    Mock.pipe = {};
  }

  function mockFlowData() {
    Mock.flowData = {};
    Mock.flowData.answerToEvaluate = {};
    Mock.flowData.answerToEvaluate.data = {};
  }

  function mockNavigationService($injector) {
    Mock.NavigationService = $injector.get('otusjs.player.data.navigation.NavigationService');

    var currentItem = {};
    currentItem.getItem = () => { return Mock.itemData; };
    currentItem.shouldIgnoreResponseEvaluation = () => { return false; };
    currentItem.getFilling = () => { return Mock.itemFilling; };
    currentItem.shouldApplyAnswer = () => { return true; };
    spyOn(Mock.NavigationService, 'getCurrentItem').and.returnValue(currentItem);

    Injections.NavigationService = Mock.NavigationService;
  }

  function mockActivityFacadeService($injector) {
    Mock.itemFilling = {};
    Mock.itemFilling.answer = {};
    Mock.itemFilling.answer.value = {};
    Mock.ActivityFacadeService = $injector.get('otusjs.player.data.activity.ActivityFacadeService');
    Injections.ActivityFacadeService = Mock.ActivityFacadeService;
  }
});
