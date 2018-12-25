import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import RouterIndex from './router/index';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <RouterIndex />
                </div>
            </Router>
        );
    }
}

export default App;
