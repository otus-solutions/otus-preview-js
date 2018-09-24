describe('decimal question view controller component', function () {
    var Mock = {};
    var controller;

    beforeEach(function () {
        angular.mock.module('otusjs.player.component', function ($provide) {
          $provide.value('otusjs.player.data.activity.CurrentItemService', {});
        });

        inject(function (_$controller_) {
            mockController(_$controller_);
        });
        mockBindings();
    });

    describe('the initialization', function () {
        it('should have a defined controller', function () {
            expect(controller).toBeDefined();
        });

        it('should build an new component with values', function () {
            expect(controller.view).toEqual(false);
        });
    });

    //mock functions
    function mockController(_$controller_) {

        controller = _$controller_('otusDecimalQuestionCtrl');
    }

    function mockBindings() {
        Mock.itemData = {
            data: {
                answer: {
                    value: 1
                }
            }
        };
        controller.itemData = Mock.itemData;
    }
});
