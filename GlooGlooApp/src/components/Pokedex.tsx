import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';

import { getDBconnection, getFishes } from '../services/DBManager';
import React from 'react';

function PokedexScreen() {

  const [fishes, setFishes] = useState<any>([]);
  const [images , setImages] = useState<any>({});

  useEffect(() => {
    getDBconnection().then((db) => {
      
      getFishes(db).then(([results]) => {
        let fishArray = [];
        for (let i = 0; i < results.rows.length; i++) {
          fishArray.push(results.rows.item(i));
        }
        setFishes(fishArray);

      })
      .catch((error) => 
        console.error(error)
    )
    
  }).catch((error) =>
    console.error(error)
  )
  // for (let i = 0; i < fishes.length; i++) {
  //   const path_name = `../../assets/fish_img/${i}.jpg`;
  //   const image = require(path_name);
  //   setImages({...images, [fishes[i].id]: image});
  // }
  console.log(images);

  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <SafeAreaView style={styles.container}>
      <FlatList
        data={fishes}
        renderItem={({ item }) => {
          return (
            <View>
              <Item commonName={item["Common name"]} id={item["id"]} />
              {/* <Image source={require(`../../assets/fish_img/${item["id"]}.jpg`)} /> */}
            </View>
          );
          
        }}
        keyExtractor={item => item['id']}
      />
    </SafeAreaView>
    </View>
  );
}

const Item = (item: any) => {
  // const path_name = `../../assets/fish_img/${item.id}.jpg`;
  // const image = require(path_name);
  return (
    <View style={styles.item}>
      {/* <Image source={image} /> */}
      <Text style={styles.title}>{item.commonName}</Text>
      <Text style={styles.title}>{item.id}</Text>
    </View>

  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#0F1035',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Dangrek-Regular',
    color: 'white',
  },
});

export default PokedexScreen;
