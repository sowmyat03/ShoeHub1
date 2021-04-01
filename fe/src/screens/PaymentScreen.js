
import React, { useEffect, useState } from 'react';
import data from '../data';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {savePayment} from '../actions/cartActions';
import CheckOutSteps from '../components/checkoutsteps';

function PaymentScreen(props){
    
    const[paymethod,setPayMethod]=useState('');
     
      
    const dispatch=useDispatch();
  
 
    
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(savePayment(paymethod));
        props.history.push('placeorder');
    }
    
    return <div>
        <CheckOutSteps step1 step2 step3></CheckOutSteps>
        <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Payment</h2>
                </li>
               
                <li>
                
                    <label htmlFor="paymethod">
                    <input type="radio" name="paymethod" value="paypal" id="paymethod" onChange={(e)=>setPayMethod(e.target.value)}>
                    </input>  Paypal
                    </label>
                    
                </li>
                
                <li>
                    <button type="submit" className="button primary">Continue</button>
                </li>
                
                
            </ul>
        </form>

    </div>
    </div>
     

}
export default PaymentScreen;