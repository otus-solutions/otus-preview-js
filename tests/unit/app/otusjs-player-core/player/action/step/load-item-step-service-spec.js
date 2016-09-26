describe('LoadItemStepService', function() {

  var Mock = {};
  var Injections = {};
  var service;

  beforeEach(function() {
    module('otusjs.player.core');

    inject(function(_$injector_) {
      mockActivityFacadeService(_$injector_);
      service = _$injector_.get('otusjs.player.core.player.LoadItemStepService', Injections);
    });
  });

  describe('effect method', function() {

    it('should call ActivityFacadeService.applyAnswer', function() {
      spyOn(Mock.ActivityFacadeService, 'loadNextItem');

      service.effect();

      expect(Mock.ActivityFacadeService.loadNextItem).toHaveBeenCalled();
    });

  });

  function mockActivityFacadeService($injector) {
    Mock.ActivityFacadeService = $injector.get('otusjs.player.core.activity.ActivityFacadeService');
    Injections.ActivityFacadeService = Mock.ActivityFacadeService;
  }
});
