import React from 'react'
import ListGroup  from 'react-bootstrap/ListGroup';
import "./Weather.css"

class Weather extends React.Component {
  render() {
    return (
      <ListGroup id='list-group'>
      {this.props.weather.map((city, idx) => <ListGroup.Item variant="success" key={idx}>{city.description}</ListGroup.Item>)}
      </ListGroup>
    )
  }
}
    
export default Weather;
    
