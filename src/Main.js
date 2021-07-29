import React from 'react'


class Main extends React.Component {
  render () {
    return(
      <>
      <h1>Explore the City</h1>
      <form onSubmit={this.props.handleSubmit}>
        <input onChange={this.props.handleChange}/>
        <button>Explore!</button>
      </form>
      {this.props.renderCityName ? <h2>City Name: {this.props.city}</h2>: ''}
      {this.props.renderLatLon ? <h4>Latitude: {this.props.lat}, Longitude: {this.props.lon}</h4>: ''}
      </>
    )
  }
}

export default Main;
