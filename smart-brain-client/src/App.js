import React, { Component } from 'react';
import Particles from 'react-particles-js';
import FaceDetection from './components/FaceDetection/FaceDetection';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import EntryCount from './components/EntryCount/EntryCount';
import './App.css';

const particlesOptions = {
  "particles": {
    "number": {
      "value": 50
    },
    "size": {
      "value": 3
    }
  },
  "interactivity": {
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      }
    }
  }
};

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: 'SignIn',
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    username: "",
    entries: 0,
    joined: ""
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({ user: data });
  }

  onRouteChange = (route) => {
    if (route === 'Home') {
      this.setState({ isSignedIn: true });
    } else {
      this.setState(initialState);
    }
    this.setState({ route: route });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onPictureSubmit = () => {
    if (!this.state.input) {
      return console.log("Image url unfilled");
    }
    this.setState({ imageUrl: this.state.input });
    fetch('https://xsmart-brain.herokuapp.com/api/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl: this.state.input })
    })
      .then(response => response.json())
      .then(response => {
        fetch('https://xsmart-brain.herokuapp.com/api/image', {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count }))
          });
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(console.log);
  }

  calculateFaceLocation = (data) => {
    if (!data.outputs) {
      return console.log("No picture found");
    }
    if (!data.outputs[0].data.regions) {
      return console.log("No face detected");
    }
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('input-image');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: width * clarifaiFace.left_col,
      topRow: height * clarifaiFace.top_row,
      rightCol: width - width * clarifaiFace.right_col,
      bottomRow: height - height * clarifaiFace.bottom_row
    }
  }

  displayFaceBox = (box) => {
    if (box) {
      this.setState({ box: box });
    } else {
      this.setState({ box: initialState.box });
    }
  }


  render() {
    const { route, isSignedIn, imageUrl, box, user } = this.state;
    return (
      <div className='App' >
        <Particles className='particles' params={particlesOptions} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        {route === 'Home'
          ? <div>
            <Logo />
            <EntryCount name={user.name} entries={user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit} />
            <FaceDetection box={box} imageUrl={imageUrl} />
          </div>
          : (route === 'SignIn'
            ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />)}
      </div>
    );
  }
}

export default App;
