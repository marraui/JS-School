import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import {
  Container,
  VideoContainer,
  ClipContainer,
  VideoTitle,
} from './Layout';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import Search from '../Search/Search';
import theme, { alternativeTheme } from '../../styles/theme';
import Clip from '../Clip/Clip';

export default function HomePage() {
  const intervals = useSelector((state) => state.intervals);
  const searchValue = useSelector((state) => state.searchValue);
  const selectedInterval = useSelector((state) => state.selectedInterval);
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
