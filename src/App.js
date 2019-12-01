import React, { Component }  from 'react';
import './App.css';
import RadialChart from './RadialChart.js';


export default class App extends Component {
  constructor(){
    super();
    this.refreshData = this.refreshData.bind(this);
    this.state = 
    {
      iterator: 1,
      percentage: 25,
      progressColor: 'rgb(222, 204, 255)'
    };
  }

  refreshData(temperature)  {
    this.setState({iterator: this.iterate(this.state.iterator)});
    this.setState({percentage: temperature});
  } 
  iterate(newIter) {
    return newIter + 1;
  }

  componentDidMount(){
    try {
      setInterval(async () => {
        const res = await fetch('http://localhost:52029/api/v2/sensors');
        const sensorsData = await res.json();
        var temperatureValue = sensorsData.temperature;
        if (temperatureValue === undefined){
          temperatureValue = "unknown";
        }

        this.refreshData(temperatureValue);
      }, 10000);
    } catch(e) {
      console.log(e);
    }
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
}






