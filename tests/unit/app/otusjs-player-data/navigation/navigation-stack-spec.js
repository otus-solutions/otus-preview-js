describe('NavigationStackFactory', function()  {

  let Mock = {};
  let stack = {};

  beforeEach(function()  {
    module('otusjs.player.data');

    inject(function(_$injector_) {
      /* Test data */
      mockStackItems(_$injector_);

      stack = _$injector_.get('otusjs.player.data.navigation.NavigationStackFactory').create();
    });
  });

  describe('stackUp method', function()  {

    it('should put an item at begin of stack', function()  {
      stack.stackUp(Mock.itemA);
      expect(stack.getItem()).toEqual(Mock.itemA);

      stack.stackUp(Mock.itemB);
      expect(stack.getItem()).toEqual(Mock.itemB);

      stack.stackUp(Mock.itemC);
      expect(stack.getItem()).toEqual(Mock.itemC);

      stack.stackUp(Mock.itemD);
      expect(stack.getItem()).toEqual(Mock.itemD);
    });

  });

  describe('unstack method', function()  {

    beforeEach(function() {
      stack.stackUp(Mock.itemA);
      stack.stackUp(Mock.itemB);
      stack.stackUp(Mock.itemC);
      stack.stackUp(Mock.itemD);
    });

    it('should remove the item from top of stack', function()  {
      stack.unstack();

      expect(stack.getItem()).toEqual(Mock.itemC);
    });

    it('should return the removed item', function()  {
      expect(stack.unstack()).toEqual(Mock.itemD);
    });

  });

  function mockStackItems($injector) {
    let itemFactory = $injector.get('otusjs.player.data.navigation.NavigationStackItemFactory');
    let options = {};

    options = { id: 'A', label: 'Label', type: 'IntegerQuestion', answer: 'Label da resposta', metadata: 'Label do metdado.' };
    Mock.itemA = itemFactory.create(options);

    options = { id: 'B', label: 'Label', type: 'IntegerQuestion', answer: 'Label da resposta', metadata: 'Label do metdado.' };
    Mock.itemB = itemFactory.create(options);

    options = { id: 'C', label: 'Label', type: 'IntegerQuestion', answer: 'Label da resposta', metadata: 'Label do metdado.' };
    Mock.itemC = itemFactory.create(options);

    options = { id: 'D', label: 'Label', type: 'IntegerQuestion', answer: 'Label da resposta', metadata: 'Label do metdado.' };
    Mock.itemD = itemFactory.create(options);
  }
});
