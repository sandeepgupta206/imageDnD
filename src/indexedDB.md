# IndexedDB : 
IndexedDB is a low-level API for client-side storage of significant amounts of structured data, including files.
 IndexedDB lets you store and retrieve objects that are indexed with a key and more powerful than localStorage;

[documentation link](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

 # Storage limits : 
limit of of the IndexedDB database will be the user's disk space and operating system.

# IndexedDB Structure:
- database : 
 A database contains one or more object stores but you’ll create one database per web application.

 - Object stores:
 An object store is a bucket that you can use to store the data and associated indexes.

An object store contains the records stored as key-value pairs.




# Check if the IndexedDB is supported

```js
if (!window.indexedDB) {
    console.log(`Your browser doesn't support IndexedDB`);
    return;
}
```


 # opening Database :

 ```js 
 let openRequest = indexedDB.open(name, version);
```

 name – a string, the database name.
 version – a positive integer version, by default 1

  The second parameter to the open method is the version of the database. The version of the database determines the database schema — the object stores in the database and their structure. If the database doesn't already exist, it is created by the open operation, then an onupgradeneeded event is triggered and you create the database schema in the handler for this event. If the database does exist but you are specifying an upgraded version number, an onupgradeneeded event is triggered straight away, allowing you to provide an updated schema in its handler.

``` js
 var request = window.indexedDB.open("DatabaseName", 3):

openRequest.onupgradeneeded = function() {
  // triggers if the client had no database
};

openRequest.onerror = function() {
  console.error("Error", openRequest.error);
};

openRequest.onsuccess = function() {
  let db = openRequest.result;
  // continue working with database using db object
};

```
# Using a key generator
Setting up an autoIncrement flag when creating the object store would enable the key generator for that object store.
With the key generator, the key would be generated automatically as you add the value to the object store. The current number of a key generator is always set to 1 when the object store for that key generator is first created. Basically the newly auto-generated key is increased by 1 based on the previous key. The current number for a key generator never decreases

```js
var objStore = db.createObjectStore("names", { autoIncrement : true });  // this will increase the key by one but it never decreases even if you delete any data from table 
```


        


# creating an IndexedDB to store data:
 
 ```js

 let db;  // globally declear
 var request = indexedDB.open(databaseName,version);

     
      request.onsuccess = e =>{
         //  handling success
         db = request.result;
      }

 request.onerror = e =>{
    //  handling error

 }

 request.onupgradeneeded = e =>{
     db = e.target.result;
     let store = db.createdObjectStore('storeName', {
         keyPath:'pass key or id which work as primary key while retriving or deleting data'
     })
 }


 ```

  - add() function requires that no object already be in the database with the same key. If you're trying to modify an existing entry, or you don't care if one exists already, you can use the put() function

 # adding data into store:



 ```js
//  function to add data into database table

const addData =(e)=>{
    e.preventDefault()  // to prevent default behavior of button in form
    //  creating object to store data 
    let dataObject = {
        key: value,
        key:value
    }

    // use transaction to target object store table

    let transaction = db.transaction(['storeName/tableName'], 'readwrite/readonly')  // second parameter defined whether table readonly or readwrite;
    let store = transaction.objectStore('storeName');
    store.add(DataObject);


}
 ```

 # retireved Data from DB



 ```js
const showData =e=>{
    const request = db.transaction('storeName').getAll();
    request.onsuccess =()=>{
        const store = request.result;
        console.log(store) ; // check data getting in console in array of object
        console.table(store); // cross checked data getiing in table form

    //  create one [] state to store getting data in that  empty array we can use that array for rendering 
    //  const [array, setArray] = useState([]);
    
    setArray(store);
    }

    //  error handler
    request.onerror = err=>{
        console.log(err)
    }
}
 ```
