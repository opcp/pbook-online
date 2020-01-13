import React from 'react'

class BGsound extends React.Component {
  constructor() {
    super()
    this.state = {
      play: false,
    }
  }

  autoPlay = () => {
    this.bgaudio.play()
    this.setState({ play: true })
  }

  closePlay = () => {
    this.bgaudio.pause()
    this.bgaudio.load()
    this.setState({ play: false })
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <audio
          src={require('./sound/changeGameBGsound.mp3')}
          controls="controls"
          loop={false}
          hidden={true}
          ref={audio => (this.bgaudio = audio)}
        ></audio>

        {this.state.play ? (
          <img
            src={require('./images/Stop_button_play_pause_music.png')}
            className="myBGsoundBTN"
            alt="音樂停止按鈕"
            onClick={this.closePlay}
          />
        ) : (
          <img
            src={require('./images/Play_button_next_stop_music_pause.png')}
            className="myBGsoundBTN"
            alt="音樂開始按鈕"
            onClick={this.autoPlay}
          />
        )}
      </>
    )
  }
}

export default BGsound
