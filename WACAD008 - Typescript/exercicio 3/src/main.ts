import Cart from "./model/cartData";
import CartTemplate from "./template/cartTemplate";
import { PhoneData, TVData, BikeData } from "./model/productsData";

let currentType: 'TV' | 'Phone' | 'Bike' = 'TV';

const init = () => {
  const cart = Cart.instance;
  const template = CartTemplate.instance;
  const form = document.getElementById('product-form') as HTMLFormElement;
  const updateForm = (type: 'TV' | 'Phone' | 'Bike') => {
    currentType = type;

    let commonInfo = `
      <h2>Dados do produto ${type}</h2>
      <input type="text" id="model" placeholder="Informe o Modelo" required><br>
      <input type="text" id="manufacturer" placeholder="Informe o Fabricante" required><br>
      <input type="number" id="price" step="0.01" placeholder="Informe o Preço" required><br>
      <input type="number" id="qty" placeholder="Informe a Quantidade" min="1" required><br>
    `;

    let specificInfo = '';
    if (type === 'TV') {
      specificInfo = `
        <input type="text" id="resolution" placeholder="Informe a Resolução" required><br>
        <input type="number" id="ts-size" placeholder="Informe o Tamanho" required><br>
      `;
    } else if (type === 'Phone') {
      specificInfo = `
        <input type="text" id="memory" placeholder="Informe a Memória" required><br>
      `;
    } else if (type === 'Bike') {
      specificInfo = `
        <input type="number" id="rimsize" placeholder="Informe o Aro" required><br>
      `;
    }

    form.innerHTML = commonInfo + specificInfo + `<button type="submit">Adicionar ao Carrinho</button>`;
  };

  document.querySelector(".btn-TV")?.addEventListener("click", () => updateForm('TV'));
  document.querySelector(".btn-Phone")?.addEventListener("click", () => updateForm('Phone'));
  document.querySelector(".btn-Bike")?.addEventListener("click", () => updateForm('Bike'));

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const id = Date.now().toString();
    const model = (document.getElementById('model') as HTMLInputElement).value;
    const manufacturer = (document.getElementById('manufacturer') as HTMLInputElement).value;
    const price = parseFloat((document.getElementById('price') as HTMLInputElement).value);
    const quantity = parseInt((document.getElementById('qty') as HTMLInputElement).value);

    let product;
    if (currentType === 'TV'){
      const res = (document.getElementById('resolution') as HTMLInputElement).value;
      const size = parseInt((document.getElementById('ts-size') as HTMLInputElement).value);
      product = new TVData(id, model, res, size, manufacturer, price);
    } else if (currentType === 'Phone') {
      const memory = (document.getElementById('memory') as HTMLInputElement).value;
      product = new PhoneData(id, model, memory, manufacturer, price);
    } else if (currentType === 'Bike') {
      const rimsize = parseInt((document.getElementById('rimsize') as HTMLInputElement).value);
      product = new BikeData(id, model, rimsize, manufacturer, price);
    }

    cart.addItem(product!, quantity);
    template.render(cart);
    form.innerHTML = ''; 
  });

  document.getElementById('cart-container')?.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('btn-remove')) {
      const productId = target.getAttribute('data-id');
      if (productId) {
        cart.removeItem(productId);
        template.render(cart);
      }
    }
  });

  updateForm('TV');

};

document.addEventListener('DOMContentLoaded', init);

