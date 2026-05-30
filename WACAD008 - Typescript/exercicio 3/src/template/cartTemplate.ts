import cart from "../model/cartData.js";
import { PhoneData, TVData, BikeData, type commonData } from "../model/productsData.js";

export default class CartTemplate {
    static instance: CartTemplate = new CartTemplate();
    private constructor() {}

    render(cartItems: cart<commonData>): void {
        const itemsList = document.getElementById('cart-items') as HTMLDivElement;
        const totalItems = document.getElementById('total-items') as HTMLElement;
        const totalPrice = document.getElementById('total-price') as HTMLElement;

        itemsList.innerHTML = '';
        
        let totalprice = 0;

        cartItems.items.forEach(cartItem => {
            const p = cartItem.product;
            let details = '';

            if (p instanceof TVData) details = `Resolução: ${p.resolution}, Tamanho: ${p.size}`;
            else if (p instanceof PhoneData) details = `Memória: ${p.memory}`;
            else if (p instanceof BikeData) details = `Aro: ${p.rimsize}`;

            totalprice += p.price * cartItem.quantity;

            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `
                <p>
                    <strong>${p.manufacturer} ${p.model}</strong> (${details})<br>
                    Qtd: ${cartItem.quantity} | Subtotal: R$ ${(p.price * cartItem.quantity).toFixed(2)}
                    <button class="btn-remove" data-id="${p.id}">[Excluir]</button>
                </p><hr>
            `;
            itemsList.appendChild(itemDiv);
        });

        totalItems.textContent = ` ${cartItems.getTotalItems()}`;
        totalPrice.textContent = `${totalprice.toFixed(2)}`;
    }
}