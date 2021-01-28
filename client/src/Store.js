import React, { useState } from 'react'
import PropTypes from 'prop-types'

const initData = {
  inEdit: {
    cIndex: -1,
    tIndex: -1
  },
  columns: {}
}

export const Context = React.createContext()

const Store = ({ children }) => {
  const [columns, setColumns] = useState(initData)

  return (
      <Context.Provider value={[columns, setColumns]}>{children}</Context.Provider>
  )
}

Store.propTypes = {
  children: PropTypes.object.isRequired
}

export default Store
