describe('otusPlayerDisplay component', function() {

  var UNIT_NAME = 'otusPlayerDisplay';
  var SURVEY_ITEM = '<otus-survey-item item-data="itemData" />';
  var Mock = {};
  var Injections = [];
  var Bindings = {};
  var component = {};
  var controller;

  beforeEach(function() {
    angular.mock.module('otusjs.player');

    angular.mock.inject(function (_$controller_, _$injector_,$rootScope) {
      mock($rootScope);
      Injections.$scope = Mock.$scope;
      Injections.$document = _$injector_.get('$document');
      Injections.$element = Mock.$element;
      Injections.$compile = _$injector_.get('$compile');
      Injections.$location = _$injector_.get('$location');
      Injections.$anchorScroll = _$injector_.get('$anchorScroll');
      Injections.ActivityFacadeService = _$injector_.get('otusjs.player.data.activity.ActivityFacadeService');
      Injections.PlayerService = _$injector_.get('otusjs.player.core.player.PlayerService');

      controller = _$controller_('otusPlayerDisplayCtrl', Injections);
    });
  });

  it('controller method should have a defined controller', function () {
    expect(controller).toBeDefined();
  });

  it('Methods should defined controller', function () {
    console.log(controller);
    expect(controller.$onInit).toBeDefined();
    expect(controller.loadItem).toBeDefined();
    expect(controller.showCover).toBeDefined();
    expect(controller.remove).toBeDefined();
  });

  it('Methods should $onInit execute', function () {
    controller.$onInit();
    // controller.loadItem([{},{}])
    expect(controller.ids).toEqual([]);
    console.log(controller)
  });

  function mock($rootScope) {
    Mock.$element = $;
    Mock.$section = $;

    spyOn(Mock.$element, 'find').and.returnValue(Mock.$section);
    Mock.$section.prepend = jasmine.createSpy('prepend');

     Mock.$scope = $rootScope.$new();
     Mock.$scope.$parent.$ctrl = {};
  }
});
//
//     inject(function(_$componentController_, $rootScope, _$compile_) {
//       /* Test data */
//       mockItemData();
//
//       /* Injectable mocks */
//       mockBindings();
//       mockScope($rootScope);
//       mockElement();
//       mockCompile(_$compile_);
//
//       component = _$componentController_(UNIT_NAME, Injections, Bindings);
//     });
//   });
//
//   describe('loadItem method', function() {
//
//     describe('when already exists an item loaded', function() {
//
//       beforeEach(function() {
//         Mock.currentItem = {};
//         Mock.currentItem.destroy = jasmine.createSpy('destroy');
//         component.currentItem = Mock.currentItem;
//       });
//
//       it('should destroy it', function() {
//         component.loadItem(Mock.itemData);
//
//         expect(Mock.currentItem.destroy).toHaveBeenCalledWith();
//       });
//
//     });
//
//     it('should set itemData attribute in component scope with parameter itemData', function() {
//       Mock.itemData = {};
//
//       component.loadItem(Mock.itemData);
//
//       expect(Mock.$scope.itemData).toEqual(Mock.itemData);
//     });
//
//     it('should try to find element section on component template', function() {
//       Mock.itemData = {};
//
//       component.loadItem(Mock.itemData);
//
//       expect(Mock.$element.find).toHaveBeenCalledWith('section');
//     });
//
//     it('should prepend the compiled otus-survey-item', function() {
//       Mock.itemData = {};
//
//       component.loadItem(Mock.itemData);
//
//       expect(Mock.$section.prepend).toHaveBeenCalled();
//     });
//
//   });
//
//   describe('onInit method', function() {
//
//     it('should initialize the playerCommander attribute from parent controller with itself', function() {
//       component.$onInit();
//
//       expect(Injections.$scope.$parent.$ctrl.playerDisplay).toEqual(component);
//     });
//
//   });
//
//   function mockItemData() {
//     Mock.itemData = {}
//     Mock.itemData.customID = 'VAL1';
//   }
//
//   function mockBindings() {}
//
//   function mockCompile($compile) {
//     Mock.$compile = $compile;
//     Injections.$compile = Mock.$compile;
//   }
// });
