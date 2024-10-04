import React, { useEffect } from 'react'
import { useState } from 'react';
import InputBox from "./InputBox";
import './index.css'


export default function App() {
const [from,setFrom]=useState("USD");
const [to,setTo]=useState('INR');
const [amount,setAmount]=useState(0);
const[convertedAmt,setConvertedAmt]=useState(0);
const[currencyInfo,setCurrencyInfo]=useState({});

useEffect(() => {
  const fetchCurrencyInfo = async () => {
    try {
      let currencyJson = await fetch(`https://open.er-api.com/v6/latest/${from}`);
      if (!currencyJson.ok) {
        throw new Error("Network error");
      }
      let data = await currencyJson.json();
      setCurrencyInfo(data['rates']);
      console.log(data['rates']);  
    } 
    catch (error) {
      console.error(error);
    }
  };

  fetchCurrencyInfo();
}, [from]);

const options=Object.keys(currencyInfo);
function handlConvert()
{
  setConvertedAmt(currencyInfo[to]*amount)
}
function handleSwap()
{
  const temp = from;
    setFrom(to);
    setTo(temp);
  const temp1=amount;
  setAmount(convertedAmt);
  setConvertedAmt(temp1);
}
  return (
    <div className='container'>
      <InputBox label='From'
      placeHolderValue={amount}
      setAmount={setAmount}
      From={from}
      setFrom={setFrom}
      opt={options}

       />



      <button className='swap-btn btn'
      onClick={handleSwap}
      >Swap</button>



      <InputBox label='To' 
      placeHolderValue={convertedAmt}
      setAmount={() => {}}
      To={to}
      setTo={setTo}
      opt={options}
      />
      <button 
      className='convert-btn btn'
      onClick={handlConvert}
      >Convert</button>

    </div>
  )
}
