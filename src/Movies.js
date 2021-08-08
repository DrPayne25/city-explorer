import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

class Movies extends React.Component {
  renderMovies() {
    let arr = this.props.movieData.map((movie, idx) => {
      return (
        <Carousel.Item key={idx}>
        <img
        src={movie.image_url}
        alt={movie.overview}
        />
        <Carousel.Caption>
          {console.log(movie)}
          <h3>Title: {movie.title}</h3>
          <p>{movie.title} was released on {movie.released_on}.</p>
        </Carousel.Caption>
      </Carousel.Item>
      )
    })
    return arr;
  }
  render() {
    
    return (
      <>
      <h2>Movies Based on this City</h2>
      <Carousel fade>
        {this.renderMovies()}
      </Carousel>
      </>
    )
  }
}

export default Movies;
