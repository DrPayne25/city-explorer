import React from 'react';
import './App.css';
import axios from 'axios';
import Main from './Main.js'

class App extends React.Component{ //Creates the App.js as a React component
  constructor(props){ //Constructor that sets that allows you to adjust and change the starting state
    super(props);
    this.state = {
      city: '',
      renderLatLon: false,
      renderCityName: false,
      lat: 0, // These two lines are gravy using it to keep track of lat and lon from the start
      lon: 0,

    }
  }

  handleChange = (e) => { //Handles the value of City as the user inputs it
    this.setState({city: e.target.value})
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    let submitResults = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`)
    this.setState({
      renderCityName: true,
      renderLatLon: true,
      city: submitResults.data[0].display_name,
      lat: submitResults.data[0].lat,
      lon: submitResults.data[0].lon,
    })
  }


  render() { 
    return (
      <Main 
      handleChange={this.handleChange}
      handleSubmit={this.handleSubmit}
      renderCityName={this.state.renderCityName}
      renderLatLon={this.state.renderLatLon}
      city={this.state.city}
      lat={this.state.lat}
      lon={this.state.lon}
      />
    )
  }
}

export default App;
