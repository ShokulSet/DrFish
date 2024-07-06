import { useState } from 'react';
import {
    View,
    StyleSheet,
    Pressable,
    Text
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getDBconnection, getFish, updateFishes } from '../services/DBManager';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const getData = async (id: number) => {
  const db = await getDBconnection();
  const [results] = await getFish(db, id);
  return results.rows.item(0);
}

const updateFish = (id: number) => {
  getDBconnection().then((db) => {
    updateFishes(db, id, 1).then(([results]) => {
    console.log(`Updated Fish ${id}`)
    })
    .catch((error) => 
      console.error(error)
    )
  }).catch((error) =>
    console.error(error)
  )
  // getDBconnection().then((db) => {
  //   getFish(db, id).then(([results]) => {
  //   console.log(results.rows.item(0));
  //   })
  //   .catch((error) => 
  //     console.error(error)
  //   )
  // }).catch((error) =>
  //   console.error(error)
  // )
}

function InfoScreen({navigation, route}: {navigation: any, route: any}) {
  const { label, id } = route.params;
  const [isFound, setIsFound] = useState(false);
  getData(id).then((data) => {
    if (data.found == 1) {
      setIsFound(true);
    }

    const Info = data.Info
    
  });
  const [isEng, setIsEng] = useState(true);
  const changeLanguage = () => {
    setIsEng(!isEng);
  }
  updateFish(id);
  return (
    <View style={styles.container}>
      <View style={styles.crossContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name='leftcircleo' color={'white'} size={30} />
        </Pressable>
      </View>
      {isEng ? (
        <View>
          <Text>English Now</Text>
          <Pressable onPress={changeLanguage}>
            <Text>Thai</Text>
          </Pressable>
          {isFound ? (
            <Text>{label} is found</Text>
          ) : (
            <Text>{label} is not found</Text>
          )}
        </View>
      ) : (
        // The corrected part: Wrap the conditional rendering in a single parent <View>
        <View>
          <Text>Thai Now</Text>
          <Pressable onPress={changeLanguage}>
            <Text>English</Text>
          </Pressable>
          {isFound ? (
            <Text>{label} is found</Text>
          ) : (
            <Text>{label} is not found</Text>
          )}
        </View>
      )}
    </View>
  );
}
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