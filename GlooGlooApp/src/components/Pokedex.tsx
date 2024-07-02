import { Text, View } from 'react-native';
import { useEffect, useState } from 'react';

import FishList from './FishList';
import { getDBconnection, getFishes } from '../services/DBManager';

function PokedexScreen() {

  const [fishes, setFishes] = useState<any>([]);
  useEffect(() => {
    getDBconnection().then((db) => {
      getFishes(db).then((fishes) => {
        console.log(fishes);
        setFishes(fishes);
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
      <Text style={{color: "black"}}>Settings!</Text>
      <Text style={{color: "black", fontFamily:'Dangrek-Regular'}}>{ fishes }</Text>
    </View>
  );
  }

export default PokedexScreen;
