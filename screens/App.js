import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Channel from '../components/Channel';
import VideoPlayer from '../components/VideoPlayer';
import colors from '../utils/colors';
import {channels} from '../utils/channels';
import Playlist from '../components/Playlist';

const initialState = {
  showModal: false,
  activeChannel: channels[0],
  activeVideoIndex: 0
};

export default function App() {
  const [state, setState] = useState(initialState);

  const openPlaylist = (channel) => {
    if (channel.id === state.activeChannel.id) {
      setState({...state, showModal: true});
    } else {
      setState({showModal: true, activeChannel: channel, activeVideoIndex: 0});
    }
  }

  const closePlaylist = () => setState({...state, showModal: false});

  const playVideo = (idx) => {
    setState({...state, activeVideoIndex: idx});
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatarSection}>
        <VideoPlayer
          playlist={state.activeChannel.playlist}
          activeVideoIndex={state.activeVideoIndex} />
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
            playVideo={playVideo}
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
