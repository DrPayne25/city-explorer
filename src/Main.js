import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import "./Main.css"
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Weather from './Weather.js'
import Movies from './Movies.js'


class Main extends React.Component {

  render () {
    return(
      <Container>
        <h1>Explore the City</h1>
        <Form class="city_form" onSubmit={this.props.handleSubmit}>
          <Form.Group>
            <Form.Label>City Name</Form.Label>
          <Form.Control as='input' onChange={this.props.handleChange} placeholder='Enter a city!' />
          </Form.Group>
          <Button class='button' id='city_button' variant='primary' type='submit'>Explore!</Button>
        </Form>
          {this.props.renderCityName ? <h3>City Name: {this.props.city}</h3>: ''}
          {this.props.renderLatLon ? <h5>Latitude: {this.props.lat}, Longitude: {this.props.lon}</h5>: ''}
          {this.props.renderError ? <h5>{this.props.errorMessage}</h5> : ''}
          {this.props.displayWeather ? <Weather weather={this.props.weather}/>: `${this.props.errorMessage}`}
          {this.props.renderCityImg ? <Image id='CityMap' src={this.props.mapImgSrc} alt={this.props.city} rounded/> : ''}
          {this.props.displayMovie ? <Movies movieData={this.props.movieData}/>: `${this.props.errorMessage}`}
      </Container>
    )
  }
}

export default Main;
