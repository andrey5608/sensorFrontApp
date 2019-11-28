import React, { Component }  from 'react';
import logo from './logo.svg';
import './App.css';
import RadialChart from './RadialChart.js'
import { returnStatement } from '@babel/types';


export default class App extends Component {
  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = 
    {
      iterator: 1,
      percentage: 25,
      progressColor: 'rgb(222, 204, 255)'
    };
  }

  handleClick(e)  {
    this.setState({iterator: this.newMethod(this.state.iterator), percentage: this.state.iterator});
    this.setState({percentage: this.state.iterator});
  } 
  newMethod(newIter) {
    /*if(newIter % 29 === 0){
      return "kek";
    }
    if(typeof newIter === 'string'){
      return Math.floor(Math.random()*111);
    }
    return (newIter + 1 > 0 && newIter < 5) || (newIter % 5 === 0) ? newIter + 1 : newIter + 555;
    if(newIter == 19)
    {
      this.setState({progressColor: 'rgb(219, 114, 119)'})
    }*/
    return newIter + 1;
  }

  componentDidMount(){
    this.interval = setInterval(() => this.handleClick(), 1000);
  }
  componentWillUnmount(){
    this.interval = null;
  }
  
  render () {
    var bgColor = 'rgb(222, 204, 255)';
      return (        
        <div className="App">
          <header className="App-header">            
            <div id="chart">
            <RadialChart
              strokeWidth="10"
              sqSize="200"
              percentage={this.state.percentage}
              stroke={bgColor}/>
            </div>
            <div id="iteration">                          
            Iteration:{this.state.iterator}
          </div>
          </header>
          </div>
      );
    }

    /*<img src={logo} className="App-logo" alt="logo" />
            <a className="specific-link" onClick={this.handleClick} href="#">Click here</a>*/

}






