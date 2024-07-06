import { openDatabase, enablePromise, SQLiteDatabase } from "react-native-sqlite-storage";
enablePromise(true);

const dbname = 'fish.sqlite';
const tableName = 'db';

export const getDBconnection = async () => {
  return openDatabase({ name: dbname , location: 'default', createFromLocation: 1 });
}
  
export const getFishes = async (db: SQLiteDatabase) => {
  const selectQuery = `SELECT * FROM ${tableName}`;
  return db.executeSql(selectQuery).then(([results]) => {
    return results.rows;
  }).catch((error) => {
    console.error(error);
  });
};

export const getFishLabel = async (db: SQLiteDatabase, id: number) => {
  const selectQuery = `SELECT "Common Name" FROM ${tableName} WHERE id = ${id}`
  return db.executeSql(selectQuery)
};

export const updateFishes = (db: SQLiteDatabase, id: number, found: string) => {
  const updateQuery =
  `UPDATE ${tableName}
  Found = ?  
  where id = ?`;
  const params = [found, id];
  return db.executeSql(updateQuery, params).then((results) => {
    return results;
  }).catch((error) => {
    console.error(error);
  });
};
