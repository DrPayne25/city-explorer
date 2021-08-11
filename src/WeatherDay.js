import React from 'react'

class WeatherDay extends React.Component {
  render() {
    return (
      <>
      {this.props.weather.map((city, idx) => <h5 key={idx}>{city.description}</h5>)}
      </>
    )
  }
}
    
export default WeatherDay;
