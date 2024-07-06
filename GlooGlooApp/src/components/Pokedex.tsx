import { FlatList, Image, ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';

import { getDBconnection, getFishes } from '../services/DBManager';

import fish_images from '../../assets/fish_image';
import LinearGradient from 'react-native-linear-gradient';
import SearchBar from './SearchBar';

function PokedexScreen() {
  const [fishes, setFishes] = useState<any>([]);
  const [search, setSearch] = useState('');

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


  }, []);

  return (
    <LinearGradient
      style={styles.linearGradient}
      colors={['#DCE9F2', '#94C5E8', '#0C7FD1', '#013154']}
    >
      <SafeAreaView style={styles.container}>
        <SearchBar search={search} setSearch={setSearch} />
        
        <FlatList
          data={fishes}
          renderItem={({ item }) => {
            return (
              <View>
                <Item
                  commonName={item["Common name"]}
                  id={item["id"]} 
                />
              </View>
            );
            
          }}
          keyExtractor={item => item['id']}
        />
      </SafeAreaView>

    </LinearGradient>
  );
}

const Item = (item: any) => {
  return (
    <ImageBackground
      style={styles.item}
      source={fish_images[item["id"]]}
    >
      <View style={styles.bottom}>
        <Text style={styles.title}>{item.commonName}</Text>
      </View>

    </ImageBackground>

  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,

  },
  
  item: {
    flex: 1,
    backgroundColor: '#0F1035',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
  },
  bottom: {
    flex: 1,
    borderRadius: 10,
    textAlign: 'center',
    flexDirection: 'column-reverse',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Dangrek-Regular',
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,
  },
});

export default PokedexScreen;
