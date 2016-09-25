describe('RunValidationStepService', function() {

  let Mock = {};
  let Injections = {};
  let service = {};

  beforeEach(function() {
    module('otusjs.player.core');

    inject(function(_$injector_) {
      mockPreAheadActionService(_$injector_);
      service = _$injector_.get('otusjs.player.core.player.RunValidationStepService', Injections);
    });
  });

  describe('', function() {

    it('should link the step to step chain', function() {

    });

  });

  function mockPreAheadActionService($injector) {
    Mock.PreAheadActionService = $injector.get('otusjs.player.core.player.PreAheadActionService');
    Injections.PreAheadActionService = Mock.PreAheadActionService;
  }
});
