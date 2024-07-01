import SQLite from "react-native-sqlite-storage";
SQLite.enablePromise(true);

const database_name = "Fish.db";
const database_version = "1.0";
const database_displayname = "SQLite Fish Database";

const db = SQLite.openDatabase(
  {
    name: database_name,
    version: database_version,
    displayName: database_displayname,
    location: 'default',
    createFromLocation : '../assets/fishInit.sql'
  },
  () => {},
  error => {
    console.log(error);
  }
);

export const getFish = () => {

  const selectQuery = "SELECT * FROM FishTable";

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

export const updateFish = (id) => {

  const updateQuery =
    `UPDATE FishTable 
     set found = 1
     where id = ?`;

  const params = [title, isCompleted, id];

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

export default db;
