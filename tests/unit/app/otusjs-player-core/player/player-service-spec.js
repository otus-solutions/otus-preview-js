describe('PlayerService', function() {

  let UNIT_NAME = 'otusjs.player.core.player.PlayerService';
  let Mock = {};
  let Injections = {};
  let service = {};

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
  });

  describe('getItemData method', function() {

    it('should retrieve the current item from activity', function() {
      let itemData = service.getItemData();

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
    Mock.itemService.getItem = jasmine.createSpy('getItem').and.returnValue(Mock.itemData);
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
