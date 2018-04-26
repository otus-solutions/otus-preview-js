fdescribe('checkbox question controller component', function() {


  var $ctrl;
  var $componentController;
  var Mock = {};
  var controller;

  beforeEach(function() {
    mockCurrentItemService();

    module('otusjs.player.component', function($provide){
      $provide.value('otusjs.player.data.activity.CurrentItemService', Mock.CurrentItemService);
    });

    //injectins and bindings
    var injections = [
      Mock.CurrentItemService
    ];
    //
    //
    inject(function(_$controller_) {
      mockController(_$controller_, injections);
    });

    mockBindings();
  });

  beforeEach(function(){
    controller.$onInit();
  });

  describe('the initialization', function(){
    it('should have a defined controller', function () {
      expect(controller).toBeDefined();
    });

    it('should build an empty array when CurrentItemService provides a null answer', function () {
      // spyOn(Mock.CurrentItemService, 'getFilling').and.;
    });

  });


  describe('', function(){

  });

  describe('', function(){});


  it('should have a defined controller', function() {
    expect(controller).toBeDefined();
  });


  //mock functions
  function mockController(_$controller_, injections) {
    controller = _$controller_('otusjs.player.component.CheckboxQuestionController', injections);
  }

  function mockCurrentItemService(){
    Mock.CurrentItemService = {
      getFilling:function(){
        return {
          answer:{value:[]}
        };
      }
    };
  }

  function mockBindings(){
    var otusQuestion = {
      answer:{}
    };

    var itemData = {
      options:[]
    };

    controller.otusQuestion = otusQuestion;
    controller.itemData = itemData;
  }



});
