import React, { Component } from 'react';

import Header from './componentes/Header'
import Timeline from "./componentes/Timeline";
import LogicaTimeline from "./logicas/LogicaTimeline";

const logicaTimeline = new LogicaTimeline();

class App extends Component {

    render() {
    return (

        <div id="root">
            <div className="main">
              <Header/>
              <Timeline login = {this.props.match.params.login} logicaTimeline={logicaTimeline}/>
            </div>
        </div>

    );
  }
}

export default App;
