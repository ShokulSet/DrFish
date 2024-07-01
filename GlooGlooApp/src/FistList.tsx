import { FlatList } from "react-native"; 

import FishItem from "./FishItem";

const FishList = ({todos, onToggle, onDelete}) => {

  const renderItem = ({item}) => (
    <TodoItem 
      item={item}
      onToggle={onToggle}
      onDelete={onDelete} 
    />
  );
   
  return (
    <FlatList
      data={todos}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
  
}

export default TodoList;
