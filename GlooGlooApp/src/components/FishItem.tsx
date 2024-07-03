import { View, Text, StyleSheet } from "react-native";

const FishItem = (fishes, i) => {

  return (
    <View style={styles.itemContainer}>
     <Text>{fishes.items(i)['Common name']}</Text>
     
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
