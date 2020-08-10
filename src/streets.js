import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Chat from './Components/Chat/Chat'
import Join from './Components/Join/Join'

export default (
    <Switch>
        <Route exact path = '/chat' component={Chat} />
        <Route   path = '/' component={Join}/>
    </Switch>
)