// declaração de variáveis
const question = document.querySelector('#question');
const answerBox = document.querySelector('#answers-box');
const quizzContainer = document.querySelector('#quizz-container');
const scoreContainer = document.querySelector('#score-container');
const letters = ['a', 'b', 'c', 'd', 'e'];
let points = 0;
let actualQuestion = 0;

// perguntas
const questions = [
  {
    question: 'Qual é o principal método de transmissão de doenças causadas por vírus?',
    answers: [
      {
        answer: 'Picada de mosquito',
        correct: false,
      },
      {
        answer: 'Contato direto',
        correct: true,
      },
      {
        answer: 'Ingestão de alimentos contaminados',
        correct: false,
      },
    ],
  },
  {
    question: 'O que são parasitas endoparasitas?',
    answers: [
      {
        answer: 'Parasitas que vivem na superfície do hospedeiro',
        correct: false,
      },
      {
        answer: 'Parasitas que se alimentam de células do hospedeiro',
        correct: false,
      },
      {
        answer: 'Parasitas que vivem dentro do hospedeiro',
        correct: true,
      },
    ],
  },
  {
    question: 'O que são anticorpos?',
    answers: [
      {
        answer: 'Proteínas produzidas por vírus',
        correct: false,
      },
      {
        answer: 'Proteínas que atacam células do corpo',
        correct: false,
      },
      {
        answer: 'Proteínas produzidas pelo sistema imunológico em resposta a antígenos',
        correct: true,
      },
    ],
  },
  {
    question: 'Qual é o principal mecanismo de defesa do corpo contra infecções bacterianas?',
    answers: [
      {
        answer: 'Fagocitose',
        correct: true,
      },
      {
        answer: 'Produção de toxinas',
        correct: false,
      },
      {
        answer: 'Liberação de anticorpos',
        correct: false,
      },
    ],
  },
  {
    question: 'Qual é o agente causador da malária?',
    answers: [
      {
        answer: 'Protozoário',
        correct: true,
      },
      {
        answer: 'Vírus',
        correct: false,
      },
      {
        answer: 'Bactéria',
        correct: false,
      },
    ],
  },
  {
    question: 'O que são antibióticos?',
    answers: [
      {
        answer: 'Medicamentos que combatem parasitas',
        correct: false,
      },
      {
        answer: 'Medicamentos que combatem vírus',
        correct: false,
      },
      {
        answer: 'Medicamentos que combatem bactérias',
        correct: true,
      },
    ],
  },
  {
    question: 'O que é a vacinação?',
    answers: [
      {
        answer: 'Introdução de microrganismos vivos no corpo',
        correct: false,
      },
      {
        answer: 'Introdução de antígenos no corpo para estimular resposta imune',
        correct: true,
      },
      {
        answer: 'Remoção de anticorpos do corpo',
        correct: false,
      },
    ],
  },
  {
    question: 'Quais são as principais vias de transmissão de parasitas intestinais?',
    answers: [
      {
        answer: 'Contato com a pele',
        correct: false,
      },
      {
        answer: 'Ingestão de alimentos contaminados',
        correct: true,
      },
      {
        answer: 'Inalação de esporos',
        correct: false,
      },
    ],
  },
  {
    question: 'O que é imunidade passiva?',
    answers: [
      {
        answer: 'Transferência de anticorpos de uma pessoa para outra',
        correct: true,
      },
      {
        answer: 'Imunização através da exposição a antígenos inativados',
        correct: false,
      },
      {
        answer: 'Estímulo direto à produção de células T',
        correct: false,
      },
    ],
  },
  {
    question: 'Quais são as características principais dos vírus?',
    answers: [
      {
        answer: 'Organismos unicelulares com núcleo verdadeiro',
        correct: false,
      },
      {
        answer: 'Protozoários que causam doenças no ser humano',
        correct: false,
      },
      {
        answer: 'Partículas infecciosas que dependem de células hospedeiras para reprodução',
        correct: true,
      },
    ],
  },
];

// substituição do quizz para a primeira pergunta
function init() {
  // criar primeira pergunta
  createQuestion(0);
}

// cria uma pergunta
function createQuestion(i) {
  // limpar questão anterior
  const oldButtons = answerBox.querySelectorAll('button');
  oldButtons.forEach((btn) => {
    btn.remove();
  });

  // alterar texto da pergunta
  const questionText = question.querySelector('#question-text');
  const questionNumber = question.querySelector('#question-number');

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  // inserir alternativas
  questions[i].answers.forEach((answer, i) => {
    // cria template botão quizz
    const answerTemplate = document.querySelector('.answer-template').cloneNode(true);

    const letterBtn = answerTemplate.querySelector('.btn-letter');
    const answerText = answerTemplate.querySelector('.question-answer');

    letterBtn.textContent = letters[i];
    answerText.textContent = answer['answer'];

    answerTemplate.setAttribute('correct-answer', answer['correct']);

    // remover hide e template class
    answerTemplate.classList.remove('hide');
    answerTemplate.classList.remove('answer-template');

    // inserir alternativa na tela
    answerBox.appendChild(answerTemplate);

    // inserir evento click no botão
    answerTemplate.addEventListener('click', function () {
      checkAnswer(this);
    });
  });

  // incrementar o número da questão
  actualQuestion++;
}

// verificar resposta do usuário
function checkAnswer(btn) {
  // seleciona todos os botões
  const buttons = answerBox.querySelectorAll('button');

  // verifica se resposta correta e add classe
  buttons.forEach((button) => {
    if (button.getAttribute('correct-answer') == 'true') {
      button.classList.add('correct-answer');

      // checa se usuário acertou a pergunta
      if (btn === button) {
        // incremento dos pontos
        points++;
      }
    } else {
      button.classList.add('wrong-answer');
    }
  });

  // exibir próxima pergunta
  nextQuestion();
}

// exibe a pŕoxima pergunta no quizz
function nextQuestion() {
  // timer para usuário ver as respostas
  setTimeout(function () {
    // verifica se ainda há perguntas
    if (actualQuestion >= questions.length) {
      // apresenta mensagem de sucesso
      showSuccessMessage();
      return;
    }

    createQuestion(actualQuestion);
  }, 1200);
}

// exibe a tela final
function showSuccessMessage() {
  hideOrShowQuizz();

  // trocar dados tela de sucesso
  // calcular score
  const score = ((points / questions.length) * 100).toFixed(2);

  const displayScore = document.querySelector('#display-score span');
  displayScore.textContent = score.toString();

  //alterar o número de perguntas corretas
  const correctAnswers = document.querySelector('#correct-answers');
  correctAnswers.textContent = points;

  // alterar o total de perguntas
  const totalQuestions = document.querySelector('#questions-qty');
  totalQuestions.textContent = questions.length;
}

// mostra ou esonde o score
function hideOrShowQuizz() {
  quizzContainer.classList.toggle('hide');
  scoreContainer.classList.toggle('hide');
}

// reiniciar quizz
const restartBtn = document.querySelector('#restart');
restartBtn.addEventListener('click', function () {
  //zerar jogo
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
  init();
});

// inicialização do quizz
init();
