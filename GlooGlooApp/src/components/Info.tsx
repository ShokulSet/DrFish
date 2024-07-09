import { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Image,
  SafeAreaView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { getDBconnection, getFish, updateFishDB } from '../services/DBManager';
import LinearGradient from 'react-native-linear-gradient';
import fish_imgages from '../../assets/fish_image';
import { ScrollView } from 'react-native-gesture-handler';
import Tts from 'react-native-tts';
import SVGTH from '../../assets/svg/th.svg';
import SVGEN from '../../assets/svg/en.svg';

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

const readDescription = (isEn: boolean,description: string) => {
  Tts.setDefaultLanguage(isEn ? 'en-EN' : 'th-TH');
  Tts.setDefaultRate(0.5);
  Tts.speak(description);
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
              style={lang === 'en' ? styles.titleInfoEN : styles.titleInfoTH}
            >
              {lang === 'en' ? 'DECK' : 'สารานุกรม'}  
            </Text>

            <View
              style={styles.langContainer}
            >
              <Pressable
                onPress={() => {
                  setLang(lang === 'en' ? 'th' : 'en');
                }}
              >
                {lang === 'en' ? <SVGEN /> : <SVGTH />}
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
                width: 330,
              }}
            />
          </View>

          <Text
            style={styles.comName}
          >
            {name}
          </Text>

          <Text
            style={styles.sciName}
          >
            ({scientificName})
          </Text>

          {lang === 'en' ? 
            <Text
              style={styles.descriptionEN}
            >
              {infoEN}
            </Text> : 
            <Text
              style={styles.descriptionTH}
            >
              {infoTH}
            </Text>
          }


        </ScrollView>

      </SafeAreaView>
      <View
          style={styles.speakContainer}
        >
          <Pressable
            onPress={() => {readDescription(lang === 'en', lang === 'en' ? infoEN : infoTH)}}
            style={({pressed}) => [
              {
                width: 55,
                height: 55,
                borderRadius: 50,
                backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#F0EFEF'
              },
              
            ]}
          >
            <Entypo name="sound" size={35} style={styles.centered} />
          </Pressable>
        </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#2E3069',
  },
  speakContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 40,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#F0EFEF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)'
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 20,
  },
  titleInfoEN: {
    fontFamily: 'Dangrek-Regular',
    fontSize: 36,
    color: 'black',
    textAlign: 'center',
  },
  titleInfoTH: {
    fontFamily: 'Mitr-Bold',
    fontSize: 32,
    color: 'black',
    textAlign: 'center',
  },
  descriptionEN: {
    fontFamily: 'Dangrek-Regular',
    fontSize: 18.5,
    color: '#D9ECF7',
    textAlign: 'left',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: -1, height: 4},
    textShadowRadius: 8,
    lineHeight: 27,
    width: 350,
  },
  descriptionTH: {
    fontFamily: 'Mitr-Medium',
    // fontWeight: 'bold',
    fontSize: 20,
    color: '#D9ECF7',
    textAlign: 'left',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: -1, height: 4},
    textShadowRadius: 8,
    lineHeight: 30,
    width: 350,
  },
  comName: {
    fontFamily: 'Dangrek-Regular',
    fontSize: 32,
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: -1, height: 4},
    textShadowRadius: 8,
  },
  sciName: {
    fontFamily: 'Dangrek-Regular',
    fontSize: 18.5,
    top: -10,
    color: '#0F4369',
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
  langContainer: {
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