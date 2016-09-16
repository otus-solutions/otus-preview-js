xdescribe('surveyItem component', function() {
    var $ctrl;
    var $componentController;
    var Mock = {};

    beforeEach(function() {
        module('otusjs.player.component');
        inject(function(_$componentController_) {
            $componentController = _$componentController_;
        });
    });

    it('should have a defined controller', function() {
        var bindings = {
            'itemData': '<'
        };
        console.log($componentController);
        $ctrl = $componentController('otusCheckboxQuestion', null, bindings);
        console.log($ctrl);
        expect($ctrl).toBeDefined();
    });

    function mockCurrentQuestion(_$injector) {

    }

});
