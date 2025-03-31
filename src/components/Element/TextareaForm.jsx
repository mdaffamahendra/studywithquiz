import React from 'react'
import Label from './Label'
import Textarea from './Textarea'

const TextareaForm = ({name, placeholder, onChange, value, children}) => {
  return (
    <div>
      <Label htmlFor={name} >{children}</Label>
      <Textarea name={name} id={name} placeholder={placeholder} onChange={onChange} value={value}/>
    </div>
  )
}

export default TextareaForm
