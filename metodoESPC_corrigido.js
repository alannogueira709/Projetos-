const form = document.getElementById('form');
const formAvaliadores = document.getElementById('form2');
const buttonScore = document.getElementById('button-score');

form.addEventListener('submit', event => {
  event.preventDefault();
  console.log(event);

  const categories = document.getElementsByClassName('category-input');

  const categoriesArray = [];

  for (let i = 0; i < categories.length; i++) {
    categoriesArray.push({
      name: categories[i].previousElementSibling.innerHTML,
      value: categories[i].value,
    });
  }
});

formAvaliadores.addEventListener('submit', event => {
  event.preventDefault();

  formAvaliadores.style.display = 'none';

  const avaliadores = document.getElementById('avaliadores').value;
  const avaliadorNota = document.getElementById('avaliador-nota');

  for (i = 0; i < avaliadores; i++) {
    const avaliador = document.createElement('div');
    avaliador.className = 'avaliador';

    for (j = 0; j < categories.length; j++) {
      const avaliadorCategory = document.createElement('div');
      avaliadorCategory.className = 'avaliador-category';

      const avaliadorCategoryLabel = document.createElement('label');
      avaliadorCategoryLabel.className = 'avaliador-category-label';
      avaliadorCategoryLabel.innerHTML = categories[j];

      const avaliadorCategoryInput = document.createElement('input');
      avaliadorCategoryInput.className = 'avaliador-category-input';
      avaliadorCategoryInput.type = 'number';
      avaliadorCategoryInput.min = 1;
      avaliadorCategoryInput.max = 5;
      avaliadorCategoryInput.required = true;

      avaliadorCategory.appendChild(avaliadorCategoryLabel);
      avaliadorCategory.appendChild(avaliadorCategoryInput);

      avaliador.appendChild(avaliadorCategory);
    }

    const text = document.createElement('p');
    text.innerHTML = `Avaliador ${i + 1}`;

    avaliador.insertBefore(text, avaliador.firstChild);

    avaliadorNota.appendChild(document.createElement('hr'));

    avaliadorNota.appendChild(avaliador);
  }
});

buttonScore.addEventListener('click', event => {
  event.preventDefault();

  const categories = document.getElementsByClassName('category-input');

  if (categories.length === 0) return alert('Preencha as categorias!');

  const avaliadores = document.getElementsByClassName('avaliador');

  const avaliadoresArray = [];

  for (let i = 0; i < avaliadores.length; i++) {
    const avaliador = avaliadores[i];
    const avaliadorCategories = avaliador.getElementsByClassName(
      'avaliador-category-input'
    );

    const avaliadorCategoriesArray = [];

    for (let j = 0; j < avaliadorCategories.length; j++) {
      avaliadorCategoriesArray.push({
        name: avaliadorCategories[j].previousElementSibling.innerHTML,
        value: avaliadorCategories[j].value,
      });
    }

    avaliadoresArray.push(avaliadorCategoriesArray);
  }

  const categoriesMedia = [];

  for (let i = 0; i < categories.length; i++) {
    let media = 0;

    for (let j = 0; j < avaliadoresArray.length; j++) {
      media += parseInt(avaliadoresArray[j][i].value);

      if (j === avaliadoresArray.length - 1) {
        media = media / avaliadoresArray.length;
        categoriesMedia.push({
          name: avaliadoresArray[j][i].name,
          value: media,
        });
      }
    }
  }

  console.log(categoriesMedia);
});

const categories = [
  'cidade',
  'segurança',
  'público-alvo',
  'público-passante',
  'estacionamento',
  'transporte coletivo',
  'qualificação geral das empresas',
  'sentido do fluxo',
  'afluxo de transito',
  'apelo de sazonalidade',
  'concorrência',
  'venda comparada',
  'tendencia da região',
  'aproveitamento da área',
  'visibilidade da fachada',
  'estruturas e benfeitorias',
  'custo de ocupação',
  'renovação contractual',
  'incidencia de sol',
];

const renderCategoriesInput = () => {
  const categoriesID = document.getElementById('categories');

  const categoriesInput = document.createElement('div');
  categoriesInput.className = 'categories-input';

  for (let i = 0; i < categories.length; i++) {
    const category = document.createElement('div');
    category.className = 'category';

    const categoryLabel = document.createElement('label');
    categoryLabel.className = 'category-label';
    categoryLabel.innerHTML = categories[i];

    const categoryInput = document.createElement('input');
    categoryInput.className = 'category-input';
    categoryInput.type = 'number';
    categoryInput.min = 1;
    categoryInput.max = 5;
    categoryInput.required = true;

    category.appendChild(categoryLabel);
    category.appendChild(categoryInput);

    categoriesInput.appendChild(category);
  }

  categoriesID.appendChild(categoriesInput);
};

renderCategoriesInput();
