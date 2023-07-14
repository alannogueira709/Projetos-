const botaoCima = document.getElementsByClassName("cima")[0];
const botaoBaixo = document.getElementsByClassName("baixo")[0];
const botaoEsquerda = document.getElementsByClassName("esquerda")[0];
const botaoDireita = document.getElementsByClassName("direita")[0];
const garraCima = document.getElementsByClassName("garraCima")[0];
const garraBaixo = document.getElementsByClassName("garraBaixo")[0];


function enviarDados(direcao) {
  fetch('http://endereco-do-servidor/seu-arquivo-ino', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ direcao }),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Resposta do servidor:', data);
    
  })
  .catch(error => {
    console.error('Ocorreu um erro:', error);
  });
}


botaoCima.addEventListener('click', () => {
  enviarDados('cima');
  console.log("cima pressionado")
});


botaoBaixo.addEventListener('click', () => {
  enviarDados('baixo');
  console.log("baixo pressionado")  
});

botaoEsquerda.addEventListener('click', () => {
  enviarDados('esquerda');
    console.log("esquerda pressionado")
});


botaoDireita.addEventListener('click', () => {
  enviarDados('direita');
  console.log("direita pressionado")
});


garraCima.addEventListener('click', () => {
  enviarDados('garraCima');
    console.log("garraCima pressionado")
});

garraBaixo.addEventListener('click', () => {
  enviarDados('garraBaixo');
  console.log("garraBaixo pressionado")  
});