import React from "react"


const CartContext = React.createContext({
    items : [],
    totalAmount : 10,
    addItem : (item) => {

    },
    removeItem : (item) => {

    },
    clearCart : () => {}
})

export default CartContext;