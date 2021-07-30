import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import "./Main.css"
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
// import Card from 'react-bootstrap/Card'


class Main extends React.Component {
  render () {
    return(
      <Container>
        <h1>Explore the City</h1>
        <Form class="city_form" onSubmit={this.props.handleSubmit}>
          <Form.Group>
            <Form.Label>City Name</Form.Label>
          <Form.Control as='input' onChange={this.props.handleChange} />
          </Form.Group>
          <Button id='city_button' variant='primary' type='submit'>Explore!</Button>
        </Form>
          {this.props.renderCityName ? <h3>City Name: {this.props.city}</h3>: ''}
          {this.props.renderLatLon ? <h5>Latitude: {this.props.lat}, Longitude: {this.props.lon}</h5>: ''}
          {this.props.renderError ? <h5>{this.props.errorMessage}</h5> : ''}
          {this.props.renderCityImg ? <Image src={this.props.imgSrc} alt={this.props.city} rounded/> : ''}
      </Container>
    )
  }
}

export default Main;
