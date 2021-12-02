import styles from './Cart.module.css'
import Modal from '../UI/Modal'
import React, { useContext, useState } from 'react'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
import Checkout from './Checkout'

const Cart = (props) => {

    const cartCtx = useContext(CartContext)
    const[isCheckout,setIsCheckout] = useState(false)
    const[orderSumitted,setOrderSubmitted] = useState(false)
    
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length > 0

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item,amount : 1})
    }
    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    }
    const orderHandler = () => {
        setIsCheckout(true)
    }
    const submitOrderHandler = async (userdata) => {
        setOrderSubmitted(false)
        await fetch('https://food-items-65a4d-default-rtdb.firebaseio.com/orders.json',{
            method : 'POST',
            body : JSON.stringify({
                user : userdata,
                orders : cartCtx.items
            })
        })
        setOrderSubmitted(true)
        cartCtx.clearCart()
       
    }

    const ModalContent = <React.Fragment>
        <ul className={styles['cart-items']}>
                {cartCtx.items.map(item => {
                return (<li>
                    <CartItem 
                    id={item.id} 
                    price={item.price} 
                    amount={item.amount} 
                    name={item.name}
                    onAdd={cartItemAddHandler.bind(null,item)}
                    onRemove={cartItemRemoveHandler.bind(null,item.id)}
                    />
                </li>)
                 })}
            </ul>
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitOrderHandler}onCancel={props.onClose}/>}
            {!isCheckout && <div className={styles.actions}>
                <button className={styles['button--alt']} onClick={props.onClose}>Close</button>
                {hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
            </div>}
    </React.Fragment>

    const OrderPlacedModalContent = <React.Fragment>
        <p className={styles.success}>Order Placed Successfully</p>
        <button className={styles.button} onClick={props.onClose}>Close</button>
        </React.Fragment>
    return (
        <Modal onClickAnywhere={props.onClose}>
            {!orderSumitted && ModalContent}
            {orderSumitted && OrderPlacedModalContent}
        </Modal>
    )
}

export default Cart;