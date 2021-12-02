import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
    items : [],
    totalAmount : 0
}

const cartReducer = (state,action) => {

    if(action.type === 'ADD'){
        
        const updatedAmount = state.totalAmount + action.item.price * action.item.amount
        let updatedItems;
        let updatedItem;
        const existingCartItemIndex = state.items.findIndex(item => {
            return item.id === action.item.id
        })
        const existingCartItem = state.items[existingCartItemIndex]
        
       
        if(existingCartItem){
            updatedItem = {
                ...existingCartItem,
                amount : existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
            
        }
        else{
            updatedItems = state.items.concat(action.item)
            
        }

        return ({
            items : updatedItems,
            totalAmount : updatedAmount
        })
    }
    if(action.type === 'REMOVE'){
        let updatedItems;
        let updatedItem;
        const existingCartItemIndex = state.items.findIndex(item => {
            return item.id === action.id
        })
        const existingCartItem = state.items[existingCartItemIndex]
        const updatedAmount = state.totalAmount - existingCartItem.price
        if(existingCartItem.amount === 1){
            updatedItems = state.items.filter(item => item.id !== action.id)
        }
        else{
            updatedItem = {
                ...existingCartItem,
                amount : existingCartItem.amount - 1
            }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        }
        return ({
            items : updatedItems,
            totalAmount : updatedAmount
        })
    }
    if(action.type === 'CLEAR')
        return defaultCartState
    

    return defaultCartState
}

const CartProvider = (props) =>{

    const [cartState , dispathCartState] = useReducer(cartReducer,defaultCartState)


    const addItemHandler = (item) => {
        dispathCartState({type : 'ADD' , item : item})

    }
    const removeItemHandler = (id) => {
        dispathCartState({type : 'REMOVE' , id : id})
    }

    const clearItemHandler = () => {
        dispathCartState({type : 'CLEAR'})
    }

    const cartContext = {
        items : cartState.items,
        totalAmount : cartState.totalAmount,
        addItem : addItemHandler,
        removeItem : removeItemHandler,
        clearCart : clearItemHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )

}

export default CartProvider;