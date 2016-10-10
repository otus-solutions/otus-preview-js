describe('LoadSurveyActivityStepService', function() {

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
      mockNavigationService(_$injector_);

      service = _$injector_.get('otusjs.player.core.step.LoadSurveyActivityStepService', Injections);
    });
  });

  describe('effect method', function() {

    beforeEach(function() {
      spyOn(Mock.ActivityFacadeService, 'setup');
      spyOn(Mock.NavigationService, 'initialize');
    });

    it('should setup activity', function() {
      service.effect(Mock.pipe, Mock.flowData);

      expect(Mock.ActivityFacadeService.setup).toHaveBeenCalledWith();
    });

    it('should initialize navigation', function() {
      service.effect(Mock.pipe, Mock.flowData);

      expect(Mock.NavigationService.initialize).toHaveBeenCalledWith();
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

  function mockNavigationService($injector) {
    Mock.NavigationService = $injector.get('otusjs.player.data.navigation.NavigationService');
    Injections.NavigationService = Mock.NavigationService;
  }
});
