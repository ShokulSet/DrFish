import { FlatList } from "react-native"; 
import FishItem from "./FishItem";
import SQLite from "react-native-sqlite-storage";

const FishList = ({db}: {db: any}) => {

  const renderItem = ({item}: {item: any}) => (
    <FishItem 
      item={item}
    />
  );
   
  return (
    <FlatList
      data={db}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
  
}

export default FishList;
