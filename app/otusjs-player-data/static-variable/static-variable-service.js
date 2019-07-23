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
    self.clear = clear;

    var data = {
      label : "O Sistema Solar compreende o conjunto constituído pelo Sol e todos os corpos celestes que estão sob seu domínio gravitacional. A estrela central, maior componente do sistema, respondendo por mais de 99,85% da massa total,[5] gera sua energia através da fusão de hidrogênio em hélio, dois de seus principais constituintes. Os quatro planetas mais próximos do Sol (Mercúrio, Vênus, Terra e Marte) possuem em comum uma crosta sólida e rochosa, razão pela qual se classificam no grupo dos planetas telúricos, ou rochosos. Mais afastados, os quatro gigantes gasosos, Júpiter, Saturno, Urano e Netuno, são os componentes de maior massa do sistema logo após o próprio Sol. Dos cinco planetas anões, Ceres é o que se localiza mais próximo do centro do Sistema Solar, enquanto todos os outros, Plutão, Haumea, Makemake e Éris, se encontram além da órbita de Netuno." +

"Permeando praticamente toda a extensão do Sistema Solar, existem incontáveis objetos que constituem a classe dos corpos menores. Os asteroides, essencialmente rochosos, concentram-se numa faixa entre as órbitas de Marte e Júpiter que se assemelha a um cinturão. Além da órbita do último planeta, a temperatura é suficientemente baixa para permitir a existência de fragmentos de gelo, que se aglomeram sobretudo nas regiões do Cinturão de Kuiper, Disco disperso e na Nuvem de Oort; esporadicamente são desviados para o interior do sistema onde, pela ação do calor do Sol, se transformam em cometas. Muitos corpos, por sua vez, possuem força gravitacional suficiente para manter orbitando em torno de si objetos menores, os satélites naturais, com as mais variadas formas e dimensões. Os planetas gigantes apresentam, ainda, sistemas de anéis planetários, uma faixa composta por minúsculas partículas de gelo e poeira." +

"O Sistema Solar, de acordo com a teoria mais aceita hoje em dia, teve origem a partir de uma nuvem molecular que, por alguma perturbação gravitacional, entrou em colapso e formou a estrela central, enquanto seus remanescentes geraram os demais corpos. Em sua configuração atual, todos os componentes descrevem órbitas praticamente elípticas ao redor do Sol, constituindo um sistema dinâmico onde os corpos estão em mútua interação mediada sobretudo pela força gravitacional. A sua estrutura tem sido objeto de estudos desde a antiguidade, mas somente há cinco séculos a humanidade reconheceu o fato de que o Sol, e não a Terra, constitui o centro do movimento planetário. Desde então, a evolução dos equipamentos de pesquisa, como telescópios, possibilitou uma maior compreensão do sistema. Entretanto, detalhes sem precedentes foram obtidos somente após o envio de sondas espaciais a todos os planetas, que retornam imagens e dados com uma precisão nunca antes alcançada.",
      value : "Numero"
    };

    setup(data);

    function getVariable() {
      return _variable;
    }

    function clear() {
      _variable = null;
    }

    function setup(data) {
      clear();
      _variable = data;
    }
  }
}());