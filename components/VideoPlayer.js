import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import YouTube from 'react-native-youtube';

const VideoPlayer = ({playlist, activeVideoIndex = 0}) => {
  const [state, setState] = useState({
    videoId: playlist[activeVideoIndex]
  });

  useEffect(() => {
    setState({videoId: playlist[activeVideoIndex]});
  }, [playlist, activeVideoIndex]);

  const nextVideo = e => {
    if (e.state === 'ended') {
      let nextIndex = activeVideoIndex + 1;
      if (nextIndex === playlist.length) {
        nextIndex = 0;
      }
      setState({videoId: playlist[nextIndex]});
    }
  };

  return (
    <YouTube
      style={styles.videoPlayer}
      videoId={state.videoId}
      play
      onChangeState={nextVideo}
    />
  );
};

const styles = StyleSheet.create({
  videoPlayer: {
    alignSelf: 'stretch',
    height: '100%',
  },
});

export default VideoPlayer;
