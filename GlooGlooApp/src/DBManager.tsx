import SQLite from "react-native-sqlite-storage";
SQLite.enablePromise(true);

const dbname = 'fish.db';
const tableName = 'db';

const db = SQLite.openDatabase(
    {
      name: dbname, 
      createFromLocation : 1
    },
    () => { console.log('Database opened'); },
    error => { console.error(error); }
  );
export default db;

export const getFishes = () => {
  const selectQuery = `SELECT * FROM ${tableName}`;
  return new Promise((resolve, reject) => {
    db.transaction(tx => {   
      tx.executeSql(
        selectQuery, 
        [],
        (tx, results) => resolve(results),
        (_, error) => reject(error)
      );
    });
  });
};

export const updateFishes = (id: number, Found: boolean) => {
  const updateQuery =
    `UPDATE todos
     Found = ?  
     where id = ?`;
  const params = [Found, id];
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
       tx.executeSql(
        updateQuery, 
        params,
        (tx, results) => resolve(results),
        (_, error) => reject(error)
      );
    });
  });
};