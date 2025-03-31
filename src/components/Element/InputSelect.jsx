import React from 'react'
import Label from './Label'

const InputSelect = ({name, value, children}) => {
  return (
    <div>
        <Label htmlFor={name} className={"block text-sm font-medium text-gray-700"}>{value}</Label>
        {children}
    </div>
  )
}

export default InputSelect
