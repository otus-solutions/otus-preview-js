describe('otusPlayerCommander component', function() {

  let Mock = {};
  let Injections = {};
  let Bindings = {};
  let component = {};

  beforeEach(function() {
    module('otusjs.player.core');
    module('otusjs.player.component');

    inject(function(_$componentController_, _$injector_) {
      mockPlayerService(_$injector_);
      component = _$componentController_('otusPlayerCommander', Injections, Bindings);
    });
  });

  describe('goAhead method', function() {

    it('should call PlayerService.goAhead', function() {
      spyOn(Mock.PlayerService, 'goAhead');

      component.goAhead();

      expect(Mock.PlayerService.goAhead).toHaveBeenCalledWith();
    });

  });

  describe('goBack method', function() {

    it('should call PlayerService.goBack', function() {
      spyOn(Mock.PlayerService, 'goBack');

      component.goBack();

      expect(Mock.PlayerService.goBack).toHaveBeenCalledWith();
    });

  });

  describe('play method', function() {

    it('should call PlayerService.play', function() {
      spyOn(Mock.PlayerService, 'play');

      component.play();

      expect(Mock.PlayerService.play).toHaveBeenCalledWith();
    });

  });

  function mockPlayerService($injector) {
    Mock.PlayerService = $injector.get('otusjs.player.core.player.PlayerService')
    Injections.PlayerService = Mock.PlayerService;
  }
});
