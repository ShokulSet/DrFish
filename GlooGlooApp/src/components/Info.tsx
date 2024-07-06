import { useState } from 'react';
import {
    View,
    StyleSheet,
    Pressable,
    Text
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getDBconnection, getFish, updateFishes } from '../services/DBManager';

const isFound = (id: number) => {
  getDBconnection().then((db) => {
    getFish(db, id).then(([results]) => {
      if (results.rows.item(0).found == "True") {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => 
      console.error(error)
    )
  }).catch((error) =>
    console.error(error)
  )
  return false;
}

const updateFish = (id: number) => {
  getDBconnection().then((db) => {
    updateFishes(db, id, "True").then(([results]) => {
      console.log(results);
    })
    .catch((error) => 
      console.error(error)
    )
  }).catch((error) =>
    console.error(error)
  )
}

function InfoScreen({navigation, route}: {navigation: any, route: any}) {
    const { label, id } = route.params;
    return (
      <View style={styles.container}>
        <View style={styles.crossContainer}>
          <Pressable onPress={() => navigation.goBack()}>
            <AntDesign name='leftcircleo' color={'white'} size={30} />
          </Pressable>
        </View>
        {isFound(id) ? (
          <Text style={{color: 'black', fontFamily:'Dangrek-Regular', fontSize: 30}}>
            Found
          </Text>
        ) : (
          <Text style={{color: 'black', fontFamily:'Dangrek-Regular', fontSize: 30}}>
            Not Found
          </Text>
        )}
      </View>


    );
};

export default InfoScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossContainer: {
    position: 'absolute',
    alignSelf: "center",
    top: 22,
    left: 22,
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
