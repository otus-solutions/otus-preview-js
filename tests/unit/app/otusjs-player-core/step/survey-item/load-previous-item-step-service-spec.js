describe('LoadPreviousItemStepService Service Test unit', function() {

  var Mock = {};
  var Injections = {};
  var service;
  var navigationData = {};

  beforeEach(function() {
    module('otusjs.player.core');

    inject(function($injector) {
      /* Test data*/
      mockExecutionPipe();
      mockFlowData();

      Injections.NavigationService = $injector.get('otusjs.player.data.navigation.NavigationService');
      Injections.CurrentItemService = $injector.get('otusjs.player.data.activity.CurrentItemService');

      service = $injector.get('otusjs.player.core.step.LoadPreviousItemStepService', Injections);
    });

    navigationData = {item: {}, navigation: {}, previous: {}};
    spyOn(Injections.NavigationService, 'loadPreviousItem').and.returnValue(navigationData);
    spyOn(Injections.CurrentItemService, 'setup');
  });

    it('LoadPreviousItemStep should retrieve navigation data from NavigationService', function() {
      service.effect(Mock.pipe, Mock.flowData);

      expect(Injections.NavigationService.loadPreviousItem).toHaveBeenCalledWith();
    });

    it('LoadPreviousItemStep should use the navigation data to setup the CurrentItemService', function() {
      service.effect(Mock.pipe, Mock.flowData);

      expect(Injections.CurrentItemService.setup).toHaveBeenCalledWith(navigationData);
    });

  function mockExecutionPipe() {
    Mock.pipe = {};
  }

  function mockFlowData() {
    Mock.flowData = {};
  }
});
