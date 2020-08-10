import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Chat from './Components/Chat/Chat'
import Join from './Components/Join/Join'

export default (
    <Switch>
        <Route exact path = '/' component={Chat} />
        <Route   path = '/join' component={Join}/>
    </Switch>
)