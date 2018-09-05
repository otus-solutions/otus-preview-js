describe('autocomplete question controller component', function () {
  var Mock = {};
  var controller;

  beforeEach(function () {
    mockInjections();

    angular.mock.module('otusjs.player.component', function ($provide) {
      $provide.value('otusjs.player.data.activity.CurrentItemService', Mock.CurrentItemService);
      $provide.value('otusjs.utils.DatasourceService', Mock.CurrentItemService);
      $provide.value('otusjs.utils.SearchQueryFactory', Mock.CurrentItemService);
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

    it('should build an new option array using the itemData when CurrentItemService provides a null answer', function () {
      spyOn(Mock.CurrentItemService, 'getFilling').and.returnValue(Mock.nullAnswer);
      controller.$onInit();

      expect(controller.answerArray.length).toEqual(controller.itemData.options.length);

      controller.answerArray.forEach(function (answer, index) {
        expect(answer.option).toEqual(controller.itemData.options[index].customOptionID);
      });
    });

    it('should build an not empty array when CurrentItemService provides a not empty array as answer', function () {
      spyOn(Mock.CurrentItemService, 'getFilling').and.returnValue(Mock.arrayAnswer);
      controller.$onInit();

      expect(controller.answerArray).toEqual(Mock.arrayAnswer.answer.value);

    });

  });

  describe('the clear function call', function () {
    beforeEach(function () {
      spyOn(controller, 'clear').and.callThrough();
      spyOn(Mock.CurrentItemService, 'getFilling').and.returnValue(Mock.arrayAnswer);
      // controller.answerArray = [];
      controller.clear();
    });

    it('should call clear function with success', function () {
      expect(controller.answerArray).not.toBeUndefined();
    });
  });



  describe('the update function and the parent onUpdate function call', function () {
    beforeEach(function () {
      spyOn(Mock.CurrentItemService, 'getFilling').and.returnValue(Mock.nullAnswer);
      spyOn(controller, 'onUpdate').and.callThrough();


      controller.$onInit();
    });

    it('should  call with self.answerArray if some option is true', function () {
      controller.answerArray = Mock.arrayAnswer.answer.value;
      controller.update();

      var answerObject = {
        valueType: 'answer',
        value: controller.answerArray
      };
      expect(controller.onUpdate).toHaveBeenCalledWith(answerObject);

    });

    it('should  call with null if any option is true', function () {
      controller.answerArray = Mock.arrayAnswer.answer.value;

      controller.answerArray.forEach(function (answer) {
        answer.state = false;
      });
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
        'value': 'MEDICAMENTO',
        'objectType': 'AnswerFill',
        'type': 'AutocompleteQuestion',
        clear: function () {}
      }
    };

    Mock.CurrentItemService = {
      getFilling: function () {
        return Mock.answerArray;
      }
    };

    Mock.DatasourceService = {
      fetchDatasources: function (templateID) {
        return Promise.resolve("medicamentos");
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
