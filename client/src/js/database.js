import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {

  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'write');
  const store = tx.objectStore('jate');

  if(content.value != null) {
    const request = store.put({ value: content });
    const res = await request;
    console.log('🚀 - data saved to the database', res)
  }
};

export const getDb = async () => {

  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'read');  
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  return result;
};

initdb();
