import { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Image,
  SafeAreaView,
  NativeAppEventEmitter,
  NativeModules,
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

import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

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
  //console.log(description);
  Tts.getInitStatus().then(() => {
    Tts.stop();
    Tts.setDefaultLanguage(isEn ? 'en-IE' : 'th-TH');
    Tts.setDefaultRate(0.5);
    Tts.speak(description);
  }, (err) => {
    if (err.code === 'no_engine') {
      Tts.requestInstallEngine();
    }
  })

}

const stopReading = () => {
  Tts.stop();
}

function InfoScreen({navigation, route}: {navigation: any, route: any}) {
  const { id, unlocked } = route.params;
  const [lang, setLang] = useState<'en' | 'th'>('en');
  const [name, setName] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [infoEN, setInfoEN] = useState('');
  const [infoTH, setInfoTH] = useState('');
  Tts.addEventListener('tts-start', (event) => console.log("start", event));
  Tts.addEventListener('tts-progress', (event) => console.log("progress", event));
  Tts.addEventListener('tts-finish', (event) => console.log("finish", event));
  Tts.addEventListener('tts-cancel', (event) => console.log("cancel", event));


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
      <View
        style={styles.topContainer}
      >
        <View
          style={styles.arrowContainer}
        >
          <Pressable
            onPress={() => {
              stopReading();
              navigation.goBack();
            }}
            style={styles.arrow}
          >
            <AntDesign name='left' color={'white'} size={25} />
          </Pressable>

        </View>

        { lang === 'en' && !unlocked ?
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
          >
            <Text
              style={styles.titleInfoEN}
            >
              Deck
            </Text>

          </Animated.View>
          :
          <></>
        }

        { lang === 'th' && !unlocked ?
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
          >
            <Text
              style={styles.titleInfoTH}
            >
              สารานุกรม
            </Text>
          </Animated.View>
          :
          <></>
        }

        { lang === 'en' && unlocked ?
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
          >
            <Text
              style={[
                styles.titleInfoEN,
                {fontSize: 22}
              ]}
            >
              Creature Discovered!
            </Text>

          </Animated.View>
          :
          <></>
        }

        { lang === 'th' && unlocked ?
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
          >
            <Text
              style={[styles.titleInfoTH,
                {fontSize: 26}
              
              ]}
            >
              เจอแล้ว!
            </Text>
          </Animated.View>
          :
          <></>
        }

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
      <SafeAreaView>
        <ScrollView
          style={styles.scroll}
        >

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
            <Animated.View
              entering={FadeIn}
              exiting={FadeOut}
            >
              <Text
                style={styles.descriptionEN}
              >
                {infoEN}
              </Text>
              
            </Animated.View>
            :
            <></>
          }

          {lang === 'th' ? 
            <Animated.View
              entering={FadeIn}
              exiting={FadeOut}
            >
              <Text
                style={styles.descriptionTH}
              >
                {infoTH}
              </Text>
              
            </Animated.View>
            :
            <></>
          }
          <View style={styles.spaceBottom}></View>


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
  scroll: {
    paddingHorizontal: 20,
    marginBottom: 100,
    paddingTop: 20,
  },
  spaceBottom: {
    marginBottom: 100,
  },
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
  },
  titleInfoEN: {
    fontFamily: 'Dangrek-Regular',
    fontSize: 36,
    color: 'black',
    textAlign: 'center',
  },
  titleInfoTH: {
    fontFamily: 'Mitr-Bold',
    fontSize: 36,
    color: 'black',
    textAlign: 'center',
  },
  descriptionEN: {
    fontFamily: 'Dangrek-Regular',
    fontSize: 20,
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
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    height: 80,
    alignItems: 'center',
    flexDirection: 'row',
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