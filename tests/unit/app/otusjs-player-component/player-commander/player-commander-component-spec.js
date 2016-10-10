describe('otusPlayerCommander component', function() {

  let UNIT_NAME = 'otusPlayerCommander';
  let Mock = {};
  let Injections = {};
  let Bindings = {};
  let component = {};

  beforeEach(function() {
    module('otusjs.player.core');
    module('otusjs.player.component');

    inject(function(_$componentController_, $rootScope) {
      /* Injectable mocks */
      mockBindings();
      mockScope($rootScope);

      component = _$componentController_(UNIT_NAME, Injections, Bindings);
    });
  });

  describe('goAhead method', function() {

    it('should output an onGoAhead', function() {
      spyOn(component, 'onGoAhead');

      component.goAhead();

      expect(component.onGoAhead).toHaveBeenCalledWith();
    });

  });

  describe('goBack method', function() {

    it('should output an onGoBack', function() {
      spyOn(component, 'onGoBack');

      component.goBack();

      expect(component.onGoBack).toHaveBeenCalledWith();
    });

  });

  describe('pause method', function() {

    it('should output an onPause', function() {
      spyOn(component, 'onPause');

      component.pause();

      expect(component.onPause).toHaveBeenCalledWith();
    });

  });

  describe('stop method', function() {

    it('should output an onStop', function() {
      spyOn(component, 'onStop');

      component.stop();

      expect(component.onStop).toHaveBeenCalledWith();
    });

  });

  describe('onInit method', function() {

    it('should initialize the playerCommander attribute from parent controller with itself', function() {
      component.$onInit();

      expect(Mock.$scope.$parent.$ctrl.playerCommander).toEqual(component);
    });

  });

  function mockBindings() {
    Bindings.onGoAhead = () => {};
    Bindings.onGoBack = () => {};
    Bindings.onPause = () => {};
    Bindings.onPlay = () => {};
    Bindings.onStop = () => {};
  }

  function mockScope($rootScope) {
    Mock.$scope = $rootScope.$new();

    Mock.$scope.$parent.$ctrl = {};

    Injections.$scope = Mock.$scope;
  }
});
