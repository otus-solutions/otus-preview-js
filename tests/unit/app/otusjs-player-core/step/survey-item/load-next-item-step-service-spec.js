describe('LoadItemStepService', function() {

  var Mock = {};
  var Injections = {};
  var service;

  beforeEach(function() {
    module('otusjs.player.core');

    inject(function(_$injector_) {
      /* Test data*/
      mockExecutionPipe();
      mockFlowData();

      /* Injectable mocks */
      mockNavigationService(_$injector_);
      mockCurrentItemService(_$injector_);

      service = _$injector_.get('otusjs.player.core.step.LoadNextItemStepService', Injections);
    });
  });

  describe('effect method', function() {

    var navigationData = {};

    beforeEach(function() {
      navigationData = {item: {}, navigation: {}, previous: {}};
      spyOn(Mock.NavigationService, 'loadNextItem').and.returnValue(navigationData);
      spyOn(Mock.CurrentItemService, 'setup');
    })

    it('should retrieve navigation data from NavigationService', function() {
      service.effect(Mock.pipe, Mock.flowData);

      expect(Mock.NavigationService.loadNextItem).toHaveBeenCalledWith();
    });

    it('should use the navigation data to setup the CurrentItemService', function() {
      service.effect(Mock.pipe, Mock.flowData);

      expect(Mock.CurrentItemService.setup).toHaveBeenCalledWith(navigationData);
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

  function mockCurrentItemService($injector) {
    Mock.CurrentItemService = $injector.get('otusjs.player.data.activity.CurrentItemService');
    Injections.CurrentItemService = Mock.CurrentItemService;
  }
});
