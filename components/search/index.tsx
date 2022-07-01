
import React, { FunctionComponent, useState, useEffect } from 'react'

const debounce = require('debounce');

export const FormInput = (props: any) => {
  const [inputType] = useState(props.type)
  const [inputValue, setInputValue] = useState('')


  return (
    <input type={inputType} className="p-2 w-full h-16 rounded border border-gray-200 bg-gray-200 text-3xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent" placeholder="search..." value={props.value} name="input-form" onChange={props.handleChange} />
  );
}


