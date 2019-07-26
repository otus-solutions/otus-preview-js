describe('Static Variable Component Test unit', function () {
  var controller;
  var Injections= [];

  beforeEach(function () {
    angular.mock.module('otusjs.player');

    angular.mock.inject(function (_$controller_, _$injector_) {
      Injections.ActivityFacadeService = _$injector_.get('otusjs.player.data.activity.ActivityFacadeService');

      controller = _$controller_('otusStaticVariableCtrl', Injections);
    });

    spyOn(Injections.ActivityFacadeService,'getWholeTemplateStaticVariableList');

  });

  it('controller method should have a defined controller', function () {
    expect(controller).toBeDefined();
  });

  it('Methods should defined controller', function () {
    expect(controller.$onInit).toBeDefined();
    expect(controller.isLockOpen).toBeDefined();
  });

  it('Methods should $onInit execute', function () {
    controller.$onInit();
    expect(Injections.ActivityFacadeService.getWholeTemplateStaticVariableList).toHaveBeenCalledTimes(1);
  });

  it('Methods should isLockedOpen execute', function () {
    controller.isLockOpen();
    expect(controller.shouldLockOpen).toBeFalsy();
    expect(controller.iconLockOpen).toEqual('arrow_right');
    expect(controller.tooltipLockOpen).toEqual('Abrir');
  });
});