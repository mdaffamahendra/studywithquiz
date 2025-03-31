import React from 'react'

const Form = ({children, handler = () => {}, style = ""}) => {
  return (
    <form onSubmit={handler} className={style}>
        {children}
    </form>
  )
}

export default Form
