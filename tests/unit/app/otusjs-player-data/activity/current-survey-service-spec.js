describe('Current Question Service', function() {

  var UNIT_NAME = 'otusjs.player.data.activity.CurrentSurveyService';
  var Mock = {};
  var Injections = {};
  var service;
  var CAD1 = 'CAD1';
  var CAD2 = 'CAD2';
  var CAD90 = 'CAD90';

  beforeEach(function() {
    module('otusjs.player.data');

    inject(function(_$injector_) {
      /* Test data */
      mockSurvey();

      /* Injectable mocks */
      mockModelActivityFacadeService(_$injector_);

      service = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('getAnswerByItemID method', function() {

    beforeEach(function() {
      service.setup(Mock.ActivityFacadeService.surveyActivity);
    });

    it('should retrieve the filling of item from survey activity', function() {
      spyOn(Mock.ActivityFacadeService, 'getFillingByQuestionID');

      service.getAnswerByItemID(CAD1);

      expect(Mock.ActivityFacadeService.getFillingByQuestionID).toHaveBeenCalledWith(CAD1);
    });

  });

  describe('getItems method', function() {

    beforeEach(function() {
      service.setup(Mock.ActivityFacadeService.surveyActivity);
    });

    it('should return the items of current survey', function() {
      expect(service.getItems()).toEqual(Mock.surveyTemplate.itemContainer);
    });

  });

  describe('getItemByCustomID method', function() {

    beforeEach(function() {
      service.setup(Mock.ActivityFacadeService.surveyActivity);
    });

    describe('when exists an item', function() {

      it('should return the item', function() {
        var item = service.getItemByCustomID(CAD2);

        expect(item.customID).toEqual(CAD2);
      });

    });

    describe('when not exists an item', function() {

      it('should return null', function() {
        var item = service.getItemByCustomID(CAD90);

        expect(item).toBe(null);
      });

    });

  });

  describe('getNavigations method', function() {

    beforeEach(function() {
      service.setup(Mock.ActivityFacadeService.surveyActivity);
    });

    it('should return the list of navigations of current survey', function() {
      var value = service.getNavigations();

      expect(value).toEqual(Mock.surveyTemplate.navigationList);
    });

  });

  describe('getNavigationByOrigin method', function() {

    beforeEach(function() {
      service.setup(Mock.ActivityFacadeService.surveyActivity);
    });

    describe('when exists a navigation', function() {

      it('should return the navigation of origin', function() {
        var navigation = service.getNavigationByOrigin(CAD1);

        expect(navigation.origin).toEqual(CAD1);
      });

    });

    describe('when not exists a navigation', function() {

      it('should return null', function() {
        var navigation = service.getNavigationByOrigin(CAD90);

        expect(navigation).toEqual(null);
      });

    });

  });

  describe('initialize method', function() {

    it('should open the survey activity', function() {
      spyOn(Mock.ActivityFacadeService, 'openActivitySurvey');

      service.initialize();

      expect(Mock.ActivityFacadeService.openActivitySurvey).toHaveBeenCalledWith();
    });

  });

  describe('setup method', function() {

    it('should initialize the survey activity', function() {
      spyOn(Mock.ActivityFacadeService, 'initializeActivitySurvey');

      service.setup();

      expect(Mock.ActivityFacadeService.initializeActivitySurvey).toHaveBeenCalledWith();
    });

  });

  function mockSurvey() {
    mockSurveyData();

    Mock.surveyTemplate.SurveyItemManager = {};
    Mock.surveyTemplate.SurveyItemManager.getItemList = jasmine.createSpy('getItemList').and.returnValue(Mock.surveyTemplate.itemContainer);
    Mock.surveyTemplate.SurveyItemManager.getItemByTemplateID = jasmine.createSpy('getItemByTemplateID').and.returnValue(Mock.surveyTemplate.itemContainer[1]);

    Mock.CAD1Navigation = Mock.surveyTemplate.navigationList[0];
    Mock.CAD1Navigation.listRoutes = jasmine.createSpy('listRoutes').and.returnValue(Mock.CAD1Navigation.routes);

    Mock.surveyTemplate.NavigationManager = {};
    Mock.surveyTemplate.NavigationManager.getNavigationList = jasmine.createSpy('getNavigationList').and.returnValue(Mock.surveyTemplate.navigationList);
    Mock.surveyTemplate.NavigationManager.selectNavigationByOrigin = jasmine.createSpy('selectNavigationByOrigin').and.returnValue(Mock.CAD1Navigation);
  }

  function mockSurveyData() {
    Mock.surveyTemplate = {
      "extents": "StudioObject",
      "objectType": "Survey",
      "oid": "dXNlclVVSUQ6W3VuZGVmaW5lZF1zdXJ2ZXlVVUlEOls2YWM5MjJiMC01ZTJiLTExZTYtOGE0ZS01ZGQyNzhhODUzNTddcmVwb3NpdG9yeVVVSUQ6WyBOb3QgZG9uZSB5ZXQgXQ==",
      "identity": {
        "extents": "StudioObject",
        "objectType": "SurveyIdentity",
        "name": "Cadastramento",
        "acronym": "CAD",
        "recommendedTo": "",
        "description": "",
        "keywords": []
      },
      "metainfo": {
        "extents": "StudioObject",
        "objectType": "SurveyMetaInfo",
        "creationDatetime": 1470745124954,
        "otusStudioVersion": ""
      },
      "itemContainer": [{
        "extents": "SurveyItem",
        "objectType": "TextQuestion",
        "templateID": "CAD1",
        "customID": "CAD1",
        "dataType": "String",
        "label": {
          "ptBR": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "1. Qual é o seu nome?",
            "formattedText": "1. Qual é o seu nome?"
          },
          "enUS": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          },
          "esES": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          }
        },
        "metadata": {
          "extents": "StudioObject",
          "objectType": "MetadataGroup",
          "options": [{
            "extends": "StudioObject",
            "objectType": "MetadataAnswer",
            "dataType": "Integer",
            "value": 1,
            "label": {
              "ptBR": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "Não quer responder",
                "formattedText": "Não quer responder"
              },
              "enUS": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              },
              "esES": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              }
            }
          }]
        },
        "fillingRules": {
          "extends": "StudioObject",
          "objectType": "FillingRules",
          "options": {
            "mandatory": {
              "extends": "StudioObject",
              "objectType": "Rule",
              "validatorType": "mandatory",
              "data": {
                "reference": true
              }
            },
            "minLength": {
              "extends": "StudioObject",
              "objectType": "Rule",
              "validatorType": "minLength",
              "data": {
                "size": null,
                "reference": 5
              }
            }
          }
        }
      }, {
        "extents": "SurveyItem",
        "objectType": "CalendarQuestion",
        "templateID": "CAD2",
        "customID": "CAD2",
        "dataType": "LocalDate",
        "label": {
          "ptBR": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "2. Qual é a data de seu nascimento?",
            "formattedText": "2. Qual é a data de seu nascimento?"
          },
          "enUS": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          },
          "esES": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          }
        },
        "metadata": {
          "extents": "StudioObject",
          "objectType": "MetadataGroup",
          "options": [{
            "extends": "StudioObject",
            "objectType": "MetadataAnswer",
            "dataType": "Integer",
            "value": 1,
            "label": {
              "ptBR": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "Não quer responder",
                "formattedText": "Não quer responder"
              },
              "enUS": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              },
              "esES": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              }
            }
          }, {
            "extends": "StudioObject",
            "objectType": "MetadataAnswer",
            "dataType": "Integer",
            "value": 2,
            "label": {
              "ptBR": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "Não sabe responder",
                "formattedText": "Não sabe responder"
              },
              "enUS": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              },
              "esES": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              }
            }
          }]
        },
        "fillingRules": {
          "extends": "StudioObject",
          "objectType": "FillingRules",
          "options": {
            "mandatory": {
              "extends": "StudioObject",
              "objectType": "Rule",
              "validatorType": "mandatory",
              "data": {
                "reference": true
              }
            }
          }
        }
      }, {
        "extents": "SurveyItem",
        "objectType": "SingleSelectionQuestion",
        "templateID": "CAD3",
        "customID": "CAD3",
        "dataType": "Integer",
        "label": {
          "ptBR": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "3. Seu gênero é:",
            "formattedText": "3. Seu gênero é:"
          },
          "enUS": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          },
          "esES": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          }
        },
        "options": [{
          "extents": "StudioObject",
          "objectType": "AnswerOption",
          "value": 1,
          "dataType": "Integer",
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "Feminino",
              "formattedText": "Feminino"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          }
        }, {
          "extents": "StudioObject",
          "objectType": "AnswerOption",
          "value": 2,
          "dataType": "Integer",
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "Masculino",
              "formattedText": "Masculino"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          }
        }, {
          "extents": "StudioObject",
          "objectType": "AnswerOption",
          "value": 3,
          "dataType": "Integer",
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "Outro",
              "formattedText": "Outro"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          }
        }],
        "metadata": {
          "extents": "StudioObject",
          "objectType": "MetadataGroup",
          "options": [{
            "extends": "StudioObject",
            "objectType": "MetadataAnswer",
            "dataType": "Integer",
            "value": 1,
            "label": {
              "ptBR": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "Não se aplica",
                "formattedText": "Não se aplica"
              },
              "enUS": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              },
              "esES": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              }
            }
          }, {
            "extends": "StudioObject",
            "objectType": "MetadataAnswer",
            "dataType": "Integer",
            "value": 2,
            "label": {
              "ptBR": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "Não quer responder",
                "formattedText": "Não quer responder"
              },
              "enUS": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              },
              "esES": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              }
            }
          }, {
            "extends": "StudioObject",
            "objectType": "MetadataAnswer",
            "dataType": "Integer",
            "value": 3,
            "label": {
              "ptBR": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "Não sabe responder",
                "formattedText": "Não sabe responder"
              },
              "enUS": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              },
              "esES": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              }
            }
          }]
        },
        "fillingRules": {
          "extends": "StudioObject",
          "objectType": "FillingRules",
          "options": {
            "mandatory": {
              "extends": "StudioObject",
              "objectType": "Rule",
              "validatorType": "mandatory",
              "data": {
                "reference": true
              }
            }
          }
        }
      }, {
        "extents": "SurveyItem",
        "objectType": "TextQuestion",
        "templateID": "CAD4",
        "customID": "CAD4",
        "dataType": "String",
        "label": {
          "ptBR": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "4. Qual outro?",
            "formattedText": "4. Qual outro?"
          },
          "enUS": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          },
          "esES": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          }
        },
        "metadata": {
          "extents": "StudioObject",
          "objectType": "MetadataGroup",
          "options": [{
            "extends": "StudioObject",
            "objectType": "MetadataAnswer",
            "dataType": "Integer",
            "value": 1,
            "label": {
              "ptBR": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "Não se aplica",
                "formattedText": "Não se aplica"
              },
              "enUS": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              },
              "esES": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              }
            }
          }, {
            "extends": "StudioObject",
            "objectType": "MetadataAnswer",
            "dataType": "Integer",
            "value": 2,
            "label": {
              "ptBR": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "Não quer responder",
                "formattedText": "Não quer responder"
              },
              "enUS": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              },
              "esES": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              }
            }
          }, {
            "extends": "StudioObject",
            "objectType": "MetadataAnswer",
            "dataType": "Integer",
            "value": 3,
            "label": {
              "ptBR": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "Não sabe responder",
                "formattedText": "Não sabe responder"
              },
              "enUS": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              },
              "esES": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              }
            }
          }]
        },
        "fillingRules": {
          "extends": "StudioObject",
          "objectType": "FillingRules",
          "options": {
            "mandatory": {
              "extends": "StudioObject",
              "objectType": "Rule",
              "validatorType": "mandatory",
              "data": {
                "reference": true
              }
            }
          }
        }
      }, {
        "extents": "SurveyItem",
        "objectType": "SingleSelectionQuestion",
        "templateID": "CAD5",
        "customID": "CAD5",
        "dataType": "Integer",
        "label": {
          "ptBR": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "5.  Qual é a sua nacionalidade?",
            "formattedText": "5. &nbsp;Qual é a sua nacionalidade?"
          },
          "enUS": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          },
          "esES": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          }
        },
        "options": [{
          "extents": "StudioObject",
          "objectType": "AnswerOption",
          "value": 1,
          "dataType": "Integer",
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "Brasileira",
              "formattedText": "Brasileira"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          }
        }, {
          "extents": "StudioObject",
          "objectType": "AnswerOption",
          "value": 2,
          "dataType": "Integer",
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "Outra",
              "formattedText": "Outra"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          }
        }],
        "metadata": {
          "extents": "StudioObject",
          "objectType": "MetadataGroup",
          "options": [{
            "extends": "StudioObject",
            "objectType": "MetadataAnswer",
            "dataType": "Integer",
            "value": 1,
            "label": {
              "ptBR": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "Não se aplica",
                "formattedText": "Não se aplica"
              },
              "enUS": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              },
              "esES": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              }
            }
          }, {
            "extends": "StudioObject",
            "objectType": "MetadataAnswer",
            "dataType": "Integer",
            "value": 2,
            "label": {
              "ptBR": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "Não quer responder",
                "formattedText": "Não quer responder"
              },
              "enUS": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              },
              "esES": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              }
            }
          }, {
            "extends": "StudioObject",
            "objectType": "MetadataAnswer",
            "dataType": "Integer",
            "value": 3,
            "label": {
              "ptBR": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "Não sabe responder",
                "formattedText": "Não sabe responder"
              },
              "enUS": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              },
              "esES": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              }
            }
          }]
        },
        "fillingRules": {
          "extends": "StudioObject",
          "objectType": "FillingRules",
          "options": {
            "mandatory": {
              "extends": "StudioObject",
              "objectType": "Rule",
              "validatorType": "mandatory",
              "data": {
                "reference": true
              }
            }
          }
        }
      }, {
        "extents": "SurveyItem",
        "objectType": "TextQuestion",
        "templateID": "CAD6",
        "customID": "CAD6",
        "dataType": "String",
        "label": {
          "ptBR": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "6. Qual outra?",
            "formattedText": "6. Qual outra?"
          },
          "enUS": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          },
          "esES": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          }
        },
        "metadata": {
          "extents": "StudioObject",
          "objectType": "MetadataGroup",
          "options": [{
            "extends": "StudioObject",
            "objectType": "MetadataAnswer",
            "dataType": "Integer",
            "value": 1,
            "label": {
              "ptBR": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "Não se aplica",
                "formattedText": "Não se aplica"
              },
              "enUS": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              },
              "esES": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              }
            }
          }, {
            "extends": "StudioObject",
            "objectType": "MetadataAnswer",
            "dataType": "Integer",
            "value": 2,
            "label": {
              "ptBR": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "Não quer responder",
                "formattedText": "Não quer responder"
              },
              "enUS": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              },
              "esES": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              }
            }
          }, {
            "extends": "StudioObject",
            "objectType": "MetadataAnswer",
            "dataType": "Integer",
            "value": 3,
            "label": {
              "ptBR": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "Não sabe responder",
                "formattedText": "Não sabe responder"
              },
              "enUS": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              },
              "esES": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              }
            }
          }]
        },
        "fillingRules": {
          "extends": "StudioObject",
          "objectType": "FillingRules",
          "options": {
            "mandatory": {
              "extends": "StudioObject",
              "objectType": "Rule",
              "validatorType": "mandatory",
              "data": {
                "reference": true
              }
            }
          }
        }
      }, {
        "extents": "SurveyItem",
        "objectType": "SingleSelectionQuestion",
        "templateID": "CAD7",
        "customID": "CAD7",
        "dataType": "Integer",
        "label": {
          "ptBR": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "7. Você deseja fazer parte do estudo?",
            "formattedText": "7. Você deseja fazer parte do estudo?"
          },
          "enUS": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          },
          "esES": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          }
        },
        "options": [{
          "extents": "StudioObject",
          "objectType": "AnswerOption",
          "value": 1,
          "dataType": "Integer",
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "Não",
              "formattedText": "Não"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          }
        }, {
          "extents": "StudioObject",
          "objectType": "AnswerOption",
          "value": 2,
          "dataType": "Integer",
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "Sim",
              "formattedText": "Sim"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          }
        }],
        "metadata": {
          "extents": "StudioObject",
          "objectType": "MetadataGroup",
          "options": [{
            "extends": "StudioObject",
            "objectType": "MetadataAnswer",
            "dataType": "Integer",
            "value": 1,
            "label": {
              "ptBR": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "Não se aplica",
                "formattedText": "Não se aplica"
              },
              "enUS": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              },
              "esES": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              }
            }
          }, {
            "extends": "StudioObject",
            "objectType": "MetadataAnswer",
            "dataType": "Integer",
            "value": 2,
            "label": {
              "ptBR": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "Não sabe responder",
                "formattedText": "Não sabe responder"
              },
              "enUS": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              },
              "esES": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              }
            }
          }]
        },
        "fillingRules": {
          "extends": "StudioObject",
          "objectType": "FillingRules",
          "options": {
            "mandatory": {
              "extends": "StudioObject",
              "objectType": "Rule",
              "validatorType": "mandatory",
              "data": {
                "reference": true
              }
            }
          }
        }
      }, {
        "extents": "SurveyItem",
        "objectType": "CheckboxQuestion",
        "templateID": "CAD8",
        "customID": "CAD8",
        "dataType": "Array",
        "label": {
          "ptBR": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "8. Por favor, assinale as razões para participar, como voluntário, do estudo:",
            "formattedText": "8. Por favor, assinale as razões para participar, como voluntário, do estudo:"
          },
          "enUS": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          },
          "esES": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          }
        },
        "options": [{
          "extents": "StudioObject",
          "objectType": "CheckboxAnswerOption",
          "dataType": "Boolean",
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "Irá auxiliar em minha formação",
              "formattedText": "Irá auxiliar em minha formação"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          }
        }, {
          "extents": "StudioObject",
          "objectType": "CheckboxAnswerOption",
          "dataType": "Boolean",
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "Experiência em campo",
              "formattedText": "Experiência em campo"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          }
        }, {
          "extents": "StudioObject",
          "objectType": "CheckboxAnswerOption",
          "dataType": "Boolean",
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "Curiosidade",
              "formattedText": "Curiosidade"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          }
        }, {
          "extents": "StudioObject",
          "objectType": "CheckboxAnswerOption",
          "dataType": "Boolean",
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "Apenas preciso cumprir carga horária complementar em meu curso",
              "formattedText": "Apenas preciso cumprir carga horária complementar em meu curso"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          }
        }, {
          "extents": "StudioObject",
          "objectType": "CheckboxAnswerOption",
          "dataType": "Boolean",
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "Interesse em seguir pesquisando o tema",
              "formattedText": "Interesse em seguir pesquisando o tema"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          }
        }, {
          "extents": "StudioObject",
          "objectType": "CheckboxAnswerOption",
          "dataType": "Boolean",
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "Outro",
              "formattedText": "Outro"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          }
        }],
        "metadata": {
          "extents": "StudioObject",
          "objectType": "MetadataGroup",
          "options": [{
            "extends": "StudioObject",
            "objectType": "MetadataAnswer",
            "dataType": "Integer",
            "value": 1,
            "label": {
              "ptBR": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "Não sabe responder",
                "formattedText": "Não sabe responder"
              },
              "enUS": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              },
              "esES": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              }
            }
          }, {
            "extends": "StudioObject",
            "objectType": "MetadataAnswer",
            "dataType": "Integer",
            "value": 2,
            "label": {
              "ptBR": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "Não quer responder",
                "formattedText": "Não quer responder"
              },
              "enUS": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              },
              "esES": {
                "extends": "StudioObject",
                "objectType": "Label",
                "oid": "",
                "plainText": "",
                "formattedText": ""
              }
            }
          }]
        },
        "fillingRules": {
          "extends": "StudioObject",
          "objectType": "FillingRules",
          "options": {
            "mandatory": {
              "extends": "StudioObject",
              "objectType": "Rule",
              "validatorType": "mandatory",
              "data": {
                "reference": true
              }
            }
          }
        }
      }, {
        "extents": "SurveyItem",
        "objectType": "TextQuestion",
        "templateID": "CAD9",
        "customID": "CAD9",
        "dataType": "String",
        "label": {
          "ptBR": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "9. Qual a outra razão?",
            "formattedText": "9. Qual a outra razão?"
          },
          "enUS": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          },
          "esES": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          }
        },
        "metadata": {
          "extents": "StudioObject",
          "objectType": "MetadataGroup",
          "options": []
        },
        "fillingRules": {
          "extends": "StudioObject",
          "objectType": "FillingRules",
          "options": {
            "mandatory": {
              "extends": "StudioObject",
              "objectType": "Rule",
              "validatorType": "mandatory",
              "data": {
                "reference": true
              }
            }
          }
        }
      }, {
        "extents": "SurveyItem",
        "objectType": "SingleSelectionQuestion",
        "templateID": "CAD10",
        "customID": "CAD10",
        "dataType": "Integer",
        "label": {
          "ptBR": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "10. Classifique de 1 a 5 sua satisfação com esse formulário:nn1 - Nada satisfeito (a)n3 - Satisfeito (a)n5 - Muito satisfeito (a)n",
            "formattedText": "<span style='letter-spacing: 0.14px;'>10. Classifique de 1 a 5 sua satisfação com esse formulário:</span><div style='letter-spacing: 0.14px;'><br>1 - Nada satisfeito (a)<div>3 - Satisfeito (a)</div><div>5 - Muito satisfeito (a)</div></div>"
          },
          "enUS": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          },
          "esES": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          }
        },
        "options": [{
          "extents": "StudioObject",
          "objectType": "AnswerOption",
          "value": 1,
          "dataType": "Integer",
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "1",
              "formattedText": "1"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          }
        }, {
          "extents": "StudioObject",
          "objectType": "AnswerOption",
          "value": 2,
          "dataType": "Integer",
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "2",
              "formattedText": "2"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          }
        }, {
          "extents": "StudioObject",
          "objectType": "AnswerOption",
          "value": 3,
          "dataType": "Integer",
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "3",
              "formattedText": "3"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          }
        }, {
          "extents": "StudioObject",
          "objectType": "AnswerOption",
          "value": 4,
          "dataType": "Integer",
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "4",
              "formattedText": "4"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          }
        }, {
          "extents": "StudioObject",
          "objectType": "AnswerOption",
          "value": 5,
          "dataType": "Integer",
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "5",
              "formattedText": "5"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          }
        }],
        "metadata": {
          "extents": "StudioObject",
          "objectType": "MetadataGroup",
          "options": []
        },
        "fillingRules": {
          "extends": "StudioObject",
          "objectType": "FillingRules",
          "options": {
            "mandatory": {
              "extends": "StudioObject",
              "objectType": "Rule",
              "validatorType": "mandatory",
              "data": {
                "reference": true
              }
            }
          }
        }
      }, {
        "extents": "SurveyItem",
        "objectType": "ImageItem",
        "templateID": "CAD11",
        "customID": "CAD11",
        "dataType": "String",
        "url": "https://i.ytimg.com/vi/_1CF2IWZGZo/maxresdefault.jpg",
        "footer": {
          "ptBR": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "Poxa...",
            "formattedText": "Poxa..."
          },
          "enUS": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          },
          "esES": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          }
        }
      }, {
        "extents": "SurveyItem",
        "objectType": "ImageItem",
        "templateID": "CAD12",
        "customID": "CAD12",
        "dataType": "String",
        "url": "http://bolaof1.com.br/imagens/memes/neutral-poker-face-no-text.jpg",
        "footer": {
          "ptBR": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": ":S",
            "formattedText": ":S"
          },
          "enUS": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          },
          "esES": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          }
        }
      }, {
        "extents": "SurveyItem",
        "objectType": "ImageItem",
        "templateID": "CAD13",
        "customID": "CAD13",
        "dataType": "String",
        "url": "http://kingofwallpapers.com/happy/happy-001.jpg",
        "footer": {
          "ptBR": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "Uhuu!",
            "formattedText": "Uhuu!"
          },
          "enUS": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          },
          "esES": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          }
        }
      }, {
        "extents": "SurveyItem",
        "objectType": "TextItem",
        "templateID": "CAD14",
        "customID": "CAD14",
        "dataType": "String",
        "value": {
          "ptBR": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "Vlw flw",
            "formattedText": "Vlw flw"
          },
          "enUS": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          },
          "esES": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          }
        }
      }, {
        "extents": "SurveyItem",
        "objectType": "IntegerQuestion",
        "templateID": "CAD15",
        "customID": "CAD15",
        "dataType": "Integer",
        "label": {
          "ptBR": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          },
          "enUS": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          },
          "esES": {
            "extends": "StudioObject",
            "objectType": "Label",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          }
        },
        "metadata": {
          "extents": "StudioObject",
          "objectType": "MetadataGroup",
          "options": []
        },
        "unit": {
          "ptBR": {
            "extends": "StudioObject",
            "objectType": "Unit",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          },
          "enUS": {
            "extends": "StudioObject",
            "objectType": "Unit",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          },
          "esES": {
            "extends": "StudioObject",
            "objectType": "Unit",
            "oid": "",
            "plainText": "",
            "formattedText": ""
          }
        },
        "fillingRules": {
          "extends": "StudioObject",
          "objectType": "FillingRules",
          "options": {
            "mandatory": {
              "extends": "StudioObject",
              "objectType": "Rule",
              "validatorType": "mandatory",
              "data": {
                "reference": false
              }
            },
            "lowerLimit": {
              "extends": "StudioObject",
              "objectType": "Rule",
              "validatorType": "lowerLimit",
              "data": {
                "reference": null
              }
            }
          }
        }
      }],
      "navigationList": [{
        "extents": "StudioObject",
        "objectType": "Navigation",
        "origin": "CAD1",
        "index": 0,
        "inNavigations": [],
        "isDefault": true,
        "routes": [{
          "extents": "StudioObject",
          "objectType": "Route",
          "name": "CAD1_CAD2",
          "origin": "CAD1",
          "destination": "CAD2",
          "isDefault": true,
          "conditions": []
        }]
      }, {
        "extents": "StudioObject",
        "objectType": "Navigation",
        "origin": "CAD2",
        "index": 1,
        "inNavigations": [{
          "origin": "CAD1",
          "isDefaultPath": true,
          "isDefaultRoute": true
        }],
        "isDefault": true,
        "routes": [{
          "extents": "StudioObject",
          "objectType": "Route",
          "name": "CAD2_CAD3",
          "origin": "CAD2",
          "destination": "CAD3",
          "isDefault": true,
          "conditions": []
        }]
      }, {
        "extents": "StudioObject",
        "objectType": "Navigation",
        "origin": "CAD3",
        "index": 2,
        "inNavigations": [{
          "origin": "CAD2",
          "isDefaultPath": true,
          "isDefaultRoute": true
        }],
        "isDefault": true,
        "routes": [{
          "extents": "StudioObject",
          "objectType": "Route",
          "name": "CAD3_CAD4",
          "origin": "CAD3",
          "destination": "CAD4",
          "isDefault": true,
          "conditions": []
        }]
      }, {
        "extents": "StudioObject",
        "objectType": "Navigation",
        "origin": "CAD4",
        "index": 3,
        "inNavigations": [{
          "origin": "CAD3",
          "isDefaultPath": true,
          "isDefaultRoute": true
        }],
        "isDefault": true,
        "routes": [{
          "extents": "StudioObject",
          "objectType": "Route",
          "name": "CAD4_CAD5",
          "origin": "CAD4",
          "destination": "CAD5",
          "isDefault": true,
          "conditions": []
        }]
      }, {
        "extents": "StudioObject",
        "objectType": "Navigation",
        "origin": "CAD5",
        "index": 4,
        "inNavigations": [{
          "origin": "CAD4",
          "isDefaultPath": true,
          "isDefaultRoute": true
        }],
        "isDefault": true,
        "routes": [{
          "extents": "StudioObject",
          "objectType": "Route",
          "name": "CAD5_CAD6",
          "origin": "CAD5",
          "destination": "CAD6",
          "isDefault": true,
          "conditions": []
        }]
      }, {
        "extents": "StudioObject",
        "objectType": "Navigation",
        "origin": "CAD6",
        "index": 5,
        "inNavigations": [{
          "origin": "CAD5",
          "isDefaultPath": true,
          "isDefaultRoute": true
        }],
        "isDefault": true,
        "routes": [{
          "extents": "StudioObject",
          "objectType": "Route",
          "name": "CAD6_CAD7",
          "origin": "CAD6",
          "destination": "CAD7",
          "isDefault": true,
          "conditions": []
        }]
      }, {
        "extents": "StudioObject",
        "objectType": "Navigation",
        "origin": "CAD7",
        "index": 6,
        "inNavigations": [{
          "origin": "CAD6",
          "isDefaultPath": true,
          "isDefaultRoute": true
        }],
        "isDefault": true,
        "routes": [{
          "extents": "StudioObject",
          "objectType": "Route",
          "name": "CAD7_CAD8",
          "origin": "CAD7",
          "destination": "CAD8",
          "isDefault": true,
          "conditions": []
        }]
      }, {
        "extents": "StudioObject",
        "objectType": "Navigation",
        "origin": "CAD8",
        "index": 7,
        "inNavigations": [{
          "origin": "CAD7",
          "isDefaultPath": true,
          "isDefaultRoute": true
        }],
        "isDefault": true,
        "routes": [{
          "extents": "StudioObject",
          "objectType": "Route",
          "name": "CAD8_CAD9",
          "origin": "CAD8",
          "destination": "CAD9",
          "isDefault": true,
          "conditions": []
        }]
      }, {
        "extents": "StudioObject",
        "objectType": "Navigation",
        "origin": "CAD9",
        "index": 8,
        "inNavigations": [{
          "origin": "CAD8",
          "isDefaultPath": true,
          "isDefaultRoute": true
        }],
        "isDefault": true,
        "routes": [{
          "extents": "StudioObject",
          "objectType": "Route",
          "name": "CAD9_CAD10",
          "origin": "CAD9",
          "destination": "CAD10",
          "isDefault": true,
          "conditions": []
        }]
      }, {
        "extents": "StudioObject",
        "objectType": "Navigation",
        "origin": "CAD10",
        "index": 9,
        "inNavigations": [{
          "origin": "CAD9",
          "isDefaultPath": true,
          "isDefaultRoute": true
        }],
        "isDefault": true,
        "routes": [{
          "extents": "StudioObject",
          "objectType": "Route",
          "name": "CAD10_CAD11",
          "origin": "CAD10",
          "destination": "CAD11",
          "isDefault": true,
          "conditions": []
        }]
      }, {
        "extents": "StudioObject",
        "objectType": "Navigation",
        "origin": "CAD11",
        "index": 10,
        "inNavigations": [{
          "origin": "CAD10",
          "isDefaultPath": true,
          "isDefaultRoute": true
        }],
        "isDefault": true,
        "routes": [{
          "extents": "StudioObject",
          "objectType": "Route",
          "name": "CAD11_CAD12",
          "origin": "CAD11",
          "destination": "CAD12",
          "isDefault": true,
          "conditions": []
        }]
      }, {
        "extents": "StudioObject",
        "objectType": "Navigation",
        "origin": "CAD12",
        "index": 11,
        "inNavigations": [{
          "origin": "CAD11",
          "isDefaultPath": true,
          "isDefaultRoute": true
        }],
        "isDefault": true,
        "routes": [{
          "extents": "StudioObject",
          "objectType": "Route",
          "name": "CAD12_CAD13",
          "origin": "CAD12",
          "destination": "CAD13",
          "isDefault": true,
          "conditions": []
        }]
      }, {
        "extents": "StudioObject",
        "objectType": "Navigation",
        "origin": "CAD13",
        "index": 12,
        "inNavigations": [{
          "origin": "CAD12",
          "isDefaultPath": true,
          "isDefaultRoute": true
        }],
        "isDefault": true,
        "routes": [{
          "extents": "StudioObject",
          "objectType": "Route",
          "name": "CAD13_CAD14",
          "origin": "CAD13",
          "destination": "CAD14",
          "isDefault": true,
          "conditions": []
        }]
      }, {
        "extents": "StudioObject",
        "objectType": "Navigation",
        "origin": "CAD14",
        "index": 13,
        "inNavigations": [{
          "origin": "CAD13",
          "isDefaultPath": true,
          "isDefaultRoute": true
        }],
        "isDefault": true,
        "routes": [{
          "extents": "StudioObject",
          "objectType": "Route",
          "name": "CAD14_CAD15",
          "origin": "CAD14",
          "destination": "CAD15",
          "isDefault": true,
          "conditions": []
        }]
      }]
    };
  }

  function mockModelActivityFacadeService($injector) {
    Mock.surveyActivity = $injector.get('otusjs.model.activity.ActivitySurveyFactory').create(Mock.surveyTemplate);

    Mock.ActivityFacadeService = $injector.get('otusjs.model.activity.ActivityFacadeService');
    Mock.ActivityFacadeService.surveyActivity = Mock.surveyActivity;

    Injections.ActivityFacadeService = Mock.ActivityFacadeService;
  }
});
