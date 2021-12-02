import styles from './AvailableMeals.module.css'
import Card from '../UI/Card'
import MealItemForm from './MealItemForm';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';


  const AvailableMeals = () => {

    const cartCtx = useContext(CartContext)
    const [Meals,setMeals] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [httpError,setHttpError] = useState(null)

    useEffect(() => {
      setIsLoading(true)
      const fetchMeals = async() =>{
        const response = await fetch('https://food-items-65a4d-default-rtdb.firebaseio.com/meals.json')

        if(!response.ok){
          throw Error('Something Went Wrong ! Try after sometimes')
        }

        const responseData = await response.json()
        const loadedMeals = []
        console.log(responseData)
        for( const key in responseData){
          loadedMeals.push({
            id : key,
            name : responseData[key].name,
            description : responseData[key].description,
            price : responseData[key].price
          })
        }
        setMeals(loadedMeals)
        setIsLoading(false)
         
      }
      fetchMeals().catch((error) => {
        setIsLoading(false)
        setHttpError(error.message)
      }
       
      )
      
      
    },[])

    if(isLoading){
      return (<p className={styles.loadingtext}>Loading</p>)
    }
    if(httpError){
      return (<p className={styles.errortext}>{httpError}</p>)
    }
   

    return <section className={styles.meals}>
        <Card>
            <ul>
        {Meals.map(meal => {

             const addToCartHandler = (enteredAmount) =>{
              cartCtx.addItem({
                id : meal.id,
                price : meal.price,
                amount : enteredAmount,
                name : meal.name
              })
            }

            return (<li key={meal.id}>
                <div className={styles.meal}>
                    <h3>{meal.name}</h3>
                    <div className={styles.description}>{meal.description}</div>
                    <div className={styles.price}>{`$${meal.price.toFixed(2)}`}</div>
                    <MealItemForm id={meal.id} addToCart={addToCartHandler}/>
                </div>
             
                </li>)
        })}
    </ul>
    </Card>
    </section>
  }

  export default AvailableMeals;