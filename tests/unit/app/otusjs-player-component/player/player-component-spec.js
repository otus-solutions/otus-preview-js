xdescribe('otusPlayer component', function() {

  var UNIT_NAME = 'otusPlayer';
  var Mock = {};
  var Injections = {};
  var Bindings = {};
  var component = {};

  beforeEach(function() {
    module('otusjs.player.core');
    module('otusjs.player.component');

    inject(function(_$componentController_, _$injector_) {
      /* Injectable mocks */
      mockPlayerService(_$injector_);

      component = _$componentController_(UNIT_NAME, Injections, Bindings);
    });
  });

  describe('goAhead method', function() {

    beforeEach(function() {
      component.$onInit();
      component.playerDisplay.loadItem = jasmine.createSpy('loadItem');
    });

    it('should fire goAhead action from PlayerService', function() {
      component.goAhead();

      expect(Mock.PlayerService.goAhead).toHaveBeenCalledWith();
    });

    it('should request to playerDisplay to load item', function() {
      component.goAhead();

      expect(component.playerDisplay.loadItem).toHaveBeenCalledWith();
    });

  });

  describe('goBack method', function() {

    beforeEach(function() {
      component.$onInit();
      component.playerDisplay.loadItem = jasmine.createSpy('loadItem');
    });

    it('should fire goBack action from PlayerService', function() {
      component.goBack();

      expect(Mock.PlayerService.goBack).toHaveBeenCalledWith();
    });

    it('should request to playerDisplay to load item', function() {
      component.goBack();

      expect(component.playerDisplay.loadItem).toHaveBeenCalledWith();
    });

  });

  describe('play method', function() {

    beforeEach(function() {
      component.$onInit();
      component.playerDisplay.loadItem = jasmine.createSpy('loadItem');
    });

    it('should fire play action from PlayerService', function() {
      component.play();

      expect(Mock.PlayerService.play).toHaveBeenCalledWith();
    });

    it('should request to playerDisplay to load item', function() {
      component.play();

      expect(component.playerDisplay.loadItem).toHaveBeenCalledWith();
    });

  });

  describe('onInit method', function() {

    beforeEach(function() {
      component.$onInit();
    });

    it('should set showCover status to true', function() {
      expect(component.showCover).toBe(true);
    });

    it('should set showActivity status to false', function() {
      expect(component.showActivity).toBe(false);
    });

    it('should set the attribute playerCommander with an empty literal object', function() {
      expect(component.playerCommander).toBeDefined();
    });

    it('should set the attribute playerDisplay with an empty literal object', function() {
      expect(component.playerDisplay).toBeDefined();
    });

    it('should setup PlayerService', function() {
      expect(Mock.PlayerService.setup).toHaveBeenCalledWith();
    });

  });

  function mockPlayerService($injector) {
    Mock.PlayerService = $injector.get('otusjs.player.core.player.PlayerService');

    spyOn(Mock.PlayerService, 'setup');
    spyOn(Mock.PlayerService, 'goAhead');
    spyOn(Mock.PlayerService, 'goBack');
    spyOn(Mock.PlayerService, 'play');

    Injections.PlayerService = Mock.PlayerService;
  }
});
