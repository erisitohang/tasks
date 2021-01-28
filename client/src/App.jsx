import React from 'react'
import Board from './containers/Board'
import Store from './Store'

function App () {
  return (
    <Store>
      <Board />
    </Store>
  )
}

export default App
