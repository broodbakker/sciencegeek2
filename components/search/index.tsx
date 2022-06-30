
import React, { FunctionComponent, useState, useEffect } from 'react'

const debounce = require('debounce');

export const FormInput = (props: any) => {
  const [inputType] = useState(props.type)
  const [inputValue, setInputValue] = useState('')

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    const value = e.currentTarget.value
    setInputValue(value);
    if (props.onChange) props.onChange(inputValue)
  }


  useEffect(() => {
    props.onChange(inputValue)
  }, [inputValue])

  return (


    <input type={inputType} className="p-2 w-full h-16 rounded border border-gray-200 bg-gray-200 text-3xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent" placeholder="search..." value={inputValue} name="input-form" onChange={handleChange} />

  );
}


