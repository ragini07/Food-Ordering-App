import styles from './MealItemForm.module.css'
import Input from '../UI/Input'
import { useRef, useState } from 'react'

const MealItemForm = (props) => {
    const [amountIsValid , setAmountIsValid] = useState(true)
    const amountInput = useRef()

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredAmount = Number(amountInput.current.value);

        if(enteredAmount < 1 || enteredAmount > 5 || enteredAmount == 0){
            setAmountIsValid(false)
            return;
        }
        props.addToCart(enteredAmount);
    }

    return <form className={styles.form} onSubmit={submitHandler}>
        <Input ref={amountInput} label="Amount" input={{
            id: `${props.id}`,
            type: 'number',
            min: '1',
            max: '5',
            step: '1',
            defaultValue: '1'
        }}/>
        <button>+ Add</button>
        {!amountIsValid && <p>Please enter valid amount(1-5)</p>}
    </form>
}

export default MealItemForm;