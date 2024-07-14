import { FlatList, Image, ImageBackground, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

import { getDBconnection, getAllFishes, searchFishes, updateFishDB, getAllFound } from '../services/DBManager';

import fish_images from '../../assets/fish_image';
import LinearGradient from 'react-native-linear-gradient';
import SearchBar from './SearchBar';
import CheckBox from './CheckBox';
import { SQLiteDatabase } from 'react-native-sqlite-storage';

function PokedexScreen({ navigation }: any) {
  const [fishes, setFishes] = useState<any>([]);
  const [search, setSearch] = useState('');
  const [found, setFound] = useState(false);

  const [allFishCount, setAllFishCount] = useState(0);
  const [fishCount, setFishCount] = useState(0);

  function updateCount(db: SQLiteDatabase) {
    getAllFishes(db).then(([result]) => {
      setAllFishCount(result.rows.length);
    })
    getAllFound(db).then(([results]) => {
      setFishCount(results.rows.length);
    })
  }

  function updateFishArray() {
    getDBconnection().then((db) => {
      updateCount(db);
      if (search === '') {
      getAllFishes(db).then(([results]) => {
        let fishArray = [];
        for (let i = 0; i < results.rows.length; i++) {
          fishArray.push(results.rows.item(i));
        }
        if (found) {
          fishArray = fishArray.filter((fish: any) => fish["found"] === '1');
        }
        fishArray.sort((a: any, b: any) => {
          if (a["found"] === '1' && b["found"] === '0') {
            return -1;
          } else if (a["found"] === '0' && b["found"] === '1') {
            return 1;
          } else {
            return 0;
          }
        });
        setFishes(fishArray);
      })
      .catch((error) => 
        console.error(error)
      )
    } else {
      searchFishes(db, search).then(([results]) => {
        let fishArray = [];
        for (let i = 0; i < results.rows.length; i++) {
          fishArray.push(results.rows.item(i));
        }

        if (found) {
          fishArray = fishArray.filter((fish: any) => fish["found"] === '1');
        }
        setFishes(fishArray);
      })
      .catch((error) => 
        console.error(error)
      )
    }
    }).catch((error) =>
      console.error(error)
    )
  }


  useEffect(() => {
    navigation.addListener('focus', () => {
      updateFishArray();
    });
  }, []);
  
  useEffect(() => {
    updateFishArray();
  }, [search, found]);

  return (
    <LinearGradient
      style={styles.linearGradient}
      colors={['#DCE9F2', '#94C5E8', '#0C7FD1', '#013154']}
    >
      <SafeAreaView style={styles.container}>
        <View
          style={styles.topContainer}
        >
          <SearchBar search={search} setSearch={setSearch} />
          <View
            style={styles.rowContainer}
          >
            <CheckBox check={found} setCheck={setFound} whenCheck='Found' whenNotCheck='All' />
            <Text
              style={styles.progressionText}
            >
              {Math.floor((fishCount / allFishCount)*100)}% ({fishCount}/{allFishCount})
            </Text>

          </View>
        </View>
        
        <FlatList
          data={fishes}
          renderItem={({ item }) => {
            return (
              <View>
                <Item
                  navigate={navigation.navigate}
                  commonName={item["CommonName"]}
                  id={item["id"]}
                  found={item["found"]} 
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

function geToInfoScreen(navigate: any, id: number) {
  navigate('InfoScreen', {id: id});
}

const Item = (item: any) => {
  return (
    <Pressable
      onPress={(item.found === '1') ? () => {geToInfoScreen(item.navigate, item.id)} : () => {}}
      // onPress={(item.found === '1') ? () => {} : () => {getDBconnection().then((db) => {updateFishDB(db, item.id, 1)})}}
    >
      <ImageBackground
        style={(item.found === '1') ? styles.item : [styles.item, {opacity: 0.5, backgroundColor: 'black'}] }
        source={fish_images[item["id"]]}
      >

        <View style={styles.bottom}>
          <Text style={styles.title}>{item.commonName}</Text>
          {(item.found === '0') ? 
            <Entypo
              name='lock'
              size={100}
              color='white'
              style={styles.lockIcon}
            />: <></>
          }
        </View>

      </ImageBackground>
    </Pressable>

  )
};


const styles = StyleSheet.create({
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    paddingBottom: 5,

    },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
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
  progressionText: {
    fontFamily: 'Dangrek-Regular',
    fontSize: 20,
    color: '#0F1035',
  },
  lockIcon: {
    position: 'absolute',
    top: 0,
  },
});

export default PokedexScreen;
