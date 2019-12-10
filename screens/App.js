import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { isEqual, sortBy, uniq } from 'lodash';
import Channel from '../components/Channel';
import VideoPlayer from '../components/VideoPlayer';
import colors from '../utils/colors';
import {channels} from '../utils/channels';
import Playlist from '../components/Playlist';

const initialState = {
  showModal: false,
  activeChannel: channels[0],
  activeVideo: channels[0].playlist[0],
  playedChannels: channels.reduce((obj, channel) => {
    return Object.assign(obj, {
      [channel.id]: {
        playedVideos: [],
        playingVideo: channel.playlist[0]
      }
    });
  }, {})
};

export default function App() {
  const [state, setState] = useState(initialState);

  const openPlaylist = (channel) => {
    if (channel.id === state.activeChannel.id) {
      setState({...state, showModal: true});
    } else {
      let playingVideo;
      if (state.playedChannels[`${channel.id}`].playedVideos.length === 0) {
        playingVideo = channel.playlist[0];
      } else {
        playingVideo = state.playedChannels[`${channel.id}`].playingVideo;
      }
      setState({...state, showModal: true, activeChannel: channel, activeVideo: playingVideo});
    }
  }

  const closePlaylist = () => setState({...state, showModal: false});

  const playSpecificVideo = (video) => {
    setState({...state, activeVideo: video});
  }

  const updatePlayedVideo = (channelId, playedVideo, playingVideo) => {
    const currentPlaylist = state.activeChannel.playlist;
    let playedVideos = uniq([...state.playedChannels[`${channelId}`].playedVideos, playedVideo]) ;
    if (isEqual(sortBy(currentPlaylist), sortBy(playedVideos))) {
      playedVideos = []
    }
    const updatedChannel = {
      ...state.playedChannels,
      [channelId]: {
        playedVideos,
        playingVideo
      }
    };
    setState({...state, playedChannels: updatedChannel });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatarSection}>
        <VideoPlayer
          channelId={state.activeChannel.id}
          playlist={state.activeChannel.playlist}
          activeVideoId={state.activeVideo}
          updatePlayedVideo={updatePlayedVideo} />
      </View>
      <ScrollView style={styles.detailsSection}>
        {channels.map(channel => (
          <Channel
            key={channel.id}
            name={channel.name}
            icon={channel.icon}
            onPress={() => openPlaylist(channel)} />
        ))}
        <Modal
          visible={state.showModal}
          animationType="slide"
          transparent={true}
          onRequestClose={closePlaylist}>
          <Playlist
            channel={state.activeChannel}
            playSpecificVideo={playSpecificVideo}
            closePlaylist={closePlaylist} />
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
  },
  detailsSection: {
    flex: 1,
    backgroundColor: 'white',
  },
});
