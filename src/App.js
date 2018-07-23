import React from 'react'
import './App.css'

const buttons = [
  {
    name: 'heat',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
    keyCode: '81',
    char: 'Q'
  },
  {
    name: 'heat2',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
    keyCode: '87',
    char: 'W'
  },
  {
    name: 'heat3',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
    keyCode: '69',
    char: 'E'
  },
  {
    name: 'heat4',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
    keyCode: '65',
    char: 'A'
  },
  {
    name: 'heat6',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
    keyCode: '83',
    char: 'S'
  },
  {
    name: 'disc',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
    keyCode: '68',
    char: 'D'
  },
  {
    name: 'kickhat',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
    keyCode: '90',
    char: 'Z'
  },
  {
    name: 'kick',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
    keyCode: '88',
    char: 'X'
  },
  {
    name: 'clap',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
    keyCode: '67',
    char: 'C'
  }
]

class App extends React.Component {
  state = {
    name: 'woop'
  }

  setName = name => {
    this.setState({
      name
    })
  }

  render () {
    return (
      <div id='drum-machine'>
        <div id='device'>
          <div id='display'>{this.state.name}</div>
          <div id='keypad'>
            {buttons.map(button => (
              <Key
                setName={this.setName}
                src={button.src}
                char={button.char}
                key={button.keyCode}
                keyCode={button.keyCode}
                name={button.name}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

class Key extends React.Component {
  audioRef = React.createRef()
  keyRef = React.createRef()

  state = {
    transition: false
  }

  componentDidMount () {
    window.addEventListener('keydown', this.shouldIPlay)
    window.addEventListener('keyup', this.removeTransition)
    this.keyRef.current.addEventListener('transitionend', this.removeTransition)
  }

  play = () => {
    this.audioRef.current.currentTime = 0
    this.audioRef.current.play()
    this.props.setName(this.props.name)
    this.setState({
      transition: true
    })
  }

  removeTransition = () =>
    this.setState({
      transition: false
    })

  shouldIPlay = e => {
    if (this.props.keyCode === e.keyCode.toString()) {
      this.play()
    }
  }

  render () {
    return (
      <div
        ref={this.keyRef}
        id={this.props.name}
        className={`drum-pad ${this.state.transition ? 'playing' : ''}`}
        onClick={this.play}
      >
        {this.props.char}
        <audio
          ref={this.audioRef}
          id={this.props.char}
          className='clip'
          src={this.props.src}
        />
      </div>
    )
  }
}

export default App
