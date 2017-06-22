xdescribe('otusSurveyCover component', function() {

  var UNIT_NAME = 'otusSurveyCover';
  var SURVEY_ITEM = '<otus-survey-item item-data="itemData" />';
  var Mock = {};
  var Injections = {};
  var Bindings = {};
  var component = {};

  beforeEach(function() {
    module('otusjs.player.core');
    module('otusjs.player.component');

    inject(function(_$componentController_, $rootScope, _$compile_) {
      /* Injectable mocks */
      mockBindings();
      mockScope($rootScope);
      mockElement();
      mockCompile(_$compile_);

      component = _$componentController_(UNIT_NAME, Injections, Bindings);
    });
  });

  describe('loadItem method', function() {

    describe('when already exists an item loaded', function() {

      beforeEach(function() {
        Mock.currentItem = {};
        Mock.currentItem.destroy = jasmine.createSpy('destroy');
        component.currentItem = Mock.currentItem;
      });

      it('should destroy it', function() {
        component.loadItem();

        expect(Mock.currentItem.destroy).toHaveBeenCalledWith();
      });

    });

    it('should set itemData attribute in component scope with parameter itemData', function() {
      Mock.itemData = {};

      component.loadItem(Mock.itemData);

      expect(Mock.$scope.itemData).toEqual(Mock.itemData);
    });

    it('should try to find element section on component template', function() {
      Mock.itemData = {};

      component.loadItem(Mock.itemData);

      expect(Mock.$element.find).toHaveBeenCalledWith('section');
    });

    it('should prepend the compiled otus-survey-item', function() {
      Mock.itemData = {};

      component.loadItem(Mock.itemData);

      expect(Mock.$section.prepend).toHaveBeenCalled();
    });

  });

  describe('onInit method', function() {

    it('should initialize the playerCommander attribute from parent controller with itself', function() {
      component.$onInit();

      expect(Injections.$scope.$parent.$ctrl.playerDisplay).toEqual(component);
    });

  });

  function mockBindings() {}

  function mockScope($rootScope) {
    Mock.$scope = $rootScope.$new();

    Mock.$scope.$parent.$ctrl = {};

    Injections.$scope = Mock.$scope;
  }

  function mockElement() {
    Mock.$element = $;
    Mock.$section = $;

    spyOn(Mock.$element, 'find').and.returnValue(Mock.$section);
    Mock.$section.prepend = jasmine.createSpy('prepend');

    Injections.$element = Mock.$element;
  }

  function mockCompile($compile) {
    Mock.$compile = $compile;
    Injections.$compile = Mock.$compile;
  }
});
