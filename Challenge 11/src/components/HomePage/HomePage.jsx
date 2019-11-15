import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { intervalPropType } from '../../constants/proptypes-shape';
import defaultInterval from '../../constants/default-interval';
import {
  Container,
  VideoContainer,
  ClipContainer,
  VideoTitle,
} from './Layout';
import VideoPlayer from '../VideoPlayer/index';
import Search from '../Search/index';
import theme, { alternativeTheme } from '../../styles/theme';
import Clip from '../Clip/index';

export default function HomePage({
  intervals,
  searchValue,
  selectedInterval,
}) {
  const { title } = selectedInterval;
  const searchRegEx = new RegExp(`${searchValue}`, 'i');
  const shouldDisplayInterval = (interval) => (
    interval.title.match(searchRegEx) || interval.tags.some((tag) => tag === searchValue)
  );
  const intervalsToDisplay = !searchValue ? [...intervals] : [
    intervals[0],
    ...intervals
      .slice(1)
      .filter(shouldDisplayInterval),
  ];

  return (
    <>
      <Search />
      <Container>
        <VideoContainer>
          <VideoPlayer />
          <VideoTitle>
            {title}
          </VideoTitle>
        </VideoContainer>
        <ClipContainer>
          {intervalsToDisplay.map((interval) => (
            <ThemeProvider
              key={`themeprovider-${interval.id}`}
              theme={interval.id === selectedInterval.id
                ? alternativeTheme
                : theme}
            >
              <Clip
                interval={interval}
                key={interval.id}
              />
            </ThemeProvider>
          ))}
        </ClipContainer>
      </Container>
    </>
  );
}

HomePage.propTypes = {
  intervals: PropTypes.arrayOf(intervalPropType),
  searchValue: PropTypes.string,
  selectedInterval: intervalPropType,
};

HomePage.defaultProps = {
  intervals: [],
  searchValue: '',
  selectedInterval: defaultInterval,
};
