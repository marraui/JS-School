/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { take } from 'rxjs/operators';
import { timer } from 'rxjs';
import { intervalPropType } from '../../constants/proptypes-shape';
import defaultInterval from '../../constants/default-interval';
import theme from '../../styles/theme';
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
  ClipMessage,
  ProgressBarMessage,
  CountDown,
} from './Layout';

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      currentTime: 0,
      duration: 0,
      ended: false,
      clipSelected: false,
      firstInterval: null,
      hoveringClipMarker: null,
      countDown: null,
    };
    this.countDownTimer$ = null;

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
    this.mouseOverProgressBarHandler = this.mouseOverProgressBarHandler.bind(this);
    this.mouseExitProgressBarHandler = this.mouseExitProgressBarHandler.bind(this);
    this.mouseMoveInsideProgresBarHandler = this.mouseMoveInsideProgresBarHandler.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', (event) => {
      if (event.keyCode === 39) this.goToNextInterval();
      else if (event.keyCode === 37) this.goToPrevInterval();
    });
  }

  componentDidUpdate(prevProps) {
    const { interval, autoPlay } = this.props;
    if (interval.id !== prevProps.interval.id) {
      const videoElement = this.video.current;
      videoElement.currentTime = interval.start;
      if (autoPlay) videoElement.play();

      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        currentTime: interval.start,
        playing: autoPlay,
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
    const { interval, intervals } = this.props;
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
      const isEnd = Math.abs(videoElement.currentTime - (end || duration)) < 0.0001;
      this.setState({
        currentTime: videoElement.currentTime,
        ended: isEnd,
      });
      if (isEnd) {
        const index = intervals.findIndex((auxInterval) => auxInterval.id === interval.id);
        if (index + 1 < intervals.length) this.initCountDown();
      } else if (this.countDownTimerSubscription) {
        this.countDownTimerSubscription.unsubscribe();
      }
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
    const { intervals, interval } = this.props;
    const index = intervals.findIndex((auxInterval) => auxInterval.id === interval.id);
    if (index + 1 < intervals.length) this.initCountDown();
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
        firstInterval: newTime,
      });
    } else {
      this.setState({
        firstInterval: null,
        clipSelected: false,
      });
      addInterval({
        start: firstInterval,
        end: newTime,
        id: new Date().getTime(),
        title: 'New Interval',
        tags: [],
        color: theme.secondary,
      });
    }
  }

  mouseOverProgressBarHandler(event) {
    const { duration } = this.state;
    const { interval } = this.props;
    const {
      start,
      end,
    } = interval;
    const rect = this.progressBarContainer.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const width = rect.right - rect.left;

    const clipDuration = end ? end - start : duration;
    const newTime = start + clipDuration * (x / width);
    this.setState({
      hoveringClipMarker: newTime,
    });
  }

  mouseMoveInsideProgresBarHandler(event) {
    const { hoveringClipMarker, duration } = this.state;
    if (hoveringClipMarker === null) return;

    const { interval } = this.props;
    const {
      start,
      end,
    } = interval;
    const rect = this.progressBarContainer.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const width = rect.right - rect.left;

    const clipDuration = end ? end - start : duration;
    const newTime = start + clipDuration * (x / width);
    this.setState({
      hoveringClipMarker: newTime,
    });
  }

  mouseExitProgressBarHandler() {
    this.setState({
      hoveringClipMarker: null,
    });
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

  goToNextInterval() {
    const {
      intervals,
      interval,
      selectInterval,
    } = this.props;
    const index = intervals.findIndex((auxInterval) => auxInterval.id === interval.id);
    if (index + 1 < intervals.length) selectInterval(intervals[index + 1]);
  }

  goToPrevInterval() {
    const {
      intervals,
      interval,
      selectInterval,
    } = this.props;
    const index = intervals.findIndex((auxInterval) => auxInterval === interval.id);
    if (index - 1 >= 0) selectInterval(intervals[index - 1]);
  }

  initCountDown() {
    const { autoPlay } = this.props;
    if (!autoPlay) return;
    if (this.countDownTimerSubscription) this.countDownTimerSubscription.unsubscribe();
    this.setState({
      countDown: 3,
    });
    this.countDownTimerSubscription = timer(1000, 1000).pipe(
      take(3),
    ).subscribe(() => {
      const { countDown } = this.state;
      this.setState({
        countDown: countDown - 1,
      });
    }, () => { }, () => {
      this.goToNextInterval();
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
      hoveringClipMarker,
      countDown,
    } = this.state;
    const {
      interval,
      intervals,
      selectInterval,
      editable,
    } = this.props;

    const {
      start,
      end,
    } = interval;

    const clipDuration = end ? end - start : duration;
    const currentTimePercent = Math.max(clipDuration
      ? ((currentTime - start) / clipDuration)
      : 0,
    0);

    return (
      <Container>
        <Controls>
          <PlayButton onClick={this.playToggleHandler}>
            <i className={`fa ${playing ? 'fa-pause' : ((ended && 'fa-undo') || 'fa-play')}`} />
          </PlayButton>
          <ProgressBarContainer
            ref={this.progressBarContainer}
            onClick={this.clickProgressBarHandler}
            onMouseOver={this.mouseOverProgressBarHandler}
            onMouseLeave={this.mouseExitProgressBarHandler}
            onMouseMove={this.mouseMoveInsideProgresBarHandler}
          >
            <ProgressBar progress={`${currentTimePercent * 100}%`} />
            {intervals
              .filter((intervalObj) => intervalObj.id !== interval.id)
              .map((intervalObj) => {
                const { start: curStart, id, color } = intervalObj;
                let { end: curEnd } = intervalObj;
                curEnd = curEnd === null ? duration : curEnd;
                return (
                  <Fragment key={`${id}-interval`}>
                    {curStart >= start && (end === null || curStart <= end) ? (
                      <ClipMarker
                        position={clipDuration ? ((curStart - start) / clipDuration) : 0}
                        key={`${id}-start`}
                        onSelect={() => selectInterval(intervalObj)}
                        color={color}
                      />
                    ) : null}
                    {curEnd >= start && (end === null || curEnd <= end) ? (
                      <ClipMarker
                        position={clipDuration ? ((curEnd - start) / clipDuration) : 0}
                        key={`${id}-end`}
                        onSelect={() => selectInterval(intervalObj)}
                        color={color}
                      />
                    ) : null}
                  </Fragment>
                );
              })}
            {firstInterval ? (
              <ClipMarker
                position={clipDuration ? ((firstInterval - start) / clipDuration) : 0}
              />
            ) : null}
            {clipSelected && hoveringClipMarker !== null ? (
              <ClipMarker
                position={clipDuration ? ((hoveringClipMarker - start) / clipDuration) : 0}
              />
            ) : null}
            {clipSelected ? (
              <ProgressBarMessage>
                Click on the progress bar to mark clip
              </ProgressBarMessage>
            ) : null}
          </ProgressBarContainer>
          {editable ? (
            <ClipButton onClick={this.clipSelectedHandler}>
              <i className="fa fa-map-marker" />
              {!clipSelected ? (
                <ClipMessage>
                Click here to make new clip
                </ClipMessage>
              ) : null}
            </ClipButton>
          ) : <div />}
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
        {countDown ? <CountDown count={countDown} /> : null}
      </Container>
    );
  }
}

VideoPlayer.propTypes = {
  interval: intervalPropType,
  intervals: PropTypes.arrayOf(intervalPropType),
  addInterval: PropTypes.func.isRequired,
  selectInterval: PropTypes.func.isRequired,
  editable: PropTypes.bool,
  autoPlay: PropTypes.bool,
};

VideoPlayer.defaultProps = {
  interval: defaultInterval,
  intervals: [defaultInterval],
  editable: true,
  autoPlay: true,
};
