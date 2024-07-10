import { openDatabase, enablePromise, SQLiteDatabase } from "react-native-sqlite-storage";
enablePromise(true);

const dbname = 'fish.sqlite';
const tableName = 'fish';

export const getDBconnection = async () => {
  return openDatabase({ name: dbname , location: 'default', createFromLocation: 1 });
}
  
export const getAllFishes = async (db: SQLiteDatabase) => {
  const selectQuery = `SELECT * FROM ${tableName}`;
  return db.executeSql(selectQuery)
};

export const getFish = async (db: SQLiteDatabase, id: number) => {
  const selectQuery = `SELECT * FROM ${tableName} WHERE id = ${id}`;
  return db.executeSql(selectQuery)
};

export const getFishLabel = async (db: SQLiteDatabase, id: number) => {
  const selectQuery = `SELECT "CommonName" FROM ${tableName} WHERE id = ${id}`
  return db.executeSql(selectQuery)
};

export const searchFishes = async (db: SQLiteDatabase, search: string) => {
  const selectQuery = `SELECT * FROM ${tableName} WHERE CommonName LIKE "%${search}%" OR ScientificName LIKE "%${search}%"`;
  return db.executeSql(selectQuery)

}

export const updateFishDB = (db: SQLiteDatabase, id: number, found: number) => {
  const updateQuery =
  `UPDATE ${tableName}
  SET Found = "${found}"  
  WHERE id = ${id}`;
  return db.executeSql(updateQuery);
};

export const getAllFound = (db: SQLiteDatabase) => {
  const query =
  `SELECT *
  FROM ${tableName}
  WHERE found = 1`;
  return db.executeSql(query);
}