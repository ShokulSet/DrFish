import React, { useState } from 'react';
import {
    View,
    ImageBackground,
    StyleSheet,
    Pressable,
    Dimensions,
    Text
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

function InfoScreen({navigation, route}: {navigation: any, route: any}) {
    return (
        <View style={styles.crossContainer}>
            <Pressable
            style={styles.cross}
            onPress={() => navigation.goBack()}
            >
            <AntDesign name='leftcircleo' color={'white'} size={30} />
        </Pressable>
      </View>
    );
};

export default InfoScreen;
const styles = StyleSheet.create({
  crossContainer: {
    position: 'absolute',
    alignSelf: "center",
    top: 22,
    right: 22,
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cross: {
    alignSelf: "center",
    bottom: 3
  },
});
