import React, { Component }  from 'react';
import './App.css';
import RadialChart from './RadialChart.js';

const apiEnpoint = 'http://localhost:52029/api/v2/sensors';
const coldColor = 'rgba(95, 255, 255, 0.801)';
const warmColor = 'rgba(255, 101, 101, 0.801)';

export default class App extends Component {
  constructor(){
    super();
    this.refreshData = this.refreshData.bind(this);
    this.state = 
    {
      iterator: 1,
      percentage: 0,
      progressColor: coldColor,
      textColor: coldColor
    };
  }

  refreshData(temperature)  {
    this.setState({
      iterator: this.state.iterator + 1,
      percentage: temperature,
      progressColor: this.defineColor(temperature),
      textColor: this.defineColor(temperature)
    });
  }
  
  defineColor(temperature) {
    return temperature < 0 ? coldColor : warmColor;
  }

  componentDidMount(){
    try {
      setInterval (async () => {
        const res = await fetch(apiEnpoint).then((response) => {
          if (response.status !== 200) {
            throw new Error("Bad response: " + response);
          }
          return response;
      });
        const sensorsData = await res.json();
        var temperatureValue = sensorsData.temperature;
        if (temperatureValue === undefined){
          temperatureValue = 0;
        }
        this.refreshData(temperatureValue);
      }, 10000);
    } catch(e) {
      this.refreshData(0);
    }
  }
  componentWillUnmount(){
    this.interval = null;
  }
  
  render () {
      return (        
        <div className="App">
          <header className="App-header">            
            <div id="chart">
            <RadialChart
              strokeWidth="10"
              sqSize="200"
              percentage={this.state.percentage}
              progressColor={this.state.progressColor}
              textColor={this.state.textColor}/>
            </div>
            <div id="iteration">                          
            Iteration: {this.state.iterator}
          </div>
          </header>
          </div>
      );
    }
}






