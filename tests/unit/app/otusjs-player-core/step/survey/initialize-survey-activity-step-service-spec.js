describe('InitializeSurveyActivityStepService', function() {

  var Mock = {};
  var Injections = {};
  var service;

  beforeEach(function() {
    module('otusjs.player.core');

    inject(function(_$injector_) {
      /* Test data */
      mockExecutionPipe();
      mockFlowData();

      /* Injectable mocks */
      mockActivityFacadeService(_$injector_);

      service = _$injector_.get('otusjs.player.core.step.InitializeSurveyActivityStepService', Injections);
    });
  });

  describe('effect method', function() {

    it('should call ActivityFacadeService.applyAnswer', function() {
      spyOn(Mock.ActivityFacadeService, 'initialize');

      service.effect(Mock.pipe, Mock.flowData);

      expect(Mock.ActivityFacadeService.initialize).toHaveBeenCalledWith();
    });

  });

  function mockExecutionPipe() {
    Mock.pipe = {};
  }

  function mockFlowData() {
    Mock.flowData = {};
  }

  function mockActivityFacadeService($injector) {
    Mock.ActivityFacadeService = $injector.get('otusjs.player.data.activity.ActivityFacadeService');
    Injections.ActivityFacadeService = Mock.ActivityFacadeService;
  }
});
