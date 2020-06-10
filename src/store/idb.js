// With thanks: https://www.raymondcamden.com/2019/10/16/using-indexeddb-with-vuejs
// https://developers.google.com/web/ilt/pwa/working-with-indexeddb

// Using IndexedDB for key/value storage. Not using LocalStorage for the 5MB limit
// Expected row: {id, value}

const DB_NAME = 'accomplishingme';
const DB_VERSION = 1;
let DB;
const DB_TABLE = 'kvstore';

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
				db.createObjectStore(DB_TABLE, {keyPath:'id'});
			};
		});
	},
    async write(row) {
		let db = await this.getDb();
		return new Promise(resolve => {
			let tx = db.transaction([DB_TABLE],'readwrite');
			tx.oncomplete = () => {
				resolve();
			};
			let store = tx.objectStore(DB_TABLE);
			store.put(row);
		});
	
    },
	async read(id) {
		let db = await this.getDb();
		return new Promise(resolve => {
            let tx = db.transaction([DB_TABLE],'readonly');
            tx.oncomplete = () => {
				resolve(results.value);
			};
            let store = tx.objectStore(DB_TABLE);
            var request = store.get(id);
            let results;
            request.onsuccess = () => {
                results = request.result;
            }
		});
	},
}
