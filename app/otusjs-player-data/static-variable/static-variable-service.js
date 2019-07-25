(function () {
  'use strict';

  angular
    .module('otusjs.player.data.static.variable')
    .service('otusjs.player.data.static.variable.StaticVariableService',Service);

  function Service() {
    var _variable = null;
    var self = this;

    self.setup = setup;
    self.getVariable = getVariable;

    var data = {
      variable:[
        {
          label : "CÓDIGO DO ACTÍGRAFO:",
          translatedValue : "Sim"
        },
        {
          label : "01. Quantos dias de uma semana normal o(a) Sr(a) faz caminhadas no seu tempo livre? ENTREVISTADOR: SE NENHUM, DIGITE 0.",
          translatedValue : "6"
        },
        {
          label : "ENTREVISTADOR: OUTRO MEDICAMENTO?",
          translatedValue : "Não"
        },
        {
          label : "ENTREVISTADOR: UTILIZE A EMBALAGEM, RECEITA OU INFORMAÇÃO DO(A) PARTICIPANTE. NO CASO DE DISCORDÂNCIA ENTRE A INFORMAÇÃO RELATADA, INFORMAÇÃO DA EMBALAGEM E INFORMAÇÃO DA RECEITA, A INFORMAÇÃO CONSIDERADA DEVERÁ SER AQUELA REFERIDA PELO(A) PARTICIPANTE.",
          translatedValue : "Não sabe"
        },
        {
          label : "text",
          translatedValue : "7875957"
        },
        {
          label : "text",
          translatedValue : "7875957"
        },
        {
          label : "text",
          translatedValue : "7875957"
        },
        {
          label : "text",
          translatedValue : "7875957"
        },
        {
          label : "text",
          translatedValue : "7875957"
        },
        {
          label : "text",
          translatedValue : "7875957"
        },
        {
          label : "text",
          translatedValue : "7875957"
        },
        {
          label : "text",
          translatedValue : "7875957"
        },
        {
          label : "text",
          translatedValue : "7875957"
        },
        {
          label : "text",
          translatedValue : "7875957"
        },
        {
          label : "text",
          translatedValue : "7875957"
        },
        {
          label : "text",
          translatedValue : "7875957"
        },
        {
          label : "text",
          translatedValue : "7875957"
        },
        {
          label : "text",
          translatedValue : "7875957"
        },
        {
          label : "text",
          translatedValue : "7875957"
        },
        {
          label : "text",
          translatedValue : "7875957"
        },
        {
          label : "text",
          translatedValue : "7875957"
        },
        {
          label : "text",
          translatedValue : "7875957"
        },
        {
          label : "text",
          translatedValue : "7875957"
        },
        {
          label : "text",
          translatedValue : "7875957"
        },
        {
          label : "text",
          translatedValue : "7875957"
        },
        {
          label : "text",
          translatedValue : "7875957"
        },
        {
          label : "text",
          translatedValue : "7875957"
        },
        {
          label : "text",
          translatedValue : "7875957"
        },
        {
          label : "text",
          translatedValue : "7875957"
        },
        {
          label : "text",
          translatedValue : "7875957"
        },
        {
          label : "text",
          translatedValue : "7875957"
        },
        {
          label : "text",
          translatedValue : "7875957"
        },
        {
          label : "text",
          translatedValue : "7875957"
        },
        {
          label : "text",
          translatedValue : "7875957"
        },
        {
          label : "text",
          translatedValue : "7875957"
        },
        {
          label : "text",
          translatedValue : "7875957"
        }
      ]
    };

    setup(data);

    function getVariable() {
      return _variable;
    }

    function _clear() {
      _variable = null;
    }

    function setup(data) {
      _clear();
      _variable = data.variable;
    }
  }
}());