import { openDatabase, enablePromise, SQLiteDatabase } from "react-native-sqlite-storage";
enablePromise(true);

const dbname = 'fish.sqlite';
const tableName = 'db';

export const getDBconnection = async () => {
  return openDatabase({ name: dbname , location: 'default', createFromLocation: 1 });
}
  
export const getFishes = async (db: SQLiteDatabase) => {
  const selectQuery = `SELECT * FROM ${tableName}`;
  // see all tables
  // const selectQuery = `SELECT name FROM sqlite_master WHERE type='table'`;
  return db.executeSql(selectQuery).then(([results]) => {
    console.log(results.rows.item(0));
    // const count = results.rows.length;
    // const fishes = [];
    // for (let i = 0; i < count; i++) {
    //   const row = results.rows.item(i);
    //   const { id, name, Found } = row;
    //   fishes.push({ id, name, Found });
    // }
    // return fishes;
  }).catch((error) => {
    console.error(error);
  });
};

export const getFishLabel = async (db: SQLiteDatabase, id: number) => {
  const selectQuery = `SELECT "Common Name" FROM ${tableName} WHERE id = ${id}`
  return db.executeSql(selectQuery)
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
