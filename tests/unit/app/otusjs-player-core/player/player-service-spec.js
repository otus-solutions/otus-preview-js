describe('PlayerService', function() {

    var Mock = {};
    var service;
    var items = [1, 2, 3];

    beforeEach(function() {
        module('otusjs.player.core');

        inject(function(_$injector_) {
            service = _$injector_.get('otusjs.player.core.PlayerService', {
                ItemManagerService: mockItemManagerService(_$injector_),
                CurrentQuestion: mockCurrentQuestion(_$injector_)
            });
        });
    });

    describe('play method', function() {

        beforeEach(function() {
            service.play(items);
        });

        it('should call ItemManagerService.init with item list', function() {
            expect(Mock.ItemManagerService.init).toHaveBeenCalledWith(items);
        });

    });

    describe('getNext method', function() {

        beforeEach(function() {
            service.play(items);
        });

        it('should call ItemManagerService.hasNext method', function() {
            spyOn(Mock.ItemManagerService, 'hasNext');

            service.getNext();

            expect(Mock.ItemManagerService.hasNext).toHaveBeenCalled();
        });

        it('should call ItemManagerService.next method', function() {
            spyOn(Mock.ItemManagerService, 'next');

            service.getNext();

            expect(Mock.ItemManagerService.next).toHaveBeenCalled();
        });

        it('should return an item when it exists', function() {
            spyOn(Mock.ItemManagerService, 'hasNext').and.returnValue(true);

            expect(service.getNext()).toBeDefined();
        });

        it('should return an item when it not exists', function() {
            spyOn(Mock.ItemManagerService, 'hasNext').and.returnValue(false);

            expect(service.getNext()).toBeUndefined();
        });

    });

    describe('getPrevious method', function() {

        beforeEach(function() {
            service.play(items);
        });

        it('should call ItemManagerService.hasPrevious method', function() {
            spyOn(Mock.ItemManagerService, 'hasPrevious');

            service.getPrevious();

            expect(Mock.ItemManagerService.hasPrevious).toHaveBeenCalled();
        });

        it('should call ItemManagerService.previous method', function() {
            spyOn(Mock.ItemManagerService, 'hasPrevious').and.returnValue(true);
            spyOn(Mock.ItemManagerService, 'previous');

            service.getPrevious();

            expect(Mock.ItemManagerService.previous).toHaveBeenCalled();
        });

        it('should return an item when it exists', function() {
            spyOn(Mock.ItemManagerService, 'hasPrevious').and.returnValue(true);
            spyOn(Mock.ItemManagerService, 'previous').and.returnValue(items[0]);

            expect(service.getPrevious()).toBeDefined();
        });

        it('should return an item when it not exists', function() {
            spyOn(Mock.ItemManagerService, 'hasPrevious').and.returnValue(false);

            expect(service.getPrevious()).toBeUndefined();
        });

    });

    describe('hasNext method', function() {

        beforeEach(function() {
            service.play(items);
        });

        it('should call ItemManagerService.hasNext', function() {
            spyOn(Mock.ItemManagerService, 'hasNext');

            service.hasNext();

            expect(Mock.ItemManagerService.hasNext).toHaveBeenCalled();
        });

    });

    describe('hasPrevious method', function() {

        beforeEach(function() {
            service.play(items);
        });

        it('should call ItemManagerService.hasPrevious', function() {
            spyOn(Mock.ItemManagerService, 'hasPrevious');

            service.hasPrevious();

            expect(Mock.ItemManagerService.hasPrevious).toHaveBeenCalled();
        });

    });

    describe('canWeGo method - an button blocker for next and back', function() {
        beforeEach(function() {
            service.play(items);
        });

        it('should call hasPrevious method when asked if can go ahead', function() {
          spyOn(Mock.ItemManagerService, 'hasPrevious');
          service.canWeGo('back');

          expect(Mock.ItemManagerService.hasPrevious).toHaveBeenCalled();
        });
        it('should call hasNext method when asked if can go ahead', function() {
            spyOn(Mock.ItemManagerService, 'hasNext');
            service.canWeGo('ahead');

            expect(Mock.ItemManagerService.hasNext).toHaveBeenCalled();
        });
        it('should call allValidationsOk method when asked if can go ahead', function() {
            spyOn(Mock.CurrentQuestion, 'allValidationsOk');
            service.canWeGo('ahead');

            expect(Mock.CurrentQuestion.allValidationsOk).toHaveBeenCalled();
        });
        it('should call metadataAcceptance method when asked if can go ahead', function() {
            spyOn(Mock.CurrentQuestion, 'metadataAcceptance');
            service.canWeGo('ahead');
            expect(Mock.CurrentQuestion.metadataAcceptance).toHaveBeenCalled();
        });

        it('should set canWeGo to false when some validation fails and has no metadata acceptance returns false', function() {
          Mock.CurrentQuestion.allValidationsOk = function() {
            return false;
          };
          Mock.CurrentQuestion.metadataAcceptance = function() {
            return false;
          };
          canWeGo = service.canWeGo('ahead');

          expect(canWeGo).toBe(false);

        });

        it('should set canWeGo to true when some validation fails but metadataAcceptance returns true', function() {
          Mock.CurrentQuestion.allValidationsOk = function() {
            return false;
          };
          Mock.CurrentQuestion.metadataAcceptance = function() {
            return true;
          };
          canWeGo = service.canWeGo('ahead');
          expect(canWeGo).toBe(true);

        });
    });

    function mockItemManagerService($injector) {
        Mock.ItemManagerService = $injector.get('otusjs.player.core.ItemManagerService');

        spyOn(Mock.ItemManagerService, 'init').and.callThrough();

        return Mock.ItemManagerService;
    }

    function mockCurrentQuestion($injector) {
        Mock.CurrentQuestion = $injector.get('otusjs.player.core.CurrentQuestion');

        return Mock.CurrentQuestion;
    }

});
