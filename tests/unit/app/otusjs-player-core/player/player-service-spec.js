describe('PlayerService', function() {

  var UNIT_NAME = 'otusjs.player.core.player.PlayerService';
  var Mock = {};
  var Injections = {};
  var service = {};

  beforeEach(function() {
    module('otusjs.player.core');

    inject(function(_$injector_) {
      /* Injectable mocks */
      mockActivityFacadeService(_$injector_);
      mockPlayerStartActionService(_$injector_);
      mockPlayActionService(_$injector_);
      mockAheadActionService(_$injector_);
      mockBackActionService(_$injector_);

      service = _$injector_.get(UNIT_NAME, Injections);
    });

    Mock.test = Promise.resolve('passou');
  });

  it('service method defined',function () {
    expect(service).toBeDefined();
  });

  it('service methods checking',function () {
    expect(service.bindComponent).toBeDefined();
    expect(service.getItemData).toBeDefined();
    expect(service.goAhead).toBeDefined();
    expect(service.goBack).toBeDefined();
    expect(service.setGoBackTo).toBeDefined();
    expect(service.getGoBackTo).toBeDefined();
    expect(service.isGoingBack).toBeDefined();
    expect(service.play).toBeDefined();
    expect(service.setup).toBeDefined();
    expect(service.end).toBeDefined();
    expect(service.eject).toBeDefined();
    expect(service.stop).toBeDefined();
    expect(service.save).toBeDefined();
    expect(service.registerHardBlocker).toBeDefined();
    expect(service.registerSoftBlocker).toBeDefined();
    expect(service.getHardBlocker).toBeDefined();
    expect(service.getSoftBlocker).toBeDefined();
    expect(service.clearHardBlocker).toBeDefined();
  });

  it('registerHardBlocker method should call getHardBlocker', function () {
    spyOn(service,'registerHardBlocker').and.callThrough();
    service.registerHardBlocker(Mock.test);
    expect(service.registerHardBlocker).toHaveBeenCalledTimes(1);
  });

  it('getHardBlocker method should return promise', function () {
    service.registerHardBlocker(Mock.test);
    expect(service.getHardBlocker()).toEqual(Mock.test);
  });

  it('registerSoftBlocker method should call getSoftBlocker', function () {
    spyOn(service,'registerSoftBlocker').and.callThrough();
    service.registerSoftBlocker(Mock.test);
    expect(service.registerSoftBlocker).toHaveBeenCalledTimes(1);
  });

  it('getSoftBlocker method should return promise', function () {
    service.registerSoftBlocker(Mock.test);
    expect(service.getSoftBlocker()).toEqual(Mock.test);
  });

  describe('getItemData method', function() {

    it('should retrieve the current item from activity', function() {
      var itemData = service.getItemData();

      expect(itemData).toEqual(Mock.itemData);
    });

  });

  describe('goAhead method', function() {

    it('should execute the AheadActionService', function() {
      spyOn(Mock.AheadActionService, 'execute');

      service.goAhead();

      expect(Mock.AheadActionService.execute).toHaveBeenCalled();
    });

  });

  describe('goBack method', function() {

    it('should execute the AheadActionService', function() {
      spyOn(Mock.BackActionService, 'execute');

      service.goBack();

      expect(Mock.BackActionService.execute).toHaveBeenCalled();
    });

  });

  describe('play method', function() {

    it('should execute the PlayActionService', function() {
      spyOn(Mock.PlayActionService, 'execute');

      service.play();

      expect(Mock.PlayActionService.execute).toHaveBeenCalledWith();
    });

  });

  describe('setup method', function() {

    it('should execute the PlayerStartActionService', function() {
      spyOn(Mock.PlayerStartActionService, 'execute');

      service.setup();

      expect(Mock.PlayerStartActionService.execute).toHaveBeenCalledWith();
    });

  });

  function mockActivityFacadeService($injector) {
    Mock.ActivityFacadeService = $injector.get('otusjs.player.data.activity.ActivityFacadeService');
    Injections.ActivityFacadeService = Mock.ActivityFacadeService;
  }

  function mockPlayerStartActionService($injector) {
    Mock.PlayerStartActionService = $injector.get('otusjs.player.core.phase.PlayerStartActionService');
    Mock.itemData = { customID: 'VAL1' };
    Mock.itemService = {};
    Mock.itemService.getItems = jasmine.createSpy('getItems').and.returnValue(Mock.itemData);
    spyOn(Mock.ActivityFacadeService, 'getCurrentItem').and.returnValue(Mock.itemService);
    Injections.PlayerStartActionService = Mock.PlayerStartActionService;
  }

  function mockPlayActionService($injector) {
    Mock.PlayActionService = $injector.get('otusjs.player.core.phase.PlayActionService');
    Injections.PlayActionService = Mock.PlayActionService;
  }

  function mockAheadActionService($injector) {
    Mock.AheadActionService = $injector.get('otusjs.player.core.phase.AheadActionService');
    Injections.AheadActionService = Mock.AheadActionService;
  }

  function mockBackActionService($injector) {
    Mock.BackActionService = $injector.get('otusjs.player.core.phase.BackActionService');
    Injections.BackActionService = Mock.BackActionService;
  }
});
