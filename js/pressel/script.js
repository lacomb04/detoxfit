const perguntas = [
  {
    pergunta: "Você sente falta de energia e disposição no dia a dia?",
    opcoes: ["Sim, constantemente", "Às vezes", "Raramente"],
    resultado: {
      "Sim, constantemente":
        "Parece que você está precisando de um detox energético urgente para recuperar sua vitalidade e disposição!",
      "Às vezes":
        "Um detox leve pode ser exatamente o que você precisa para dar aquele up na sua energia.",
      Raramente:
        "Que ótimo! Isso indica que sua energia está em equilíbrio, mas um detox ainda pode trazer benefícios adicionais para seu bem-estar.",
    },
  },
  {
    pergunta: "Você tem dificuldade em perder peso ou se sente inchada(o)?",
    opcoes: ["Sim, muito", "Um pouco", "Não"],
    resultado: {
      "Sim, muito":
        "Um detox focado em perda de peso e desinchaço é o que você precisa para alcançar seus objetivos de forma saudável.",
      "Um pouco":
        "Um detox equilibrado pode ajudar a melhorar o processo de emagrecimento e combater o inchaço.",
      Não: "Parabéns! Isso é um sinal de que sua saúde está ótima, mas um detox ainda pode ajudar a manter esse equilíbrio e potencializar seus resultados.",
    },
  },
  {
    pergunta: "Você busca melhorar sua saúde e bem-estar geral?",
    opcoes: ["Sim, totalmente", "Sim, em parte", "Não, estou satisfeita(o)"],
    resultado: {
      "Sim, totalmente":
        "Seu interesse em melhorar sua saúde é admirável! O nosso e-book Detox Personalizado foi feito especialmente para quem busca transformar o bem-estar de forma eficaz.",
      "Sim, em parte":
        "Você está no caminho certo! Um detox pode ser um excelente passo para aprimorar sua saúde e alcançar seus objetivos.",
      "Não, estou satisfeita(o)":
        "Entendemos sua satisfação! Caso mude de ideia, nosso e-book estará aqui para ajudar a manter e potencializar seus resultados.",
    },
  },
];

let perguntaAtual = 0;
const perguntaElemento = document.getElementById("pergunta");
const opcoesElemento = document.getElementById("opcoes");
const proximoBotao = document.getElementById("proximo");
const resultadoElemento = document.getElementById("resultado");
const mensagemResultadoElemento = document.getElementById("mensagem-resultado");
let respostasUsuario = []; // Array para armazenar as respostas do usuário

function mostrarPergunta() {
  const pergunta = perguntas[perguntaAtual];
  perguntaElemento.textContent = pergunta.pergunta;
  opcoesElemento.innerHTML = "";
  pergunta.opcoes.forEach((opcao) => {
    const botao = document.createElement("button");
    botao.textContent = opcao;
    botao.addEventListener("click", () => {
      respostasUsuario[perguntaAtual] = opcao; // Armazena a resposta do usuário
      selecionarOpcao();
    });
    opcoesElemento.appendChild(botao);
  });
}

function selecionarOpcao() {
  if (respostasUsuario[perguntaAtual]) {
    if (perguntaAtual < perguntas.length - 1) {
      perguntaAtual++;
      mostrarPergunta();
    } else {
      mostrarResultado();
    }
  }
}

function mostrarResultado() {
  perguntaElemento.style.display = "none";
  opcoesElemento.style.display = "none";
  proximoBotao.style.display = "none";
  resultadoElemento.style.display = "block";
  mensagemResultadoElemento.textContent = gerarMensagemPersonalizada();
}

function gerarMensagemPersonalizada() {
  let mensagem = "Com base em suas respostas, ";

  // Primeiro feedback: energia
  if (respostasUsuario[0] === "Sim, constantemente") {
    mensagem +=
      "você está precisando de um detox energético urgente para recuperar sua disposição. ";
  } else if (respostasUsuario[0] === "Às vezes") {
    mensagem +=
      "um detox leve pode ser exatamente o que você precisa para otimizar sua energia. ";
  } else {
    mensagem +=
      "um detox pode trazer benefícios adicionais para seu bem-estar, mantendo sua energia equilibrada. ";
  }

  // Segundo feedback: peso e inchaço
  if (respostasUsuario[1] === "Sim, muito") {
    mensagem +=
      "Um detox focado em perda de peso e desinchaço seria ideal para você. Vamos dar aquele empurrãozinho nos seus resultados! ";
  } else if (respostasUsuario[1] === "Um pouco") {
    mensagem +=
      "um detox equilibrado pode te ajudar a otimizar o emagrecimento e reduzir o inchaço de forma saudável. ";
  } else {
    mensagem +=
      "parabéns pela sua saúde! Mesmo assim, um detox pode ajudar a manter o corpo em equilíbrio e potencializar sua energia. ";
  }

  // Terceiro feedback: bem-estar geral
  if (respostasUsuario[2] === "Sim, totalmente") {
    mensagem +=
      "Nosso e-book Detox Personalizado é o caminho perfeito para transformar seu bem-estar de forma profunda e eficaz!";
  } else if (respostasUsuario[2] === "Sim, em parte") {
    mensagem +=
      "um detox pode ser um excelente passo para aprimorar sua saúde e alcançar seus objetivos de forma mais efetiva.";
  } else {
    mensagem +=
      "entendemos sua satisfação com o momento atual, mas nosso e-book estará sempre à disposição para ajudar a manter sua saúde no topo.";
  }

  return mensagem;
}

mostrarPergunta();

proximoBotao.style.display = "none";
