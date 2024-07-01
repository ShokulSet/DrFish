import { View, Text, StyleSheet } from "react-native";

const TodoItem = ({item, onToggle, onDelete}) => {

  return (
    <View style={styles.itemContainer}>
     <Text>{item.title}</Text>
     
     <Button title="Toggle" onPress={() => onToggle(item.id)}/>

     <Button title="Delete" onPress={() => onDelete(item.id)}/>
     
    </View>
  );

};

const styles = StyleSheet.create({

  itemContainer: {
    backgroundColor: "#fff", 
    padding: 20,
  },

});

export default TodoItem;
