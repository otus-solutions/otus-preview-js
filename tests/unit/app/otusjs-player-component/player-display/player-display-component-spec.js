describe('otusPlayerDisplay Component Test unit', function() {

  var Mock = {};
  var Injections = [];
  var controller;

  beforeEach(function() {
    angular.mock.module('otusjs.player');

    angular.mock.inject(function (_$controller_, _$injector_,$rootScope, $compile) {
      mock($rootScope, $compile);
      Injections.$scope = Mock.$scope;
      Injections.$document = _$injector_.get('$document');
      Injections.$element = Mock.$element;
      Injections.$compile = $compile;
      Injections.$location = _$injector_.get('$location');
      Injections.$anchorScroll = _$injector_.get('$anchorScroll');
      Injections.ActivityFacadeService = _$injector_.get('otusjs.player.data.activity.ActivityFacadeService');
      Injections.PlayerService = _$injector_.get('otusjs.player.core.player.PlayerService');

      controller = _$controller_('otusPlayerDisplayCtrl', Injections);
    });
    // spyOn(Injections.$element, 'find').and.callThrough;
    // spyOn(Injections.$element.find, 'empty').and.returnValue(Promise.resolve());
    spyOn(Injections.$element, 'find').and.returnValue(Mock.$section);

    controller.$onInit();
  });

  it('controller method should have a defined controller', function () {
    expect(controller).toBeDefined();
  });

  it('Methods should defined controller', function () {
    expect(controller.$onInit).toBeDefined();
    expect(controller.loadItem).toBeDefined();
    expect(controller.showCover).toBeDefined();
    expect(controller.remove).toBeDefined();
  });

  it('Methods should $onInit execute', function () {
    expect(Injections.$scope.$parent.$ctrl.playerDisplay).toEqual(controller);
    expect(Injections.$scope.itemData.templateID).toEqual('');
    expect(Injections.$scope.questions).toEqual([]);
    expect(controller.ids).toEqual([]);
  });

  xit('should try to find element section on controller template', function() {
    Mock.itemData = [{'templateID':'ATCA1'}];

    controller.loadItem(Mock.itemData);
    // Injections.$scope.$digest();

    expect(Injections.$element.find).toHaveBeenCalledWith('section');

    // expect(Injections.$scope.itemData).toEqual(Mock.itemData);
  });

  function mock($rootScope, $compile) {
    Mock.$scope = $rootScope.$new();
    Mock.$scope.$parent.$ctrl = {};

    Mock.$element = $;
    // Mock.$element = $compile('<div id="pagePlayer"></div>')(Mock.$scope);

    // Mock.$element = $compile(angular.element('<div id="pagePlayer"></div>'))(Mock.$scope);

    Mock.$section = $;

    Mock.$section.prepend = jasmine.createSpy('empty');
  }
});

xdescribe('otusPlayerDisplay component', function() {

  var UNIT_NAME = 'otusPlayerDisplay';
  var SURVEY_ITEM = '<otus-survey-item item-data="itemData" />';
  var Mock = {};
  var Injections = {};
  var Bindings = {};
  var component = {};

  beforeEach(function() {
    module('otusjs.player.core');
    module('otusjs.player.component');

    inject(function(_$componentController_, $rootScope, _$compile_) {
      /* Test data */
      mockItemData();

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
        component.loadItem(Mock.itemData);

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

  function mockItemData() {
    Mock.itemData = {}
    Mock.itemData.customID = 'VAL1';
  }

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