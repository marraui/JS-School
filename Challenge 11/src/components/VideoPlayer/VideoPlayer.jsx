import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions/index';
import ClipMarker from '../ClipMarker/ClipMarker';
import {
  Container,
  Controls,
  PlayButton,
  ClipButton,
  ProgressBar,
  ProgressBarContainer,
  Overlay,
  Video,
} from './Layout';

function mapStateToProps(state) {
  return {
    interval: state.selectedInterval,
    intervals: state.intervals,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addInterval: (interval) => dispatch(actions.addInterval(interval)),
  };
}
class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      currentTime: 0,
      duration: 0,
      ended: false,
      clipSelected: false,
      firstInterval: null,
    };
    this.video = React.createRef();
    this.progressBarContainer = React.createRef();
    this.playToggleHandler = this.playToggleHandler.bind(this);
    this.timeUpdateHandler = this.timeUpdateHandler.bind(this);
    this.durationChangeHandler = this.durationChangeHandler.bind(this);
    this.endedHandler = this.endedHandler.bind(this);
    this.clickProgressBarHandler = this.clickProgressBarHandler.bind(this);
    this.pauseHandler = this.pauseHandler.bind(this);
    this.clipSelectedHandler = this.clipSelectedHandler.bind(this);
    this.clickOutsideClipHandler = this.clickOutsideClipHandler.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { interval } = this.props;
    if (interval.id !== prevProps.interval.id) {
      this.video.current.currentTime = Math.ceil(interval.start);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        currentTime: Math.ceil(interval.start),
      });
    }
  }

  playToggleHandler() {
    const videoElement = this.video.current;
    const { interval } = this.props;
    const { playing, ended } = this.state;
    if (playing) videoElement.pause();
    else if (!ended) videoElement.play();
    else {
      videoElement.currentTime = interval.start;
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
    const { duration } = this.state;
    const { interval } = this.props;
    const { end } = interval;
    if (interval.end !== null && videoElement.currentTime >= interval.end) {
      videoElement.pause();
      videoElement.currentTime = interval.end;

      this.setState({
        currentTime: interval.end,
        ended: true,
        playing: false,
      });
    } else {
      this.setState({
        currentTime: videoElement.currentTime,
        ended: videoElement.currentTime === (end || duration),
      });
    }
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

  clipSelectedHandler() {
    const { clipSelected } = this.state;
    this.setState({
      clipSelected: !clipSelected,
      firstInterval: null,
    });
  }

  clickProgressBarHandler(event) {
    const { clipSelected, firstInterval, duration } = this.state;
    const { interval, addInterval } = this.props;
    const {
      start,
      end,
    } = interval;

    const rect = this.progressBarContainer.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const width = rect.right - rect.left;

    const videoElement = this.video.current;

    const clipDuration = end ? end - start : duration;
    const newTime = start + clipDuration * (x / width);

    if (!clipSelected) {
      videoElement.currentTime = newTime;
      this.setState({
        currentTime: newTime,
      });
    } else if (firstInterval === null) {
      this.setState({
        firstInterval: Math.round(newTime),
      });
    } else {
      this.setState({
        firstInterval: null,
        clipSelected: false,
      });
      addInterval({
        start: firstInterval,
        end: Math.round(newTime),
        id: new Date().getTime(),
        title: 'New Interval',
      });
    }
  }

  pauseHandler() {
    this.setState({
      playing: false,
    });
  }

  clickOutsideClipHandler() {
    const { clipSelected } = this.state;
    if (!clipSelected) return;
    this.setState({
      clipSelected: false,
      firstInterval: null,
    });
  }

  render() {
    const {
      currentTime,
      playing,
      duration,
      ended,
      clipSelected,
      firstInterval,
    } = this.state;
    const { interval, intervals } = this.props;

    const {
      start,
      end,
    } = interval;

    const clipDuration = end ? end - start : duration;
    const currentTimePercent = clipDuration ? ((currentTime - start) / clipDuration) : 0;
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
            <ProgressBar progress={`${currentTimePercent * 100}%`} />
            {intervals
              .filter((intervalObj) => intervalObj.id !== interval.id)
              .map((intervalObj) => {
                const { start: curStart, id } = intervalObj;
                let { end: curEnd } = intervalObj;
                curEnd = curEnd === null ? duration : curEnd;
                return (
                  <Fragment key={`${id}-interval`}>
                    {curStart >= start && (end === null || curStart <= end) ? (
                      <ClipMarker
                        position={clipDuration ? ((curStart - start) / clipDuration) : 0}
                        key={`${id}-start`}
                      />
                    ) : null}
                    {curEnd >= start && (end === null || curEnd <= end) ? (
                      <ClipMarker
                        position={clipDuration ? ((curEnd - start) / clipDuration) : 0}
                        key={`${id}-end`}
                      />
                    ) : null}
                  </Fragment>
                );
              })}
            {firstInterval ? (
              <ClipMarker position={clipDuration ? ((firstInterval - start) / clipDuration) : 0} />
            ) : null}
          </ProgressBarContainer>
          <ClipButton onClick={this.clipSelectedHandler}>
            <i className="fa fa-map-marker" />
          </ClipButton>
        </Controls>
        {clipSelected ? <Overlay onClick={this.clickOutsideClipHandler} /> : null}
        <Video
          ref={this.video}
          onTimeUpdate={this.timeUpdateHandler}
          onDurationChange={this.durationChangeHandler}
          onEnded={this.endedHandler}
          onPause={this.pauseHandler}
        >
          <source src={`${process.env.PUBLIC_URL}/video.mp4#t=${start}${end ? `,${end}` : ''}`} type="video/mp4" />
        </Video>
      </Container>
    );
  }
}

VideoPlayer.propTypes = {
  interval: PropTypes.shape({
    start: PropTypes.number,
    end: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
  }),
  intervals: PropTypes.arrayOf(PropTypes.shape({
    start: PropTypes.number,
    end: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
  })),
  addInterval: PropTypes.func.isRequired,
};

VideoPlayer.defaultProps = {
  interval: {
    start: 0,
    end: null,
    id: 0,
    title: 'Full video',
  },
  intervals: [{
    start: 0,
    end: null,
    id: 0,
    title: 'Full video',
  }],
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
