describe('calendar question controller component', function () {
    var Mock = {};
    var controller;

    beforeEach(function () {
        angular.mock.module('otusjs.player.component', function ($provide) {
          $provide.value('otusjs.player.data.activity.CurrentItemService', {
            getFilling : function() {
              return {answer:{value:"",clear:function(){}}}
            }
          });
          $provide.value('otusjs.utils.ImmutableDate', {});
        });

        inject(function (_$controller_) {
            mockController(_$controller_);
        });
        mockBindings();
        // var cSpy = spyOn(window, 'ImmutableDate').and.callThrough();
        // spyOn(window,"ImmutableDate").and.returnValue(new Date(1,1,2018));
    });

    describe('the initialization', function () {
        it('should have a defined controller', function () {
            expect(controller).toBeDefined();
            expect(controller.update).toBeDefined();
            expect(controller.clear).toBeDefined();
        });

        it('should build an new component with values', function () {
            expect(controller.view).toEqual(false);
        });
    });

    describe('the clear', function() {
      beforeEach(function() {
        spyOn(controller, "$onInit").and.returnValue(true);
      })
      it('should clear an answer', function() {
        controller.clear();
        expect(controller.$onInit).toHaveBeenCalled();
        expect(controller.$onInit).toHaveBeenCalledTimes(1);
      });
    })

    //mock functions
    function mockController(_$controller_) {
        controller = _$controller_('otusCalendarQuestionCtrl');
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
