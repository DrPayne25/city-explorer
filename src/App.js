import React from 'react';
import './App.css';
import axios from 'axios';
import Main from './Main.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

class App extends React.Component { //Creates the App.js as a React component
  constructor(props) { //Constructor that sets that allows you to adjust and change the starting state
    super(props);
    this.state = {
      city: '',
      renderLatLon: false,
      renderCityName: false,
      renderCityImg: false,
      renderError: false,
      lat: 0, // These two lines are gravy using it to keep track of lat and lon from the start
      lon: 0,
      imgSrc: "",
      errorMessage: '',
    }
  }

  handleChange = (e) => { //Handles the value of City as the user inputs it
    this.setState({ city: e.target.value })
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let submitResults = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`)
      let imageSrc = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${submitResults.data[0].lat},${submitResults.data[0].lon}&zoom=12`

      this.setState({
        renderCityName: true,
        renderLatLon: true,
        renderCityImg: true,
        renderError: false,
        city: submitResults.data[0].display_name,
        lat: submitResults.data[0].lat,
        lon: submitResults.data[0].lon,
        imgSrc: imageSrc
      })
    } catch (error) {
      console.log('my error', error.response);
      this.setState({
        renderError: true,
        renderCityName: false,
        renderLatLon: false,
        renderCityImg: false,
        errorMessage: `Error Occured: ${error.response.status}, ${error.response.data.error}`,
      })
    }

  }


  render() {
    return (
      <Container id="main">
        <Main
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          renderCityImg={this.state.renderCityImg}
          renderCityName={this.state.renderCityName}
          renderLatLon={this.state.renderLatLon}
          renderError={this.state.renderError}
          city={this.state.city}
          lat={this.state.lat}
          lon={this.state.lon}
          imgSrc={this.state.imgSrc}
          errorMessage={this.state.errorMessage}
        />
      </Container>
    )
  }
}

export default App;
