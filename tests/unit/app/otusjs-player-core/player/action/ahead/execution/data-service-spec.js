describe('DataService', function() {

  var Mock = {};
  var service;

  beforeEach(function() {
    module('otusjs');
    module('otusjs.player.core');

    inject(function(_$injector_) {
      service = _$injector_.get('otusjs.player.core.player.DataService', {
        ActivityFacadeService: mockActivityFacadeService(_$injector_)
      });
    });
  });

  describe('transferData method', function() {

    it('should call ActivityFacadeService.fillQuestion', function() {
      service.transferData(mockFillingData());

      expect(Mock.ActivityFacadeService.createQuestionFill).toHaveBeenCalled();
    });

  });

  function mockActivityFacadeService($injector) {
    Mock.ActivityFacadeService = $injector.get('ActivityFacadeService');
    spyOn(Mock.ActivityFacadeService, 'createQuestionFill');
    return Mock.ActivityFacadeService;
  }

  function mockFillingData() {
    return {
      answer: 'Olá',
      metadata: 1,
      comment: 'Tchau!'
    };
  }
});
