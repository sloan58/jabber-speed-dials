import React from 'react'
import SpeedDials from './SpeedDials'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={SpeedDials}></Route>
      </Switch>
    </Router>
  )
}

export default App
