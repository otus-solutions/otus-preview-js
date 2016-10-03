describe('LoadItemStepService', function() {

  var Mock = {};
  var Injections = {};
  var service;

  beforeEach(function() {
    module('otusjs.player.core');

    inject(function(_$injector_) {
      mockExecutionPipe();
      mockFlowData();
      mockNavigationService(_$injector_);
      service = _$injector_.get('otusjs.player.core.step.LoadItemStepService', Injections);
    });
  });

  describe('effect method', function() {

    it('should call NavigationService.applyAnswer', function() {
      spyOn(Mock.NavigationService, 'loadNextItem');

      service.effect(Mock.pipe, Mock.flowData);

      expect(Mock.NavigationService.loadNextItem).toHaveBeenCalled();
    });

  });

  function mockExecutionPipe() {
    Mock.pipe = {};
  }

  function mockFlowData() {
    Mock.flowData = {};
  }

  function mockNavigationService($injector) {
    Mock.NavigationService = $injector.get('otusjs.player.data.navigation.NavigationService');
    Injections.NavigationService = Mock.NavigationService;
  }
});
