import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';

import { getDBconnection, getFishes } from '../services/DBManager';
import React from 'react';
import { ResultSetRowList } from 'react-native-sqlite-storage';

function PokedexScreen() {

  const [fishes, setFishes] = useState<any>([]);
  useEffect(() => {
    getDBconnection().then((db) => {
      getFishes(db).then((fishes: any) => {
        // loop through fishes and create new array
        let fishArray = [];
        for (let i = 0; i < fishes.length; i++) {
          fishArray.push(fishes.item(i));
        }        
        
        setFishes(fishArray);

      }
      ).catch((error) => 
        console.error(error)
      )
    }).catch((error) =>
      console.error(error)
  )

  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <SafeAreaView style={styles.container}>
      <FlatList
        data={fishes}
        renderItem={({ item }) => <Item commonName={item["Common name"]} />}
        keyExtractor={item => item['id']}
      />
    </SafeAreaView>
    </View>
  );
}

const Item = (item: any) => (
  <View style={styles.item}>
    <Text style={styles.title}>{item.commonName}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Dangrek-Regular',
  },
});

export default PokedexScreen;
