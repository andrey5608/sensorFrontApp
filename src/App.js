import React, { Component }  from 'react';
import RadialChart from './RadialChart.js';
import './App.css';

const apiEnpoint = 'http://192.168.0.174:8080/tempAndHumidity';
const coldColor = 'rgba(95, 255, 255, 0.801)';
const warmColor = 'rgba(255, 101, 101, 0.801)';

export default class App extends Component {
  constructor(){
    super();
    this.refreshTemperatureData = this.refreshTemperatureData.bind(this);
    this.state = 
    {
      iterator: 0,
      roomTemperature: 0,
      boardTemperature: 0,
      roomTempColor: coldColor,
      boardTempColor: coldColor,
      messages: undefined
    };
    this.repeatThreeTimesForTest = this.repeatThreeTimesForTest.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  refreshTemperatureData(temperature)  {
    this.setState({
      iterator: this.state.iterator + 1,
      roomTemperature: Number(temperature),
      roomTempColor: this.defineColor(temperature, 21)      
    });
  }

  refreshBoardInfo(temperature)  {
    this.setState({
      boardTemperature: Number(temperature),
      boardTempColor: this.defineColor(temperature, 42)
    });
  }
  
  defineColor(temperature, averageTemp) {
    return temperature <= averageTemp ? coldColor : warmColor;
  }

  repeatThreeTimesForTest(){
    var maxCount = 3;// we can show three time how app works without using an API
    var randomNumber = 0;
    
    for(var i = 0; i < maxCount; i++){
      randomNumber =  Math.floor(Math.random() * 9);
        this.refreshTemperatureData(randomNumber);
    }
  }

  componentDidMount(){
    setTimeout(() => {this.repeatThreeTimesForTest()}, 10000);
    this.setState({iterator: 0, percentage: 0, progressColor: coldColor, textColor: coldColor});
    try {
      setInterval (async () => {
        const res = await fetch(apiEnpoint).then((response) => {
          if (response.status !== 200) {
            throw new Error(`Bad response: "${response}"`);
          }
          return response;
      });
        const result = await res.json();
        var temperatureValue = result.sensorsData.temperature;
        var boardTempValue = result.sensorsData.boardCpuTemp;
        if (temperatureValue === undefined && boardTempValue === undefined){
          console.log("temperatureValue  and boardTempValue are undefined. set values as 0.")
          temperatureValue = 0;
          boardTempValue = 0;
        }
        this.refreshTemperatureData(temperatureValue);
        this.refreshBoardInfo(boardTempValue);
      }, 10000);
    } catch(e) {
      this.refreshTemperatureData(0);
      this.refreshBoardInfo(0);
    }
  }

  componentWillUnmount(){
    this.interval = null;
  }
  
  render () {
      return (        
        <div className="App">
          <header className="App-header">           
            This app should work fine with <a href="https://github.com/andrey5608/sensorApi">sensor API</a>
          </header>
        <div className="App-main">
            <div id="roomTempChart">
              Temperature in the room
              <br />
              <br />
              <RadialChart
                strokeWidth="10"
                sqSize="200"
                maxValue="40"
                percentage={this.state.roomTemperature}
                progressColor={this.state.roomTempColor}
                textColor={this.state.roomTempColor}/>
            </div>
            <br />
            <div id="boardTempChart">
              Board temperature
              <br />
              <br />
              <RadialChart
                strokeWidth="10"
                sqSize="200"
                maxValue="100"
                percentage={this.state.boardTemperature}
                progressColor={this.state.boardTempColor}
                textColor={this.state.boardTempColor}/>
            </div>
            <div id="iteration">                          
              Iteration: {this.state.iterator}
            </div>
            <div id='messages'>{this.state.messages !== undefined ? this.state.messages : ""}</div>
          </div>
        </div>
      );
    }
}






