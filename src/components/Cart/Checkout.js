import styles from './Checkout.module.css';
import { useRef, useState } from 'react';

const Checkout = (props) => {
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();
    const [formValidity,setFormValidity] = useState({
        name : true,
        street : true,
        postalCode : true,
        city : true
    })

    const isNotEmpty = value => value.trim() !== '' ;
    const hasAppropriateLength = value => value.length > 5

  const confirmHandler = (event) => {
    event.preventDefault();

    const Name = nameInputRef.current.value;
    const Street = streetInputRef.current.value;
    const PostalCode = postalCodeInputRef.current.value;
    const City = cityInputRef.current.value;

    const isNameValid = isNotEmpty(Name)
    const isStreetValid = isNotEmpty(Street)
    const isCityValid = isNotEmpty(City)
    const isPostalCodeValid = hasAppropriateLength(PostalCode)

    setFormValidity({
        name : isNameValid,
        street : isStreetValid,
        postalCode : isPostalCodeValid,
        city : isCityValid
    })
    const formIsValid = isNameValid && isStreetValid && isCityValid && isPostalCodeValid

    if(!formIsValid){
        return;
    }

    props.onConfirm({
        name : Name,
        street : Street,
        postalCode : PostalCode,
        city : City
    })
    
  };

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={`${styles.control} ${formValidity.name ? '' : styles.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formValidity.name && <p>Please Enter Valid name</p>}
      </div>
      <div className={`${styles.control} ${formValidity.street ? '' : styles.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
        {!formValidity.street && <p>Please Enter Valid StreetName</p>}
      </div>
      <div className={`${styles.control} ${formValidity.postalCode ? '' : styles.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef}/>
        {!formValidity.postalCode && <p>Please Enter Valid Postal Code</p>}
      </div>
      <div className={`${styles.control} ${formValidity.city ? '' : styles.invalid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}/>
        {!formValidity.city && <p>Please Enter Valid City</p>}
      </div>
      <div className={styles.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;