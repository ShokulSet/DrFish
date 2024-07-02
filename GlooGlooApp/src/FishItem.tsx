import { View, Text, StyleSheet } from "react-native";

const FishItem = ({item}: {item: any}) => {

  return (
    <View style={styles.itemContainer}>
     <Text>{item.id}</Text>
     
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#fff", 
    padding: 20,
  },
});

export default FishItem;
