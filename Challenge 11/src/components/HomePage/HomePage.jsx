import React from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  VideoContainer,
  ClipContainer,
} from './Layout';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import Clip from '../Clip/Clip';

export default function HomePage() {
  const intervals = useSelector((state) => state.intervals);
  return (
    <Container>
      <VideoContainer>
        <VideoPlayer />
      </VideoContainer>
      <ClipContainer>
        {intervals.map((interval) => (
          <Clip
            start={interval.start}
            end={interval.end}
            title={interval.title}
            id={interval.id}
            key={interval.id}
          />
        ))}
      </ClipContainer>
    </Container>
  );
}
