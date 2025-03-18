const perguntas = [
  {
    pergunta: "Você sente falta de energia e disposição no dia a dia?",
    opcoes: ["Sim, constantemente", "Às vezes", "Raramente"],
    resultado: {
      "Sim, constantemente":
        "Você se beneficiaria muito de um detox energético!",
      "Às vezes": "Um detox leve pode ajudar a otimizar sua energia.",
      Raramente:
        "Que ótimo! Mesmo assim, um detox pode trazer benefícios adicionais.",
    },
  },
  {
    pergunta: "Você tem dificuldade em perder peso ou se sente inchada(o)?",
    opcoes: ["Sim, muito", "Um pouco", "Não"],
    resultado: {
      "Sim, muito":
        "Um detox focado em perda de peso e desinchaço é ideal para você.",
      "Um pouco":
        "Um detox equilibrado pode te ajudar a alcançar seus objetivos.",
      Não: "Parabéns! Mesmo assim, um detox pode trazer benefícios para a saúde.",
    },
  },
  {
    pergunta: "Você busca melhorar sua saúde e bem-estar geral?",
    opcoes: ["Sim, totalmente", "Sim, em parte", "Não, estou satisfeita(o)"],
    resultado: {
      "Sim, totalmente":
        "Nosso e-book Detox Personalizado é perfeito para você!",
      "Sim, em parte":
        "Um detox pode ser um ótimo passo para melhorar sua saúde.",
      "Não, estou satisfeita(o)":
        "Entendemos. Se mudar de ideia, nosso e-book estará aqui para te ajudar a alcançar seus objetivos de saúde.",
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
  if (respostasUsuario[0] === "Sim, constantemente") {
    mensagem += "você precisa de um detox energético. ";
  } else if (respostasUsuario[0] === "Às vezes") {
    mensagem += "um detox leve pode otimizar sua energia. ";
  } else {
    mensagem += "um detox pode trazer benefícios adicionais. ";
  }

  if (respostasUsuario[1] === "Sim, muito") {
    mensagem += "Um detox focado em perda de peso e desinchaço é ideal. ";
  } else if (respostasUsuario[1] === "Um pouco") {
    mensagem += "um detox equilibrado pode te ajudar. ";
  } else {
    mensagem += "parabéns, mas um detox pode trazer benefícios. ";
  }

  if (respostasUsuario[2] === "Sim, totalmente") {
    mensagem += "Nosso e-book Detox Personalizado é perfeito para você!";
  } else if (respostasUsuario[2] === "Sim, em parte") {
    mensagem += "um detox pode ser um ótimo passo. ";
  } else {
    mensagem += "entendemos, nosso e-book estará aqui se precisar. ";
  }

  return mensagem;
}

mostrarPergunta();

proximoBotao.style.display = "none";
