import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const PreviewScreen = ({ route }) => {
  const { photo } = route.params;

  return (
    <View style={styles.container}>
        <Text>Welcome to Preview</Text>
        <Image source={{ uri: 'file://' + photo }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default PreviewScreen;
