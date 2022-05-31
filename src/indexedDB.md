# IndexedDB : 
IndexedDB is a low-level API for client-side storage of significant amounts of structured data, including files.
 IndexedDB lets you store and retrieve objects that are indexed with a key and more powerful than localStorage;

[documentation link](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

 # Storage limits : 
limit of of the IndexedDB database will be the user's disk space and operating system.

# IndexedDB Structure:
- # database : 
 A database contains one or more object stores but you’ll create one database per web application.

 # opening Database : 
 let openRequest = indexedDB.open(name, version);
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