import { useState } from 'react';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import classes from './FormBookSit.module.css';
import SuccessMsg from '../Successful/SuccessMsg';

export default function FormBookSit({cinema, onBooked, onClickBookSit}){

  // const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userInput, setUserInput] = useState({
    name: '',
    sitType: 'normal',
    numOfPeople: 0
  });

  let pricePerSit = userInput.sitType === 'normal' ? 1000 : userInput.sitType === 'vip' ? 5000 : 10000;
  let totalPrice = pricePerSit * userInput.numOfPeople;

  function handleUserInput(identifier, value){
    if(identifier === 'name'){
      setUserInput(input => ({...input, name: value}))
    }
    if((identifier === 'people' && value.length > 2) || value === '-'){
      return;
    }
    if(identifier === 'people'){
      
      setUserInput(input => ({...input, numOfPeople: value}))
    }
  }

  function handleSSubmit(event){
    event.preventDefault();
    if(!userInput.name && !userInput.numOfPeople){
      setErrorMsg('All fields is required!');
      return;
    }
    if(!userInput.name){
      setErrorMsg('Enter your fullname');
      return;
    }
    if(!userInput.numOfPeople){
      setErrorMsg('Enter number of People for the booking');
      return;
    }

    setFormData({
      name: userInput.name,
      ticket: userInput.sitType,
      numOfPeople: userInput.numOfPeople,
      bookedDate: new Date().toISOString(),
      id: String(Date.now()).slice(-10),
      cinema: cinema,
      price: totalPrice
    });

    // setIsSubmitting(true);
    setUserInput({
    name: '',
    sitType: 'normal',
    numOfPeople: 0
  });
  }

  return <div className={classes.form}>
    <h3>Fill details below:</h3>
    {errorMsg && <p className={classes.errorMsg}>{errorMsg}</p>}

    <form onSubmit={handleSSubmit}>
      <Input
      title='Fullname'
      input={{
        type: 'text',
        name: 'fullname',
        value: userInput.name,
        onChange: (event)=> handleUserInput('name', event.target.value)
      }}
     />

     <div className={classes['pick-sit']}>
      <h4>Pick sit:</h4>
      <select value={userInput.sitType} onChange={(event)=> setUserInput(input => ({...input, sitType: event.target.value}))}>
        <option value='normal'>Normal</option>
        <option value='vip'>VIP</option>
        <option value='vvip'>VVIP</option>
      </select>
      <h4>Number of people:</h4>
      <input type='number' min='1'
      value={userInput.numOfPeople ? userInput.numOfPeople : ''}
      onChange={(event) => handleUserInput('people', event.target.value)}
      />
     </div>
     <div className={classes['price-summary']}>
      <div>
        <h5>Price per sit:</h5>
        <h4>{pricePerSit}</h4>
      </div>
      <div>
        <h5>Total price:</h5>
        <h4>{totalPrice}</h4>
      </div>
      
     </div>
     {userInput.numOfPeople ?
     <div className={classes['form-action']}>
      <Button title='Book sit' />
     </div>
     : null
     }
    </form>

    {formData && <SuccessMsg 
      message={formData}
      onBooked={onBooked}
      onClickBookSit={onClickBookSit}
    />
    }
  </div>
}