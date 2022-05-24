import "./App.css";
import React,{useState,useEffect} from "react";

function App() {

const [text, settext] = useState();

const [image, setimage] = useState()


  const indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

  if (!indexedDB) {
    console.log("IndexedDB could not be found in this browser.");
  }

  // 2
  const request = indexedDB.open("ImagesDatabase", 1);

  request.onerror = function (event) {
    console.error("An error occurred with IndexedDB");
    console.error(event);
  };

  request.onupgradeneeded = function () {
    //1
    const db = request.result;
    console.log("database" + db);

    //2
    const store = db.createObjectStore("imageStore", { keyPath: "id" });

    //3
    store.createIndex("SrNo", ["num"], { unique: true });

    // 4
    // store.createIndex("imageName", ["name"], {
    //   unique: false,
    // }),
      // 5
      store.createIndex("image", ["url"], {
        unique: false,
      });
  };

  const addData =()=>{
    request.onsuccess = ()=>{
      console.log('database open');
      const db  =request.result;

      // 1

      const transaction = db.transaction('imageStore', 'readwrite');

      // 2

      const store = transaction.objectStore('imageStore');
      const imageUrl = store.index('image');
      
      store.put({id : 1, image : {image}})
      store.put({id : 2, image : {image}})
      store.put({id : 3, image : {image}})

      const idQuery = store.get(2);
      console.log(idQuery);

    }
  }

  return (
    <>
      <div>
        <form>
        <input
        type='text'
        onChange={(e)=>settext(e.target.value)}
        placeholder='Enter Image lable'
        >
        </input>
        <h3>Drag and Drop here</h3>
        <span>
          <input
          type='file'
          multiple
          onChange={(e)=>setimage(e.target.value)}
          >
          </input>
        </span>
        <button
        onClick={addData}
        >
          add data
        </button>
        </form>

      </div>
    </>
  );
}

export default App;
