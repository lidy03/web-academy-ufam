'use client'
import { CartSummary } from "../components/Cart/CartSummary/CartSummary"
import { CartList } from "../components/Cart/CartList/CartList"
import { mockCartItems } from "../mocks/cartItems"
import { useState } from "react"
import { CartItemType } from "../types/cartItem"

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItemType[]>(mockCartItems)

  const qtdTotalItems = cartItems.reduce((acc, item) =>{
    return acc +  item.quantidade
  }, 0)
  const totalPurchase = cartItems.reduce((acc, item) => {
    return acc + (item.preco * item.quantidade)
  }, 0)

  const removeItemFromCart = (id: string): void => {
  setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (

      <main>
        <div className='container p-5'>
          <CartList cartItems={cartItems} removeItemFromCart={removeItemFromCart}/>
          <CartSummary qtdTotalItems={qtdTotalItems} totalPurchase={totalPurchase}/>
        </div>
      </main>
  )
}