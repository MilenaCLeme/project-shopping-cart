const elementOl = document.querySelector('ol');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id, title, thumbnail }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}
/*
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}
*/
const armazenamento = [];
const button = document.querySelector('.empty-cart');

function excluirLocalStorage(item) {
  if (localStorage.length > 0) {
    const arrayItem = item.split(' ');
    armazenamento.forEach((elementos) => {
    arrayItem.forEach((itens) => {
      if (itens === elementos) {
        armazenamento.splice(armazenamento.indexOf(itens), 1);
      }
    });
  });
  localStorage.setItem('ids', armazenamento);
  }
}

function excluirItensDoCarrinhoDeCompra() {
  const todosOsElementosLi = document.querySelectorAll('li');
  todosOsElementosLi.forEach((elemento) => {
    elemento.remove();
  });
  armazenamento.forEach((elemento) => {
    excluirLocalStorage(elemento);
  });
  localStorage.removeItem('ids');
}

function cartItemClickListener(event) {
  event.target.remove();
  excluirLocalStorage(event.target.innerText);
}

function inserirLocalStorage(id) {
  armazenamento.push(id);
  localStorage.setItem('ids', armazenamento);
}

function createCartItemElement({ id, title, price }) {
  const li = document.createElement('li');
  
  li.className = 'cart__item';
  li.innerText = `SKU: ${id} | NAME: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);

  return li;
}

function criandoApiPeloId(idApi) {
  fetch(`https://api.mercadolibre.com/items/${idApi}`)
  .then((response) => response.json())
  .then((obj) => {
    elementOl.appendChild(createCartItemElement(obj));
  });
}

function localStorageloand() {
  if (localStorage.getItem('ids') !== null) {
    localStorage.getItem('ids').split(',').forEach((elemento) => {
      armazenamento.push(elemento);
    });
    console.log(armazenamento);
    armazenamento.forEach((armazenado) => {
      if (armazenado !== '') {
        criandoApiPeloId(armazenado);
        }
    });
  }
}

function takeId(event) {
  const itens = event.path[1];
  const id = itens.querySelector('.item__sku').innerText;
  criandoApiPeloId(id);
  inserirLocalStorage(id);
}

function createListApi(query) {
  if (query === 'computador') {
    fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`)
    .then((response) => response.json())
    .then((obj) => {
      const selectItens = document.querySelector('.items');
      obj.results.forEach((element) => {
        selectItens.appendChild(createProductItemElement(element));
      });
      const elementos = document.querySelectorAll('.item__add');
      elementos.forEach((elemento) => {
        elemento.addEventListener('click', takeId);
      });
    });
  } else {
    alert('Não encontrado');
  }
}

createListApi('computador');

button.addEventListener('click', excluirItensDoCarrinhoDeCompra);

window.onload = () => {
  localStorageloand();
 };
