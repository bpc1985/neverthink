import React from 'react';
import {StyleSheet, ScrollView, View, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import NavigationBar from './NavigationBar';

export default function Playlist({channel, playSpecificVideo, closePlaylist}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <NavigationBar
          title={channel.name}
          leftText="Close"
          onPressLeftText={closePlaylist}
        />
        <ScrollView>
          {channel.playlist.map((video, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.video}
              onPress={() => playSpecificVideo(video)}>
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
  video: {
    marginHorizontal: 20,
    marginVertical: 10
  }
});
