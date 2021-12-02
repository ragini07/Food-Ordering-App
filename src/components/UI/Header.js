import { Fragment } from "react";
import mealImage from "../../assets/meals1.JPG"
import styles from "./Header.module.css";
import CartButton from "./CartButton";
const Header = (props)=>{
    return (<Fragment>
        <header className={styles.header}>
            <h1>Foor Ordering App</h1>
           <CartButton onCartClick = {props.onCartClick}/>
        </header>
        <div className={styles["main-image"]}>
            <img src={mealImage} alt="A table full of foods"></img>
        </div>
    </Fragment>)
}

export default Header;