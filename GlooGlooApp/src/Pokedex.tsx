import { Text, View } from 'react-native';
import { useEffect, useState } from 'react';

import FishList from './FistList';
import db, { getFishes } from './DBManager';

function PokedexScreen() {

  const [fishes, setFishes] = useState([]);
  db;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{color: "black"}}>Settings!</Text>
      <Text style={{color: "black", fontFamily:'Dangrek-Regular'}}>Settings!</Text>
    </View>
  );
  }

export default PokedexScreen;
