import React, { Component } from 'react';

import {
  Container,
  Controls,
  PlayButton,
  ClipButton,
  ProgressBar,
  ProgressBarContainer,
} from './Layout';

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      currentTime: 0,
      duration: 0,
      ended: false,
    };
    this.video = React.createRef();
    this.progressBarContainer = React.createRef();
    this.playToggleHandler = this.playToggleHandler.bind(this);
    this.timeUpdateHandler = this.timeUpdateHandler.bind(this);
    this.durationChangeHandler = this.durationChangeHandler.bind(this);
    this.endedHandler = this.endedHandler.bind(this);
    this.clickProgressBarHandler = this.clickProgressBarHandler.bind(this);
    this.pauseHandler = this.pauseHandler.bind(this);
  }

  playToggleHandler() {
    const videoElement = this.video.current;
    const { playing, ended } = this.state;
    if (playing) videoElement.pause();
    else if (!ended) videoElement.play();
    else {
      videoElement.currentTime = 0;
      videoElement.play();
      this.setState({
        ended: false,
      });
    }
    this.setState({
      playing: !playing,
    });
  }

  timeUpdateHandler() {
    const videoElement = this.video.current;
    this.setState({
      currentTime: videoElement.currentTime,
    });
  }

  durationChangeHandler() {
    const videoElement = this.video.current;
    this.setState({
      duration: videoElement.duration,
    });
  }

  endedHandler() {
    const videoElement = this.video.current;
    this.setState({
      ended: videoElement.ended,
      playing: false,
    });
  }

  clickProgressBarHandler(event) {
    const rect = this.progressBarContainer.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const width = rect.right - rect.left;
    const videoElement = this.video.current;
    videoElement.currentTime = videoElement.duration * (x / width);
    this.setState({
      currentTime: videoElement.duration * (x / width),
    });
  }

  pauseHandler() {
    this.setState({
      playing: false,
    });
  }

  render() {
    const {
      currentTime,
      playing,
      duration,
      ended,
    } = this.state;
    return (
      <Container>
        <Controls>
          <PlayButton onClick={this.playToggleHandler}>
            <i className={`fa ${playing ? 'fa-pause' : ((ended && 'fa-undo') || 'fa-play')}`} />
          </PlayButton>
          <ProgressBarContainer
            ref={this.progressBarContainer}
            onClick={this.clickProgressBarHandler}
          >
            <ProgressBar progress={`${(currentTime * 100) / duration}%`} />
          </ProgressBarContainer>
          <ClipButton>
            <i className="fa fa-map-marker" />
          </ClipButton>
        </Controls>
        <video
          width="600"
          ref={this.video}
          onTimeUpdate={this.timeUpdateHandler}
          onDurationChange={this.durationChangeHandler}
          onEnded={this.endedHandler}
          onPause={this.pauseHandler}
        >
          <source src={`${process.env.PUBLIC_URL}/video.mp4#t=30,40`} type="video/mp4" />
        </video>
      </Container>
    );
  }
}
