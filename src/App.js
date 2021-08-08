import React from 'react';
import './App.css';
import axios from 'axios';
import Main from './Main.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'

class App extends React.Component { //Creates the App.js as a React component
  constructor(props) { //Constructor that sets that allows you to adjust and change the starting state
    super(props);
    this.state = {
      city: '',
      cityResult: '',
      movieData: [],
      weather: [],
      renderLatLon: false,
      renderCityName: false,
      renderCityImg: false,
      renderError: false,
      displayWeather: false,
      displayMovie: false,
      lat: 0, // These two lines are gravy using it to keep track of lat and lon from the start
      lon: 0,
      mapImgSrc: " ",
      errorMessage: '',
    }
  }

  handleChange = (e) => { //Handles the value of City as the user inputs it
    this.setState({ city: e.target.value })
  }

  getWeatherData = async () => {
    let weatherData = await axios.get(`http://localhost:3001/weather?lat=${this.state.lat}&lon=${this.state.lon}`
    // {
    //   params: {
    //     lat: this.state.lat,
    //     lon: this.state.lon,
    //   }
    // }
    ) 
    this.setState({
      weather: weatherData.data,
    })
  }

  getMovieData = async () => {
    let movieData = await axios.get(`http://localhost:3001/movies?city=${this.state.city}` 
    // {
    //   params: {
    //     city: this.state.city
    //   }
    // }
    ) 
    this.setState({
      movieData: movieData.data
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let locationIQSubmitResults = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`)
      let mapImgSrc = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${locationIQSubmitResults.data[0].lat},${locationIQSubmitResults.data[0].lon}&zoom=12`

      this.setState({
        renderCityName: true,
        renderLatLon: true,
        renderCityImg: true,
        displayWeather: true,
        displayMovie: true,
        renderError: false,
        cityResults: locationIQSubmitResults.data[0].display_name,
        lat: locationIQSubmitResults.data[0].lat,
        lon: locationIQSubmitResults.data[0].lon,
        mapImgSrc: mapImgSrc
      })
    } catch (error) {
      console.log('my error', error.response);
      this.setState({
        renderError: true,
        renderCityName: false,
        displayWeather: false,
        renderLatLon: false,
        renderCityImg: false,
        errorMessage: `Error Occurred: ${error.response.status}, ${error.response.data.error}`,
      })
    }
    this.getWeatherData();
    this.getMovieData();
  }


  render() {
    return (
      <Container id="main">
        <Main
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          getData={this.getData}
          renderCityImg={this.state.renderCityImg}
          renderCityName={this.state.renderCityName}
          renderLatLon={this.state.renderLatLon}
          renderError={this.state.renderError}
          displayWeather={this.state.displayWeather}
          displayMovie={this.state.displayMovie}
          weather={this.state.weather}
          movieData={this.state.movieData}
          city={this.state.cityResults}
          lat={this.state.lat}
          lon={this.state.lon}
          mapImgSrc={this.state.mapImgSrc}
          errorMessage={this.state.errorMessage}
        />
      </Container>
    )
  }
}

export default App;
