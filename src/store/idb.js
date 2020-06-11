// With thanks: https://www.raymondcamden.com/2019/10/16/using-indexeddb-with-vuejs
// https://developers.google.com/web/ilt/pwa/working-with-indexeddb

// Using IndexedDB for simple key/value storage.
// Not using LocalStorage for the 5MB limit
// Expected row: {id, value}

const DB_NAME = 'accomplishingme';
const DB_VERSION = 1;
let DB;
const DB_TABLE = 'kvstore';
const DB_SCHEMA = {keyPath:'id'};

export default {
  async getDb() {
		return new Promise((resolve, reject) => {
			if(DB) { return resolve(DB); }
			let request = window.indexedDB.open(DB_NAME, DB_VERSION);
			request.onerror = e => {
				console.log('Error opening db', e);
				reject('Error');
			};
			request.onsuccess = e => {
				DB = e.target.result;
				resolve(DB);
			};
			request.onupgradeneeded = e => {
				console.log('onupgradeneeded');
				let db = e.target.result;
				db.createObjectStore(DB_TABLE, DB_SCHEMA);
			};
		});
	},
	async write(row) {
		let db = await this.getDb();
		return new Promise(resolve => {
			let store = db.transaction([DB_TABLE],'readwrite').objectStore(DB_TABLE);
			let request = store.put(row);
			request.onsuccess = () => {
				resolve();
			}
		});
	},
	async read(id) {
		let db = await this.getDb();
		return new Promise(resolve => {
      let store = db.transaction([DB_TABLE],'readonly').objectStore(DB_TABLE);
      let request = store.get(id);
      request.onsuccess = () => {
        resolve(request.result);
      }
		});
	},
	async reset() {
		let db = await this.getDb();
		return new Promise(resolve => {
			let store = db.transaction([DB_TABLE],'readwrite').objectStore(DB_TABLE);
			let request = store.clear();
			request.onsuccess = () => {
				resolve();
			}
		});
	},
}
