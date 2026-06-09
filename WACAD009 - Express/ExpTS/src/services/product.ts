import getEnv from "../utils/getEnv.js"
import { type Product } from "../types/product.js"

const env = getEnv()

export const getProducts = async () => {
    const response = await fetch (env.PATH_API)
    return response.json()
}

export const createProduct = async(product: Product) => {
    const response = await fetch(env.PATH_API, {
        method: "POST",
        body: JSON.stringify(product)
    })
    return response.json()
}

export const getProduct = async(id: string) => {
    const response = await fetch(`${env.PATH_API}/${id}`)
    return response.json()
}

export const updateProduct = async (id:string, product: Product) => {
    const response = await fetch(`${env.PATH_API}/${id}`, {
        method: "PUT",
        body: JSON.stringify(product)
    })

    return response.json()
}

export const removeProduct = async (id: string) => {
    const response = await fetch(`${env.PATH_API}/${id}`, {
        method: "DELETE"
    })

    return response.json()
}