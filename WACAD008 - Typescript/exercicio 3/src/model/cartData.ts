import type { commonData } from "./productsData.js"; 

export interface CartItem<T> {
    product: T;
    quantity: number;
}

export default class Cart<T extends commonData> {
    private static _instance: Cart<any>;
    
    private _items: CartItem<T>[] = [];

    private constructor() {}

    static get instance(): Cart<any> {
        if (!this._instance) this._instance = new Cart<any>();
        return this._instance;
    }

    get items() { 
        return this._items; 
    }

    addItem(item: T, quantity: number): void {
        const existingItem = this._items.find(cartItem => cartItem.product.id === item.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this._items.push({ product: item, quantity });
        }
    }

    removeItem(productId: string): void {
        this._items = this._items.filter(cartItem => cartItem.product.id !== productId);
    }

    getTotalItems(): number {
        return this._items.reduce((total, cartItem) => total + cartItem.quantity, 0);
    }

    getTotalPrice(): number {   
        return this._items.reduce((total, cartItem) => total + (cartItem.product.price * cartItem.quantity), 0);
    }
}