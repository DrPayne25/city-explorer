import React from 'react';
import './App.css';
import axios from 'axios';

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

    console.log(submitResults.data[0]);
    this.setState({
      renderCityName: true,
      renderLatLon: true,
      city: submitResults.data[0].display_name,
      lat: submitResults.data[0].lat,
      lon: submitResults.data[0].lon,
    })
  }


  render() { 
    console.log(this.state);
    return (
      <>
      <h1>Explore the City</h1>
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleChange}/>
        <button>Explore!</button>
      </form>
      {this.state.renderCityName ? <h2>City Name: {this.state.city}</h2>: ''}
      {this.state.renderLatLon ? <h4>Latitude: {this.state.lat}, Longitude: {this.state.lon}</h4>: ''}
      </>
    )
  }
}

export default App;
