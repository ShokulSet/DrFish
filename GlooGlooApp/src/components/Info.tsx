import { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Pressable,
    Text,
    Image,
    SafeAreaView
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getDBconnection, getFish, updateFishDB } from '../services/DBManager';
import LinearGradient from 'react-native-linear-gradient';
import fish_imgages from '../../assets/fish_image';
import { ScrollView } from 'react-native-gesture-handler';

const updateFish = (id: number) => {
  getDBconnection().then((db) => {
    updateFishDB(db, id, 1).then(([results]) => {
    })
    .catch((error) => 
      console.error(error)
    )
  }).catch((error) =>
    console.error(error)
  )

}

function InfoScreen({navigation, route}: {navigation: any, route: any}) {
  const { id } = route.params;
  const [lang, setLang] = useState<'en' | 'th'>('en');
  const [name, setName] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [infoEN, setInfoEN] = useState('');
  const [infoTH, setInfoTH] = useState('');

  useEffect(() => {
    getDBconnection().then((db) => {
      getFish(db, id).then(([results]) => {
        setName(results.rows.item(0).CommonName);
        setScientificName(results.rows.item(0).ScientificName.replace(/_/g, ' '));
        setInfoEN(results.rows.item(0).Info);
        setInfoTH(results.rows.item(0).InfoTH);
      })
      .catch((error) => 
        console.error(error)
      )
    }).catch((error) =>
      console.error(error)
    )
  }, [id]);

  updateFish(id);

  return (
    <LinearGradient
      style={styles.container}
      colors={['#DCE9F2', '#94C5E8', '#0C7FD1', '#013154']}
    >
      <SafeAreaView>
        <ScrollView>
          <View
            style={styles.topContainer}
          >
            <View
              style={styles.arrowContainer}
            >
              <Pressable
                onPress={() => navigation.goBack()}
                style={styles.arrow}
              >
                <AntDesign name='left' color={'white'} size={25} />
              </Pressable>

            </View>

            <Text
              style={styles.title}
            >
              Deck
            </Text>

            <View
              style={styles.arrowContainer}
            >
              <Pressable
                onPress={() => {
                  setLang(lang === 'en' ? 'th' : 'en');
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Dangrek-Regular',
                    fontSize: 14,
                    color: 'white',
                    textAlign: 'center',
                  }}
                >
                  {lang === 'en' ? 'Eng' : 'ไทย'}
                </Text>
              </Pressable>


            </View>
          </View>

          <View
            style={{
              alignSelf: 'center',
            }}
          >
            <Image
              source={fish_imgages[id]}
              style={{
                borderRadius: 15,
                alignContent: 'center',
              }}
            />
          </View>

          <Text
            style={styles.title}
          >
            {name}
          </Text>

          <Text
            style={styles.sciName}
          >
            ({scientificName})
          </Text>

          <Text
            style={styles.description}
          >
            {lang === 'en' ? infoEN : infoTH}
          </Text>

        </ScrollView>

      </SafeAreaView>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 20,
  },
  title: {
    fontFamily: 'Dangrek-Regular',
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Dangrek-Regular',
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    
  },
  sciName: {
    fontFamily: 'Dangrek-Regular',
    fontSize: 20,
    color: 'orange',
    textAlign: 'center',
  },
  topContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 20,
    paddingBottom: 25,
    paddingHorizontal: 10,
  },
  arrowContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',

  },
  arrow: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  }
});

export default InfoScreen;