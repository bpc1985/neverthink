import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text
} from 'react-native';
import PropTypes from 'prop-types';

export default function Channel({
  name,
  icon,
  onPress,
}) {

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        style={styles.icon}
        source={{
          uri: icon,
        }}
      />
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
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
  onPress: null,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginHorizontal: 15,
  },
  icon: {
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
