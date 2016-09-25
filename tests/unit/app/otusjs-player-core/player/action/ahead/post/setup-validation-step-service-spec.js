describe('SetupValidationStepService', function() {

  let Mock = {};
  let Injections = {};
  let service = {};

  beforeEach(function() {
    module('otusjs.player.core');

    inject(function(_$injector_) {
      mockPostAheadActionService(_$injector_);
      service = _$injector_.get('otusjs.player.core.player.SetupValidationStepService', Injections);
    });
  });

  describe('', function() {

    it('should link the step to step chain', function() {

    });

  });

  function mockPostAheadActionService($injector) {
    Mock.PostAheadActionService = $injector.get('otusjs.player.core.player.PostAheadActionService');
    Injections.PostAheadActionService = Mock.PostAheadActionService;
  }
});
