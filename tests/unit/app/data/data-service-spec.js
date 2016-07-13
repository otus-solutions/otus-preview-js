describe('DataService', function() {

    var Mock = {};
    var service;

    beforeEach(function() {
        module('otus.preview');

        inject(function(_$injector_) {
            service = _$injector_.get('DataService', {
                ActivityFacadeService: mockActivityFacadeService(_$injector_)
            });
        });
    });

    describe('transferData method', function() {

        it('should call ActivityFacadeService.fillQuestion', function() {
            service.transferData(mockFillingData());

            expect(Mock.ActivityFacadeService.fillQuestion).toHaveBeenCalled();
        });

    });

    function mockActivityFacadeService($injector) {
        Mock.ActivityFacadeService = $injector.get('ActivityFacadeService');
        spyOn(Mock.ActivityFacadeService, 'fillQuestion');
        return Mock.ActivityFacadeService;
    }

    function mockFillingData() {
        return {
            answer: 'Olá',
            metadata: 1,
            comment: 'Tchau!'
        };
    }

});
