import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Lottery1 from '../component/Lottery1'

const RouterIndex = () =>
    <div>
        <Switch>
            <Route exact path='/' component={Lottery1}/>
        </Switch>
    </div>

export default RouterIndex
