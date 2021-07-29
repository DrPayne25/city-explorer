import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component{ //Creates the App.js as a React component
  constructor(props){ //Constructor that sets that allows you to adjust and change the starting state
    super(props);
    this.state = {
      city: '',
      renderLatLon: false,

    }
  }

  handleChange = (e) => { //Handles the value of City as the user inputs it
    this.setState({city: e.target.value})
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    let submitResults = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`)

    console.log(submitResults);
  }


  render() { 
    console.log(this.state);
    return (
      <>
      <h1>Explore the City</h1>
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleChange}/>
        <button>Which City Today?</button>
      </form>
      {this.state.renderLatLon ? <h4>Hello World</h4>: ''}
      </>
    )
  }
}

export default App;
