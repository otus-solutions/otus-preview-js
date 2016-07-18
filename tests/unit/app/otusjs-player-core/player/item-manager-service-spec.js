describe('ItemManagerService', function() {

    var service;
    var items = [1, 2, 3];

    beforeEach(function() {
        module('otusjs.player.core');

        inject(function(_$injector_) {
            service = _$injector_.get('otusjs.player.core.ItemManagerService');
        });
    });

    describe('init method', function() {

        beforeEach(function() {
            service.init(items);
        });

        it('should holds a list of items to manage', function() {
            expect(service.getItems()).toEqual(items);
        });

        it('should not set a current item', function() {
            expect(service.getCurrentItem()).toBeUndefined();
        });

    });

    describe('hasNext method', function() {

        it('should return true when currentItem is not the last of the list', function() {
            service.init(items);

            expect(service.hasNext()).toBe(true);
        });

        it('should return false when currentItem is the last of the list', function() {
            service.init([jasmine.any(Object)]);
            service.next();

            expect(service.hasNext()).toBe(false);
        });

    });

    describe('hasPrevious method', function() {

        it('should return true when currentItem is not the first of the list', function() {
            service.init(items);
            service.next();
            service.next();

            expect(service.hasPrevious()).toBe(true);
        });

        it('should return false when currentItem is the first of the list', function() {
            service.init([jasmine.any(Object)]);

            expect(service.hasPrevious()).toBe(false);
        });

    });

    describe('next method', function() {

        beforeEach(function() {
            service.init(items);
            service.next();
        });

        it('should point to the next item in the list', function() {
            expect(service.getCurrentItem()).toEqual(1);
        });

        it('should point to undefined when the current item is the last', function() {
            service.next(); // points to element 1
            service.next(); // points to element 2
            service.next(); // points to undefined element

            expect(service.getCurrentItem()).toBeUndefined();
        });

    });

    describe('previous method', function() {

        beforeEach(function() {
            service.init(items);
            service.next();
            service.next();

            service.previous();
        });

        it('should point to the next item in the list', function() {
            expect(service.getCurrentItem()).toEqual(1);
        });

        it('should point to undefined when the current item is the last', function() {
            service.previous(); // points to element 1
            service.previous(); // points to undefined element

            expect(service.getCurrentItem()).toBeUndefined();
        });

    });

});
