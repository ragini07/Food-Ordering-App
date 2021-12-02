import CartIcon from "../Cart/CartIcon"
import styles from "./CartButton.module.css"
import { useContext } from "react"
import CartContext from '../../store/cart-context'


const CartButton = (props) => {

    const cartCtx = useContext(CartContext)
    
    const NoOfCartItems = cartCtx.items.reduce(function(acc , curr) {
            acc+= curr.amount
            return acc
    },0)

    return(<button className={styles.button} onClick = {props.onCartClick}>
        <span className={styles.icon}>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={styles.badge}>{NoOfCartItems}</span>
    </button>)
}

export default CartButton;