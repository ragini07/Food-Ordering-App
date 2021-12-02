import { useState } from "react";
import Header from "./components/UI/Header"
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from './store/CartProvider'
function App() {

  const [showCartModal,setShowCartModal] = useState(false)

  const showCartHandler = () =>{
    setShowCartModal(true);
  }

  const hideCartHandler = () =>{
    setShowCartModal(false);
  }

  return (
   <CartProvider>
     {showCartModal && <Cart onClose={hideCartHandler}/>}
     <Header onCartClick={showCartHandler}/>
     <main>
     <Meals />
     </main>
     </CartProvider>
  );
}

export default App;
