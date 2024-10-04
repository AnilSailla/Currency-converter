import React from 'react'

export default function InputBox({label,placeHolderValue,setAmount,opt,From,setFrom,To,setTo}) {
    function handleChange(e)
    {
        if(label === 'From')
            setAmount(e.target.value);
    }
    function handleSelect(e)
    {
        label === 'From'? setFrom(e.target.value) : setTo(e.target.value)
    }
    
  return (
    <div className='input-container'>
        <div >
            <div>{label}</div>
            <input
            type='number'
            value={placeHolderValue}
            onChange={handleChange}
            />
        </div>
        <div className='select-box'>
            <select
            value={label === 'From' ? From:To}
            onChange={handleSelect}
            >
                {opt.map((val,ind)=><option key={ind}>{val}</option>)}
            </select>
        </div>
    </div>
  )
}
