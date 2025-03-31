import React from 'react'

const Table = ({children, style = ""}) => {
  return (
    <table className={style}>
        {children}
    </table>
  )
}

export default Table
