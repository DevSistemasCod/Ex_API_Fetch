// Inicializa o índice do slide.
let indiceDoSlide = 0;

// Função para exibir os slides.
function exibirSlides() {
  // Obtém todos os elementos com a classe 'meusSlides' (os slides).
  let slides = $(".meusSlides");

  // Oculta todos os slides.
  slides.hide();

  // Incrementa o índice do slide.
  indiceDoSlide++;

  // Verifica se o índice do slide excedeu o número de slides.
  if (indiceDoSlide > slides.length) {
    // Retorna ao primeiro slide.
    indiceDoSlide = 1;
  }

  // Exibe o slide atual, com base no índice.
  slides.eq(indiceDoSlide - 1).show();
  //Explicando
  //slides é um objeto jQuery que representa todos os elementos com a classe .meusSlides.
  //.eq(indiceDoSlide - 1) é um método jQuery usado para selecionar o elemento com base no índice especificado.
  // indiceDoSlide - 1 é a posição do slide que desejamos exibir. O motivo de subtrair 1 do indiceDoSlide é que o índice em JavaScript começa em 0. 

  // Define um intervalo para a função, para avançar automaticamente os slides a cada 5 segundos.
  setTimeout(exibirSlides, 5000);
}

// Inicia a função para exibir os slides.
exibirSlides();

