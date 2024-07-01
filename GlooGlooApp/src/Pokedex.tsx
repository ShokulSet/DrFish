import { Text, View } from 'react-native';
import FishList from './FishList';
import { getFish } from './DBManager';

function PokedexScreen() {
    const [Fish, setFish] = useState([]);
    useEffect(() => {
    getFish().then(results => {
      setFish(results.rows._array);
    }).catch(error => {
      console.log(error);
    });
  }, []);

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{color: "black"}}>Settings!</Text>
        <Text style={{color: "black", fontFamily:'Dangrek-Regular'}}>Settings!</Text>
      </View>
    );
  }

export default PokedexScreen;
