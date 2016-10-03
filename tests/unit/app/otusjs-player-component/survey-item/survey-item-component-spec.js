describe('surveyItem component', function() {

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
    $ctrl = $componentController('otusCheckboxQuestion', null, bindings);
    expect($ctrl).toBeDefined();
  });

});
