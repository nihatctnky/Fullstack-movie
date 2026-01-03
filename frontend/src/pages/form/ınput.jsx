import React from 'react'

const Input = ({name,label,type="text",min,max}) => {
  return (
    <div className='w-full relative'>
      <label className='text-sm'  htmlFor={name}>{label}</label>

      <input type={type}
      id={name}
      name={name}
      min={min}
      max={max}
      required
      className='block border-2 border-white/20 px-4 py-2 rounded-xl w-full focus:outline-none focus:ring-0 focus:border-purple-500 transition-all duration-300 hover:border-white/30 mt-2'
       />
    </div>
  )
}

export default Input
