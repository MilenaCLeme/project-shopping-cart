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

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}
/*
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}
*/

function createObjtReduce(objt) {
  return {
    sku: objt.id,
    name: objt.title,
    image: objt.thumbnail,
    salePrice: objt.price,
  };
}

function teste(elementos) {
  console.log(elementos);
}

teste();

function createListApi(query) {
  if (query === 'computador') {
    fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`)
    .then((response) => response.json())
    .then((obj) => {
      const selectItens = document.querySelector('.items');
      obj.results.forEach((element) => {
        const objNovo = createObjtReduce(element);
        selectItens.appendChild(createProductItemElement(objNovo));
      });
      const elemento = document.querySelectorAll('.item__add');
      teste(elemento);
    });
  } else {
    alert('Não encontrado');
  }
}

createListApi('computador');

/*
function cartItemClickListener(event) {

}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
*/
window.onload = () => { };
