import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import YouTube from 'react-native-youtube';

const VideoPlayer = ({channelId, playlist, activeVideoId, updatePlayedVideo}) => {
  const [state, setState] = useState({
    videoId: playlist[0]
  });

  useEffect(() => {
    setState({videoId: activeVideoId});
  }, [playlist, activeVideoId]);

  const nextVideo = e => {
    if (e.state === 'ended') {
      let nextIndex = playlist.findIndex(videoId => videoId === state.videoId) + 1;
      if (nextIndex === playlist.length) {
        nextIndex = 0;
      }
      updatePlayedVideo(channelId, state.videoId, playlist[nextIndex]);
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
