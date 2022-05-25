// TODO: Install the following package:
import { openDB } from 'idb';

// TODO: Complete the initDb() function below:
const initdb = async () => {
    openDB('contact', 1, {    //creates new database with version 1
        upgrade(db) {
            if (db.objectStoreNames.contains('contact')) {    //adds database schema if not already initialized
                console.log('contact database already exists');
                return;
            }
            db.createObjectStore('contact', { keyPath: 'id', autoIncrement: true });   //creates new object store with key of id, increments automatically
            console.log('contact database created');
        }
    });
}


// TODO: Complete the postDb() function below:
export const postDb = async (name, home, cell, email) => {
    console.log('POST to the database');

    const contactDb = await openDB('contact', 1);

    const tx = contactDb.transaction('contact', 'readwrite');

    const store = tx.objectStore('contact');

    const request = store.add({ name: name, home_phone: home, cell_phone: cell, email: email });

    const result = await request;
    console.log('🚀 - data saved to the database', result);
};
;
// TODO: Complete the getDb() function below:
export const getDb = async () => {
    console.log('GET from the database');

    const contactDb = await openDB('contact', 1);

    const tx = contactDb.transaction('contact', 'readonly');

    const store = tx.objectStore('contact');

    const request = store.getAll();

    const result = await request;
    console.log('result.value', result);
    return result;
};

// TODO: Complete the deleteDb() function below:
export const deleteDb = async (id) => {
    console.log('DELETE from database');

    const contactDb = await openDB('contact', 1);

    const tx = contactDb.transaction('contact', 'readwrite');

    const store = tx.objectStore('contact');

    const request = store.delete(id);

    const result = await request;
    console.log('result.value', result);
    return result?.value;
};

// starts the database

initdb();
