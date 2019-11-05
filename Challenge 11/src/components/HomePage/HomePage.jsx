import React from 'react';
import {
  Container,
  VideoContainer,
} from './Layout';
import VideoPlayer from '../VideoPlayer/VideoPlayer';

export default function HomePage() {
  return (
    <Container>
      <VideoContainer>
        <VideoPlayer />
      </VideoContainer>
    </Container>
  );
}
