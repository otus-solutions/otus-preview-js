describe('Current Question Service', function() {

  var Mock = {};
  var service;
  var items = [Mock.VAL1, Mock.VAL2, 3];
  var VAL1 = 'VAL1';
  var VAL2 = 'VAL2';

  beforeEach(function() {
    module('otusjs.player.core');

    inject(function(_$injector_) {
      service = _$injector_.get('otusjs.player.core.activity.CurrentQuestionService');
      mockValidationService(_$injector_);
      mockPlayerService(_$injector_);
    });
  });

  describe('a new question setting', function() {

    it('should call setValidation on ValidationService w question and empty answer', function() {
      spyOn(Mock.ValidationService, 'setValidation');

      service.setup(Mock.VAL1);

      expect(Mock.ValidationService.setValidation).toHaveBeenCalledWith(Mock.VAL1, { data: {} });
    });

    it('should get an empty object when call for answer before there is one', function() {
      service.setup(Mock.VAL1);

      answer = service.getAnswer();

      expect(answer).toEqual({});
    });

    it('should return the given answer', function() {
      service.setup(Mock.VAL1);
      service.setAnswer({ answer: 'ans' });

      answer = service.getAnswer();

      expect(answer).toEqual('ans');
    });

  });

  describe('getRoutes method', function() {

    describe('when exists next items', function() {

      beforeEach(function() {
        service.setup(Mock.VAL1, Mock.navigation);
      });

      it('should return an array with the routes of current item', function() {
        var routes = service.getRoutes();

        expect(routes.length).not.toBe(0);
      });

      it('should return an array with VAL2 route present', function() {
        var routes = service.getRoutes();

        expect(routes[0].destination).toBe(VAL2);
      });

    });

    describe('when not exists next items', function() {

      beforeEach(function() {
        service.setup(Mock.VAL2, Mock.undefinedNavigation);
      });

      it('should return an empty array of routes', function() {
        var routes = service.getRoutes();

        expect(routes.length).toBe(0);
      });

    });

  });

  describe('getPreviousItem method', function() {

    describe('when exists next item', function() {

      beforeEach(function() {
        service.setup(Mock.VAL2, null, VAL1);
      });

      it('should return the customID of item that precedes the current item', function() {
        var previousItem = service.getPreviousItem();

        expect(previousItem).toEqual(VAL1);
      });

    });

    describe('when not exists previous item', function() {

      beforeEach(function() {
        service.setup(Mock.VAL1, Mock.navigation);
      });

      it('should return an empty array of items', function() {
        var previousItem = service.getPreviousItem();

        expect(previousItem).toBe(null);
      });

    });

  });

  function mockValidationService($injector) {
    Mock.ValidationService = $injector.get('otusjs.player.core.validation.ValidationService');
    return Mock.ValidationService;
  }

  function mockPlayerService($injector) {
    Mock.PlayerService = $injector.get('otusjs.player.core.player.PlayerService');
    return Mock.PlayerService;
  }

  Mock.VAL1 = {
    "extents": "SurveyItem",
    "objectType": "CalendarQuestion",
    "templateID": "VAL1",
    "customID": "VAL1",
    "dataType": "LocalDate",
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
        "rangeDate": {
          "extends": "StudioObject",
          "objectType": "Rule",
          "validatorType": "rangeDate",
          "data": {
            "reference": {
              "initial": "2016-09-01T03:00:00.000Z",
              "end": "2016-10-01T03:00:00.000Z"
            }
          }
        },
        "minDate": {
          "extends": "StudioObject",
          "objectType": "Rule",
          "validatorType": "minDate",
          "data": {
            "reference": "2016-07-01T03:00:00.000Z"
          }
        },
        "maxDate": {
          "extends": "StudioObject",
          "objectType": "Rule",
          "validatorType": "maxDate",
          "data": {
            "reference": "2016-12-01T02:00:00.000Z"
          }
        }
      }
    }
  };

  Mock.VAL2 = {
    "extents": "SurveyItem",
    "objectType": "CalendarQuestion",
    "templateID": "VAL2",
    "customID": "VAL2",
    "dataType": "LocalDate",
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
        "rangeDate": {
          "extends": "StudioObject",
          "objectType": "Rule",
          "validatorType": "rangeDate",
          "data": {
            "reference": {
              "initial": "2016-09-01T03:00:00.000Z",
              "end": "2016-10-01T03:00:00.000Z"
            }
          }
        },
        "minDate": {
          "extends": "StudioObject",
          "objectType": "Rule",
          "validatorType": "minDate",
          "data": {
            "reference": "2016-07-01T03:00:00.000Z"
          }
        },
        "maxDate": {
          "extends": "StudioObject",
          "objectType": "Rule",
          "validatorType": "maxDate",
          "data": {
            "reference": "2016-12-01T02:00:00.000Z"
          }
        }
      }
    }
  };

  Mock.navigation = {
    "extents": "SurveyTemplateObject",
    "objectType": "Navigation",
    "origin": "VAL1",
    "index": 0,
    "inNavigations": [],
    "routes": [{
      "extents": "SurveyTemplateObject",
      "objectType": "Route",
      "origin": "VAL1",
      "destination": "VAL2",
      "name": "VAL1_VAL2",
      "isDefault": true,
      "conditions": []
    }]
  }

  Mock.undefinedNavigation = undefined;
});
