import React from 'react';
import {StyleSheet, ScrollView, View, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import NavigationBar from './NavigationBar';

export default function Playlist({channel, playVideo, closePlaylist}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <NavigationBar
          title="Playlist"
          leftText="Close"
          onPressLeftText={closePlaylist}
        />
        <ScrollView style={{}}>
          {channel.playlist.map((video, idx) => (
            <TouchableOpacity key={idx} style={{}} onPress={() => playVideo(idx)}>
              <Text>{video}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  content: {
    backgroundColor: 'white',
    height: '50%',
  },
});
