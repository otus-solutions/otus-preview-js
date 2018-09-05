describe('autocomplete question controller component', function () {
  var Mock = {};
  var controller;

  beforeEach(function () {
    mockInjections();

    angular.mock.module('otusjs.player.component', function ($provide) {
      $provide.value('otusjs.player.data.activity.CurrentItemService', Mock.CurrentItemService);
      $provide.value('otusjs.utils.DatasourceService', Mock.DatasourceService);
      $provide.value('otusjs.utils.SearchQueryFactory', Mock.SearchQueryFactory);
    });


    var injections = [
      Mock.CurrentItemService
    ];


    inject(function (_$controller_) {
      mockController(_$controller_, injections);
    });

    mockBindings();
  });


  describe('the initialization', function () {
    it('should have a defined controller', function () {
      expect(controller).toBeDefined();
    });

    it('should build an new answer the itemData when CurrentItemService provides a null answer', function () {
      spyOn(Mock.CurrentItemService, 'getFilling').and.returnValue(Mock.nullAnswer);
      controller.$onInit();

    });

    it('should build an not empty answer when CurrentItemService provides a not empty answer', function () {
      spyOn(Mock.CurrentItemService, 'getFilling').and.returnValue(Mock.arrayAnswer);
      controller.$onInit();

      expect(controller.answer).toEqual(Mock.arrayAnswer.answer.value);
      expect(controller.view).toEqual(false);

    });

  });

  describe('the clear function call', function () {
    beforeEach(function () {
      controller.answer = [];
      spyOn(controller, 'clear').and.callThrough();
      spyOn(Mock.CurrentItemService, 'getFilling').and.returnValue(Mock.arrayAnswer);

      controller.clear();
    });

    it('should call clear function with success', function () {
      expect(controller.answer).toBeUndefined();
    });
  });



  describe('the update function and the parent onUpdate function call', function () {
    beforeEach(function () {
      spyOn(Mock.CurrentItemService, 'getFilling').and.returnValue(Mock.arrayAnswer);
      spyOn(controller, 'onUpdate').and.callThrough();


      controller.$onInit();
    });

    it('should  call with self.answer if some option is true', function () {
      controller.answer = {value: Mock.arrayAnswer.answer.value};
      controller.update();

      var answerObject = {
        valueType: 'answer',
        value: Mock.arrayAnswer.answer.value
      };
      expect(controller.onUpdate).toHaveBeenCalledWith(answerObject);

    });

    it('should  call with null if any option is true', function () {
      controller.answer = null;

      controller.update();

      var answerObject = {
        valueType: 'answer',
        value: null
      };
      expect(controller.onUpdate).toHaveBeenCalledWith(answerObject);

    });
  });


  //mock functions
  function mockController(_$controller_, injections) {
    controller = _$controller_('otusAutocompleteQuestionCtrl', injections);
  }

  function mockInjections() {
    Mock.nullAnswer = {answer: {value: null}};
    Mock.arrayAnswer = {
      answer: {
        value: 'Medicamentos',
        'objectType': 'AnswerFill',
        'type': 'AutocompleteQuestion',
        clear: function () {}
      }
    };

    Mock.CurrentItemService = {
      getFilling: function () {
        return Mock.answer;
      }
    };

    Mock.DatasourceService = {
      fetchDatasources: function (templateID) {
        return Promise.resolve("medicamentos");
      }
    };

    Mock.SearchQueryFactory = {
      newStringSearch : function () {
        var self = this;
        self.perform = perform;

        function perform(text) {
          return Promise.resolve(text);
        }

        return self;
      }
    };
  }

  function mockBindings() {
    Mock.parentContainer = {
      onUpdate: function () {}
    };

    var otusQuestion = {
      answer: {}
    };

    var itemData = {
      "dataSources" : [
        "medicamentos"
      ],
      "label" : {
        "ptBR" : {
          "extends" : "StudioObject",
          "objectType" : "Label",
          "oid" : "",
          "plainText" : "ENTREVISTADOR",
          "formattedText" : "<div style='text-align: justify;'><b>ENTREVISTADOR: </b></div>"
        }
      },
      "metadata" : {
        "extents" : "StudioObject",
        "objectType" : "MetadataGroup",
        "options" : [
          {
            "extends" : "StudioObject",
            "objectType" : "MetadataAnswer",
            "dataType" : "Integer",
            "value" : 1,
            "extractionValue" : ".Q",
            "label" : {
              "ptBR" : {
                "extends" : "StudioObject",
                "objectType" : "Label",
                "oid" : "",
                "plainText" : "Não quer responder",
                "formattedText" : "<div>Não quer responder</div>"
              }
            }
          },
          {
            "extends" : "StudioObject",
            "objectType" : "MetadataAnswer",
            "dataType" : "Integer",
            "value" : 2,
            "extractionValue" : ".S",
            "label" : {
              "ptBR" : {
                "extends" : "StudioObject",
                "objectType" : "Label",
                "oid" : "",
                "plainText" : "Não sabe",
                "formattedText" : "Não sabe"
              },
              "enUS" : {
                "extends" : "StudioObject",
                "objectType" : "Label",
                "oid" : "",
                "plainText" : "",
                "formattedText" : ""
              },
              "esES" : {
                "extends" : "StudioObject",
                "objectType" : "Label",
                "oid" : "",
                "plainText" : "",
                "formattedText" : ""
              }
            }
          },
          {
            "extends" : "StudioObject",
            "objectType" : "MetadataAnswer",
            "dataType" : "Integer",
            "value" : 3,
            "extractionValue" : ".A",
            "label" : {
              "ptBR" : {
                "extends" : "StudioObject",
                "objectType" : "Label",
                "oid" : "",
                "plainText" : "Não se aplica",
                "formattedText" : "Não se aplica"
              }
            }
          },
          {
            "extends" : "StudioObject",
            "objectType" : "MetadataAnswer",
            "dataType" : "Integer",
            "value" : 4,
            "extractionValue" : ".F",
            "label" : {
              "ptBR" : {
                "extends" : "StudioObject",
                "objectType" : "Label",
                "oid" : "",
                "plainText" : "Não há dados",
                "formattedText" : "Não há dados"
              }
            }
          }
        ]
      },
      "fillingRules" : {
        "extends" : "StudioObject",
        "objectType" : "FillingRules",
        "options" : {
          "mandatory" : {
            "data" : {
              "reference" : true,
              "canBeIgnored" : false
            },
            "extends" : "StudioObject",
            "objectType" : "Rule",
            "validatorType" : "mandatory"
          }
        }
      },
      "extents" : "SurveyItem",
      "objectType" : "AutocompleteQuestion",
      "templateID" : "TST2",
      "customID" : "TST2_1",
      "dataType" : "String"
    };

    controller.otusQuestion = otusQuestion;
    controller.itemData = itemData;
    controller.onUpdate = Mock.parentContainer.onUpdate;
  }


});
