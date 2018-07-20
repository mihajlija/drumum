import React, { Component } from 'react';
import './App.css';

const buttons = [
  {
    name: "heat",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    keyCode: "81",
    char: "Q"
  },
  {
    name: "heat2",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    keyCode: "87",
    char: "W"
  },
  {
    name: "heat3",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    keyCode: "69",
    char: "E"
  },
  {
    name: "heat4",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    keyCode: "65",
    char: "A"
  },
  {
    name: "heat6",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    keyCode: "83",
    char: "S"
  },
  {
    name: "disc",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    keyCode: "68",
    char: "D"
  },
  {
    name: "kickhat",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    keyCode: "90",
    char: "Z"
  },
  {
    name: "kick",
    src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    keyCode: "88",
    char: "X"
  },
  {
    name: "clap",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    keyCode: "67",
    char: "C"
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: buttons
    };
  }

  componentDidMount() {
    function play(e) {
      const display = document.getElementById("display");
      const audio = document.getElementById(e.key.toUpperCase()); //test failing because of the toUpperCase method, get audio by keycode

      if (audio) {
        audio.currentTime = 0; //rewind to start
        audio.play();
        const drumPad = audio.parentNode;
        drumPad.classList.add("playing");
        display.innerText = audio.parentNode.id;
      }
    }

    function removeTransition(e) {
      if (e.propertyName !== "transform") return;
      this.classList.remove("playing");
    }

    const drumPads = document.querySelectorAll(".drum-pad");
    drumPads.forEach(drumPad =>
      drumPad.addEventListener("transitionend", removeTransition)
    );
    window.addEventListener("keydown", play);
  }

  render() {
    return (
      <div id="drum-machine">
        <div id="device">
          <div id="display">wallop</div>
          <div id="keypad">
            {this.state.buttons.map(button => (
              <Key
                src={button.src}
                key={button.keyCode}
                name={button.name}
                char={button.char}
              />
            ))}
            </div>
        </div>
      </div>
    );
  }
}

class Key extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="drum-pad" id={this.props.name}>
        {this.props.char}
        <Clip id={this.props.char} src={this.props.src} />
      </div>
    );
  }
}

class Clip extends Component {

  render() {
    return <audio id={this.props.id} src={this.props.src} className="clip" />;
  }
}



export default App;
