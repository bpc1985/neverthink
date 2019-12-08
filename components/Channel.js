import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text
} from 'react-native';
import PropTypes from 'prop-types';

export default function Channel({
  name,
  icon,
  textColor,
  onPress,
}) {
  const colorStyle = {
    color: textColor,
  };
  const ImageComponent = onPress ? TouchableOpacity : View;

  return (
    <ImageComponent style={styles.container} onPress={onPress}>
      <Image
        source={{
          uri: icon,
        }}
        style={styles.avatar}
      />
      <Text style={[styles.name, colorStyle]}>{name}</Text>
    </ImageComponent>
  );
}

Channel.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.string,
  onPress: PropTypes.func,
};

Channel.defaultProps = {
  name: '',
  icon: '',
  textColor: 'black',
  onPress: null,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginHorizontal: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 45,
    borderColor: 'white',
    borderWidth: 2,
  },
  name: {
    fontSize: 20,
    marginTop: 24,
    marginBottom: 2,
    marginLeft: 10,
    fontWeight: 'bold',
  }
});
