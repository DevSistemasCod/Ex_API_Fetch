// Inicializa o índice do slide.
let indiceDoSlide = 0;

// Função para exibir os slides.
function exibirSlides() {
  // Obtém todos os elementos com a classe 'fade' (os slides).
  let slides = document.querySelectorAll(".fade");

  // Oculta todos os slides.
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    //slides é uma NodeList (uma coleção de elementos do DOM) que representa todos os elementos com a classe "fade" no documento HTML. Esses elementos são os slides da apresentação.
   //.style.display = "none" define a propriedade CSS display do slide atual para "none". Isso faz com que o slide fique invisível. 
  }

  // Incrementa o índice do slide.
  indiceDoSlide++;

  // Verifica se o índice do slide excedeu o número de slides.
  if (indiceDoSlide > slides.length) {
    // Retorna ao primeiro slide.
    indiceDoSlide = 1;
  }

  // Exibe o slide atual, com base no índice.
  slides[indiceDoSlide - 1].style.display = "block";
  //slides é uma NodeList (uma coleção de elementos do DOM) que representa todos os elementos com a classe "fade" no documento HTML. Esses elementos são os slides da apresentação.
  //indiceDoSlide é uma variável que mantém o índice do slide que deve ser exibido. Começa em 0.
  //slides[indiceDoSlide - 1] é a parte mais importante. Isso acessa o array slides usando o valor de indiceDoSlide como índice. No entanto, como os índices de arrays começam em 0, subtrai 1 de indiceDoSlide para obter o índice correto do slide que deve ser exibido.
  //.style.display = "block" define a propriedade CSS display do slide atual para "block". Isso faz com que o slide fique visível.


  // Define um intervalo para chamar a função exibirSlides novamente após 5 segundos.
  setTimeout(function () {
    exibirSlides();
  }, 5000);
}

// Inicia a função para exibir os slides.
exibirSlides();
