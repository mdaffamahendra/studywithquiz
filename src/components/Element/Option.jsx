import React from 'react'

const Option = ({value, children}) => {
  return (
    <option value={value} className='text-indigo-600'>{children}</option>
  )
}

export default Option
